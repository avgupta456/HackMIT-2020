import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

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
}));

var personStyle = {
  display: "flex",
  alignItems: "center",
  paddingBottom: "30px",
};

export default function Directory() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <main>
        <Grid style={{ padding: "100px" }} container spacing={3}>
          <Grid item xs={4}>
            <Paper className={classes.paper} style={{ paddingLeft: "40px" }}>
              <div style={{ textAlign: "left" }}>
                <h2>Business</h2>
                <div style={personStyle}>
                  <img
                    alt='Elon Musk'
                    src='/images/elon_musk.jpg'
                    width='25%'
                    style={{ borderRadius: "50%" }}
                  />
                  <h3 style={{ paddingLeft: "20px" }}>Elon Musk</h3>
                </div>
                <div style={personStyle}>
                  <img
                    alt='Elon Musk'
                    src='/images/elon_musk.jpg'
                    width='25%'
                    style={{ borderRadius: "50%" }}
                  />
                  <h3 style={{ paddingLeft: "20px" }}>Elon Musk</h3>
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper} style={{ paddingLeft: "40px" }}>
              <div style={{ textAlign: "left" }}>
                <h2>Technology</h2>
                <div style={personStyle}>
                  <img
                    alt='Elon Musk'
                    src='/images/elon_musk.jpg'
                    width='25%'
                    style={{ borderRadius: "50%" }}
                  />
                  <h3 style={{ paddingLeft: "20px" }}>Elon Musk</h3>
                </div>
                <div style={personStyle}>
                  <img
                    alt='Elon Musk'
                    src='/images/elon_musk.jpg'
                    width='25%'
                    style={{ borderRadius: "50%" }}
                  />
                  <h3 style={{ paddingLeft: "20px" }}>Elon Musk</h3>
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper} style={{ paddingLeft: "40px" }}>
              <div style={{ textAlign: "left" }}>
                <h2>Science</h2>
                <div style={personStyle}>
                  <img
                    alt='Elon Musk'
                    src='/images/elon_musk.jpg'
                    width='25%'
                    style={{ borderRadius: "50%" }}
                  />
                  <h3 style={{ paddingLeft: "20px" }}>Elon Musk</h3>
                </div>
                <div style={personStyle}>
                  <img
                    alt='Elon Musk'
                    src='/images/elon_musk.jpg'
                    width='25%'
                    style={{ borderRadius: "50%" }}
                  />
                  <h3 style={{ paddingLeft: "20px" }}>Elon Musk</h3>
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </main>
    </React.Fragment>
  );
}
