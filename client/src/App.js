import React from 'react';
import './App.css';
import RouterComponent from "./components/Router";
import { CookiesProvider } from 'react-cookie';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => (
    <MuiThemeProvider>
        <CookiesProvider>
            <RouterComponent />
        </CookiesProvider>
    </MuiThemeProvider>
)

export default App;
