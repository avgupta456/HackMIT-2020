import React from 'react';
import { Switch, Route } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import Home from './Home.js'
import Person from './Person.js'
import Directory from './Directory.js'
import Random from './Random.js'

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import { CardActionArea } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
    useTheme,
    createMuiTheme,
    MuiThemeProvider
  } from "@material-ui/core/styles";
  
export const HomeRoute = "/";
export const PersonRoute = "/person";
export const DirectoryRoute = "/directory"
export const RandomRoute = "/random"


const theme = createMuiTheme({
    palette: {
      type: 'dark'
    }
  });

class Routing extends React.Component {
    render() {
        return (
            <React.Fragment>
                <MuiThemeProvider theme={theme}>
                    <AppBar
                    title="Title"
                    color="default"
                >
                    <Tabs
                        onChange={this.handleChange}
                        >
                    <Tab label="Home" component={Link} to={HomeRoute} />
                    <Tab label="Person" component={Link} to={PersonRoute} />
                    <Tab label="Directory" component={Link} to={DirectoryRoute} />
                    <Tab label="Random Chat" component={Link} to={RandomRoute} />

                    </Tabs>
                </AppBar>
                </MuiThemeProvider>

                <Switch>
                    <Route path={HomeRoute} exact component={Home} />
                    <Route path={PersonRoute} component={Person} />
                    <Route path={DirectoryRoute} component={Directory} />
                    <Route path={RandomRoute} component={Random} />

                </Switch>
            </React.Fragment >
        );
    }
}export default withRouter(Routing);