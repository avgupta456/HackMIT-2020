import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Routing from './Routing.js';
import './App.css';
import {
  useTheme,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

function getNav() {
}

function App() {
  return (
<Router><Routing /></Router>
  );
}

export default App;
