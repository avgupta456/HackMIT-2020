import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import { CardActionArea, Input } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import axios from "axios";
import FormData from "form-data";
import MicRecorder from "mic-recorder-to-mp3";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

// const backend = "https://hackmit-2020-290013.ue.r.appspot.com";
const backend = "http://localhost:5000";
const name = "William Shakespeare";

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {"Copyright © "}
      <Link color='inherit' href='https://material-ui.com/'>
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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

export default function Person() {
  const classes = useStyles();
  const [transcript, setTranscript] = useState([]);
  const [blobUrl, setBlobUrl] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const addToTranscript = (text) => {
    let newTranscript = transcript;
    newTranscript.push(text);
    setTranscript(newTranscript);
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
    console.log(blob);

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
    } else {
      start();
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
  });

  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        <Grid style={{ padding: "100px" }} container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <img
                alt='Elon Musk'
                src='/images/elon_musk.jpg'
                style={{ borderRadius: "5%" }}
              />
              <h2>Elon Musk</h2>
              <p>Engineer, Entrepreneur, Inventor.</p>
              <div style={{ textAlign: "left" }}>
                <p>
                  Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Cras pretium hendrerit mattis. Cras vulputate libero in
                  dapibus porta. Cras eget dignissim tellus. Duis augue justo,
                  condimentum id scelerisque ultrices, auctor vel diam.{" "}
                </p>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <h2>Ask a Question</h2>
              <button onClick={() => toggle()}>
                <img
                  alt='Mic'
                  src='/images/mic.png'
                  width='17%'
                  height='auto'
                />
              </button>
              <audio src={blobUrl} controls='controls' />
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
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant='h6' align='center' gutterBottom>
          Footer
        </Typography>
        <Typography
          variant='subtitle1'
          align='center'
          color='textSecondary'
          component='p'
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
