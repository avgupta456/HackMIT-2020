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
        <video src={url3} controls='controls' />
      </Paper>
    </React.Fragment>
  );
}
