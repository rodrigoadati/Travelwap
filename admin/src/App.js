import React, { Component } from 'react';
import Main from './Main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin'


injectTapEventPlugin();
// import logo from './logo.svg';



class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Main />
      </MuiThemeProvider>
    )
  }
}

export default App;
