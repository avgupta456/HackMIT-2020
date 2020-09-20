from encoder.params_model import model_embedding_size as speaker_embedding_size
from utils.argutils import print_args
from utils.modelutils import check_model_paths
from synthesizer.inference import Synthesizer
from encoder import inference as encoder
from vocoder import inference as vocoder
from pathlib import Path
import numpy as np
import sounddevice as sd
import soundfile as sf
import librosa
import argparse
import torch
import sys
from audioread.exceptions import NoBackendError

if __name__ == '__main__':

    if torch.cuda.is_available():
        device_id = torch.cuda.current_device()
        gpu_properties = torch.cuda.get_device_properties(device_id)
        ## Print some environment information (for debugging purposes)
        print("Found %d GPUs available. Using GPU %d (%s) of compute capability %d.%d with "
            "%.1fGb total memory.\n" % 
            (torch.cuda.device_count(),
            device_id,
            gpu_properties.name,
            gpu_properties.major,
            gpu_properties.minor,
            gpu_properties.total_memory / 1e9))
    else:
        print("Using CPU for inference.\n")
    
    ## Remind the user to download pretrained models if needed
    
    ## Load the models one by one.
    print("Preparing the encoder, the synthesizer and the vocoder...")
    encoder.load_model(Path("encoder/saved_models/pretrained.pt"))
    synthesizer = Synthesizer(Path("synthesizer/saved_models/logs-pretrained/taco_pretrained"))
    vocoder.load_model(Path("vocoder/saved_models/pretrained/pretrained.pt"))

    
    try:
        # Get the reference audio filepath
        message = "Reference voice: enter an audio filepath of a voice to be cloned (mp3, " \
                    "wav, m4a, flac, ...):\n"
        in_fpath = Path("samples/elon_voice.wav") #hardcoded for now


        ## Computing the embedding
        # First, we load the wav using the function that the speaker encoder provides. This is 
        # important: there is preprocessing that must be applied.
        
        # The following two methods are equivalent:
        # - Directly load from the filepath:
        preprocessed_wav = encoder.preprocess_wav(in_fpath)
        # - If the wav is already loaded:
        original_wav, sampling_rate = librosa.load(str(in_fpath))
        preprocessed_wav = encoder.preprocess_wav(original_wav, sampling_rate)
        print("Loaded file succesfully")
        
        # Then we derive the embedding. There are many functions and parameters that the 
        # speaker encoder interfaces. These are mostly for in-depth research. You will typically
        # only use this function (with its default parameters):
        embed = encoder.embed_utterance(preprocessed_wav)
        print("Created the embedding")
        
        
        ## Generating the spectrogram

        #get text
        data = "I think it was the combination of exploring in a place that was very isolated, yet felt safe. It was a place I could go and be alone, but I knew I was going to be okay because there were people close by. I think it was the first time I felt that kind of independence, and it’s something I’ve been striving for ever since."
        start = 0
        words = 20
        stop = words

        text = []
        data = data.split(" ")
        while(stop < len(data) and stop > 0):
            stop = start + words - 1 if len(data) > start + words else -1
            chunk = " ".join(data[start:stop])
            start = stop
            text.append(chunk)

        global_list = [] #store all the outputs sequentially as it passes

        print("\nsequence size:", len(text), "\n")
        for i, txt in enumerate(text):
            
            # text = "i can't seem to make it output the first thread and then keep the reamaining going" #sentence
            
            # The synthesizer works in batch, so you need to put your data in a list or numpy array
            texts = [txt]
            embeds = [embed]
            specs = synthesizer.synthesize_spectrograms(texts, embeds)
            spec = specs[0]
            print("Created the mel spectrogram")
            
            
            ## Generating the waveform
            print("Synthesizing the waveform:")


            # Synthesizing the waveform is fairly straightforward. Remember that the longer the
            # spectrogram, the more time-efficient the vocoder.
            generated_wav = vocoder.infer_waveform(spec)
            
            
            ## Post-generation
            # There's a bug with sounddevice that makes the audio cut one second earlier, so we
            # pad it.
            generated_wav = np.pad(generated_wav, (0, synthesizer.sample_rate), mode="constant")

            # Trim excess silences to compensate for gaps in spectrograms
            # generated_wav = encoder.preprocess_wav(generated_wav)
            
            try:
                sd.stop()
                sd.play(generated_wav, synthesizer.sample_rate)
            except sd.PortAudioError as e:
                print("\nCaught exception: %s" % repr(e))
                print("Continuing without audio playback. Suppress this message with the \"--no_sound\" flag.\n")
            except:
                raise

            #append to memory
            global_list.append(generated_wav)
            print("Appended to memory")
            # Save it on the disk
            # filename = "demo_output_%02d.wav" % i
            # print(generated_wav.dtype)
            # sf.write(filename, generated_wav.astype(np.float32), synthesizer.sample_rate)
            # print("\nSaved output as %s\n\n" % filename)
        
        


        combined = np.hstack((global_list)) #stack horizontally
        try:
            sd.stop()
            sd.play(combined, synthesizer.sample_rate)
        except sd.PortAudioError as e:
            print("\nCaught exception: %s" % repr(e))
            print("Continuing without audio playback. Suppress this message with the \"--no_sound\" flag.\n")
        except:
            raise
        # Save it on the disk
        filename = "output/demo_output_00.wav"
        print(combined.dtype)
        sf.write(filename, combined.astype(np.float32), synthesizer.sample_rate)
        print("\nSaved output as %s\n\n" % filename)

    except Exception as e:
        print("Caught exception: %s" % repr(e))
        print("Restarting\n")