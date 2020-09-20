import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

export default function Home() {
  const url1 = "/videos/oprah_tough.wav";
  const url2 = "/videos/elon_tough.wav";
  const url3 = "/videos/vid_demo.mov";

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper style={{ width: "90%", margin: "5%", padding: "5%" }}>
        <Typography variant='h3'>
          Advanced Text to Speech (TTS) Methods
        </Typography>
        <hr />
        <br />
        <Typography>
          We also experimented with more advanced methods to generate realistic
          speech. Here is an example of Oprah talking about a tough moment in
          her life.
        </Typography>
        <audio src={url1} controls='controls' />
        <br />
        <br />
        <Typography>Here is another example with Elon Musk.</Typography>
        <audio src={url2} controls='controls' />
        <hr />
        <br />
        <br />
        <video src={url3} controls='controls' style={{ width: "80%" }} />
        <br />
        <br />
        <Typography variant='h4'>
          How does it work?
        </Typography>
        <br />
        <Typography>
        Voice cloning is done using a set of 3 independent neural networks:
        <ol>
          <li>Speaker encoder network - this is primarily used for training a speaker verification task of noisy speech dataset without any transcript from thousands of speakers. This model generates an embedding vector from the speech sample of a target actor.</li>
          <li>Synthesis network - This is a sequence-to-sequence network based on Tacotron 2 TTS Synthesis model that generates a mel spectrogram from the text based on the target speaker’s embedding generated from Speaker encoder network.</li>
          <li>Vocoder Network - this is an auto-regressive WaveNet network that converts the mel spectrogram generated from the Synthesis network (frequency domain) into time domain waveform sample.</li>
        </ol>

        Resources used - <a href="https://github.com/CorentinJ/Real-Time-Voice-Cloning">Voice-Cloning Repository</a> based on the <a href="https://arxiv.org/pdf/1806.04558.pdf">Transfer Learning Verification TTS paper</a>.
        </Typography>
      </Paper>
    </React.Fragment>
  );
}
