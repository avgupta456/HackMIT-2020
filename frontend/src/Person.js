import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import { CardActionArea } from "@material-ui/core";
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
import Paper from '@material-ui/core/Paper';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
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
    textAlign: 'center',
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

  return (
    <React.Fragment>
      <CssBaseline />

      <main>
      <Grid style={{padding: "100px"}} container spacing={3}>
        
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            
          <img alt="Elon Musk" src="/images/elon_musk.jpg" style={{borderRadius: "5%"}}/>
            <h2>Elon Musk</h2>
            <p>Engineer, Entrepreneur, Inventor.</p>
            <div style={{textAlign: 'left'}} >
            <p>Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pretium hendrerit mattis. Cras vulputate libero in dapibus porta. Cras eget dignissim tellus. Duis augue justo, condimentum id scelerisque ultrices, auctor vel diam. </p>
            </div>
          </Paper>
          
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>

          <h2>Transcript</h2>
            <img alt="Mic" src="/images/mic.png" width="17%" height="auto"/>
            <div style={{textAlign: 'left'}} >
            <p>Elon Musk: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pretium hendrerit mattis. Cras vulputate libero in dapibus porta. Cras eget dignissim tellus. Duis augue justo, condimentum id scelerisque ultrices, auctor vel diam. Donec sed elit sed lectus tempor ultrices. Aliquam a enim id erat varius vestibulum non viverra nibh. </p>
            <p>Me: Integer placerat libero malesuada, consequat neque id, eleifend leo. Proin eu egestas lacus. Fusce ullamcorper dui eget ultrices bibendum. Aenean eu turpis commodo, dignissim dolor eu, eleifend mauris. Cras dictum erat vel posuere finibus. Aenean quis congue augue. Sed pharetra sodales pharetra. </p>
            
            <p>Elon Musk: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pretium hendrerit mattis. Cras vulputate libero in dapibus porta. Cras eget dignissim tellus. Duis augue justo, condimentum id scelerisque ultrices, auctor vel diam. Donec sed elit sed lectus tempor ultrices. Aliquam a enim id erat varius vestibulum non viverra nibh. </p>
            <p>Me: Integer placerat libero malesuada, consequat neque id, eleifend leo. Proin eu egestas lacus. Fusce ullamcorper dui eget ultrices bibendum. Aenean eu turpis commodo, dignissim dolor eu, eleifend mauris. Cras dictum erat vel posuere finibus. Aenean quis congue augue. Sed pharetra sodales pharetra. </p>
            </div>
          </Paper>
        </Grid>
        
      </Grid>

      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
