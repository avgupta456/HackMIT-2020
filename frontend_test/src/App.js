import React from "react";

import axios from "axios";
import FormData from "form-data";
import MicRecorder from "mic-recorder-to-mp3";

import "./App.css";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const backend = "http://localhost:5000/get_options";
const name = ""; // "Steve-Jobs";

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
    const response = await axios.post(backend + "?name=" + name, formData, {
      responseType: "blob",
    });

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
