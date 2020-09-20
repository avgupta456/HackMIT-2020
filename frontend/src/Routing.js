import React from "react";
import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Home from "./Home.js";
import Person from "./Person.js";
import Demo from "./Demo.js";

import AppBar from "@material-ui/core/AppBar";
import { Link } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

export const HomeRoute = "/";
export const PersonRoute = "/person/:person";
export const DemoRoute = "/demo";
export const RandomRoute = "/random";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

class Routing extends React.Component {
  getPerson = () => {
    const names = [
      "bill_gates",
      "oprah_winfrey",
      "donald_trump",
      "elon_musk",
      "sheryl_sandburg",
      "michael_jordan",
      "richard_feynman",
      "nelson_mandela",
      "steve_jobs",
    ];

    return names[Math.floor(Math.random() * names.length)];
  };

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
              <Tab label='Random Chat' component={Link} to={RandomRoute} />
              <Tab label='Advanced Demo' component={Link} to={DemoRoute} />
            </Tabs>
          </AppBar>
        </MuiThemeProvider>
        <Switch>
          <Route path={HomeRoute} exact component={Home} />
          <Route path={PersonRoute} component={Person} />
          <Route
            path={RandomRoute}
            render={() => <Person person={this.getPerson()} />}
          />
          <Route path={DemoRoute} component={Demo} />
        </Switch>
      </React.Fragment>
    );
  }
}
export default withRouter(Routing);
