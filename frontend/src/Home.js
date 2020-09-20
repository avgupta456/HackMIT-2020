import React from "react";
import Card from "@material-ui/core/Card";
import { CardActionArea } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";

import Header from "./Header.js";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 0),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
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
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function GetPersonData(cardNum) {
  if (cardNum === 1) {
    return ["Bill Gates", "/images/bill_gates.jpg", "", "bill_gates"];
  } else if (cardNum === 2) {
    return ["Oprah Winfrey", "/images/oprah_winfrey.jpg", "", "oprah_winfrey"];
  } else if (cardNum === 3) {
    return ["Donald Trump", "/images/donald_trump.jpg", "", "donald_trump"];
  } else if (cardNum === 4) {
    return ["Elon Musk", "/images/elon_musk.jpg", "", "elon_musk"];
  } else if (cardNum === 5) {
    return [
      "Sheryl Sandberg",
      "/images/sheryl_sandberg.jpg",
      "",
      "sheryl_sandberg",
    ];
  } else if (cardNum === 6) {
    return [
      "Michael Jordan",
      "/images/michael_jordan.jpg",
      "",
      "michael_jordan",
    ];
  } else if (cardNum === 7) {
    return [
      "Richard Feynman",
      "/images/richard_feynman.jpg",
      "",
      "richard_feynman",
    ];
  } else if (cardNum === 8) {
    return [
      "Nelson Mandela",
      "/images/nelson_mandela.jpg",
      "",
      "nelson_mandela",
    ];
  } else {
    return ["Steve Jobs", "/images/steve_jobs.jpg", "", "steve_jobs"];
  }
}

function CreateCard(cardNum) {
  const classes = useStyles();
  const person_data = GetPersonData(cardNum);
  return (
    <Card className={classes.card}>
      <CardActionArea component={Link} to={"/person/" + person_data[3]}>
        <CardMedia
          className={classes.cardMedia}
          image={person_data[1]}
          title='Contemplative Reptile'
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant='h5' component='h2'>
            {person_data[0]}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {person_data[2]}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Header />
      <CssBaseline />
      <main>
        <Container className={classes.cardGrid} maxWidth='md'>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                {CreateCard(card)}
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
