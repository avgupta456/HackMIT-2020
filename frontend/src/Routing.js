import React from "react";
import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Home from "./Home.js";
import Person from "./Person.js";
import Directory from "./Directory.js";
import Random from "./Random.js";

import AppBar from "@material-ui/core/AppBar";
import { Link } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {
  useTheme,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";

export const HomeRoute = "/";
export const PersonRoute = "/person";
export const DirectoryRoute = "/directory";
export const RandomRoute = "/random";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

class Routing extends React.Component {
  render() {
    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <AppBar
            title='Title'
            color='default'
            style={{ alignItems: "center" }}
          >
            <Tabs onChange={this.handleChange}>
              <Tab label='Home' component={Link} to={HomeRoute} />
              <Tab label='Person' component={Link} to={PersonRoute} />
              <Tab label='Directory' component={Link} to={DirectoryRoute} />
              <Tab label='Random Chat' component={Link} to={RandomRoute} />
            </Tabs>
          </AppBar>
        </MuiThemeProvider>

        <Switch>
          <Route path={HomeRoute} exact component={Home} />
          <Route path={PersonRoute} component={Person} />
          <Route path={DirectoryRoute} component={Directory} />
          <Route path={RandomRoute} component={Random} />
        </Switch>
      </React.Fragment>
    );
  }
}
export default withRouter(Routing);
