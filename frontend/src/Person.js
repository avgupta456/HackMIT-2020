import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import axios from "axios";
import FormData from "form-data";
import MicRecorder from "mic-recorder-to-mp3";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const backend = "https://hackmit-2020-290013.ue.r.appspot.com";
// const backend = "http://localhost:5000";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "12px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  },
  // column: {
  //   float: left,
  //   width: '50%',
  //   padding: 10,
  //   height: 300,
  // },
  // row: {
  //   content: "",
  //   display: table,
  //   clear: both,
  // },
}));

export default function Person(props) {
  const classes = useStyles();
  const [transcript, setTranscript] = useState([]);
  const [blobUrl, setBlobUrl] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const [haveDetails, setHaveDetails] = useState(false);
  const [bio, setBio] = useState("");
  const [three, setThree] = useState("");

  let person = "";
  let params = useParams();
  if (props.person) {
    person = props.person;
  } else {
    person = params["person"];
  }
  let name = person.replace("_", " ");
  name = name.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

  const addToTranscript = (text) => {
    let newTranscript = transcript;
    newTranscript.push(text);
    setTranscript(newTranscript);
  };

  const getDetails = async () => {
    setHaveDetails(true);
    console.log({ three, bio });
    if (three === "") {
      let url =
        backend +
        "/get_text?name=" +
        name +
        "&question=Describe%20yourself%20in%20exactly%20three%20words";
      let text = await axios.post(url);
      setThree(text["data"]);
    }

    if (bio === "") {
      let url =
        backend +
        "/get_text?name=" +
        name +
        "&question=Tell%20me%20about%20yourself";
      let text = await axios.post(url);
      setBio(text["data"]);
    }
  };

  const start = () => {
    if (isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          setIsRecording(true);
        })
        .catch((e) => console.error(e));
    }
  };

  const stop = async () => {
    const [buffer, blob] = await Mp3Recorder.stop().getMp3();
    console.log({ buffer, blob });

    const formData = new FormData();
    formData.append("audio", blob);
    let url = backend + "/get_response?name=" + name;
    const text = await axios.post(url, formData);
    console.log(text);
    const { input, output } = text["data"];
    addToTranscript("Me: " + input);
    addToTranscript(name + ": " + output);
    url = backend + "/get_audio?text=" + output;
    const response = await axios.post(url, formData, { responseType: "blob" });
    console.log(response);
    const blobURL = URL.createObjectURL(response.data);
    setBlobUrl(blobURL);
    setIsRecording(false);
  };

  const toggle = () => {
    if (isRecording) {
      stop();
      document.getElementById("animWave").src = "/images/mic.png";
      document.getElementById("animWave").width = "100";
      // document.getElementById("siriWave").style.visibility = "hidden";
    } else {
      start();
      document.getElementById("animWave").src = "/images/siri.gif";
      document.getElementById("animWave").width = "300";
      // var url = "/images/siri.gif";

      // var image = new Image(200, 100);
      // image.src = url;
      // document.getElementById("siriWave").appendChild(image);
    }
  };

  useEffect(() => {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        setIsBlocked(false);
      },
      () => {
        console.log("Permission Denied");
        setIsBlocked(true);
      }
    );
    if (haveDetails === false) {
      getDetails();
    }
  });

  // function Wave(recording) {
  //   if (recording) {
  //     return (
  //       <img alt="Siri" src="/images/siri.gif" width="17%" height="auto" />
  //     );
  //   }
  // }

  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        <Grid style={{ padding: "100px" }} container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <img
                alt={name}
                src={"/images/" + person + ".jpg"}
                style={{ borderRadius: "5%", width: "80%" }}
              />
              <h2>{name}</h2>
              <p>{three}</p>
              <div style={{ textAlign: "left" }}>
                <p> {bio} </p>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <h2>Ask a Question</h2>
              <button onClick={() => toggle()}>
                <img
                id="animWave"
                  alt="Mic"
                  src="/images/mic.png"
                  width="17%"
                  height="auto"
                />
              </button>
              <div id="siriWave"></div>
              <br />
              <br />
              <audio src={blobUrl} controls="controls" />
              <h2>Transcript</h2>
              <div style={{ textAlign: "left" }}>
                {transcript.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
            </Paper>
          </Grid>
        </Grid>
      </main>
    </React.Fragment>
  );
}
