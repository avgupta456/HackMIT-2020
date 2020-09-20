import React from "react";

import axios from "axios";
import FormData from "form-data";
import MicRecorder from "mic-recorder-to-mp3";

import "./App.css";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

// const backend = "https://hackmit-2020-290013.ue.r.appspot.com";
const backend = "http://localhost:5000";
const name = "William-Shakespeare";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      blobURL: "",
      isBlocked: false,
    };
  }

  start = () => {
    if (this.state.isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          this.setState({ isRecording: true });
        })
        .catch((e) => console.error(e));
    }
  };

  stop = async () => {
    const [buffer, blob] = await Mp3Recorder.stop().getMp3();
    console.log(blob);

    const formData = new FormData();
    formData.append("audio", blob);
    let url = backend + "/get_response?name=" + name;
    console.log(url);
    const text = await axios.post(url, formData);
    console.log(text);
    url = backend + "/get_audio?text=" + text["data"].replace(" ", "-");
    const response = await axios.post(url, formData, { responseType: "blob" });
    console.log(response);
    const blobURL = URL.createObjectURL(response.data);
    console.log(blobURL);

    this.setState({ blobURL, isRecording: false });
  };

  componentDidMount() {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        this.setState({ isBlocked: false });
      },
      () => {
        console.log("Permission Denied");
        this.setState({ isBlocked: true });
      }
    );
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <button onClick={this.start} disabled={this.state.isRecording}>
            Record
          </button>
          <button onClick={this.stop} disabled={!this.state.isRecording}>
            Stop
          </button>
          <audio src={this.state.blobURL} controls='controls' />
        </header>
      </div>
    );
  }
}

export default App;
