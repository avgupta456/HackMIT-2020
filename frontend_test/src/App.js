import React from "react";

import axios from "axios";
import FormData from "form-data";
import MicRecorder from "mic-recorder-to-mp3";

import "./App.css";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const backend = "http://localhost:5000/test";
const name = "Steve-Jobs";

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

  stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        console.log(blob);
        const blobURL = URL.createObjectURL(blob);
        this.setState({ blobURL, isRecording: false });
        const formData = new FormData();
        formData.append("audio", blob);
        axios
          .post(backend + "?name=" + name, formData)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch((e) => console.log(e));
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
