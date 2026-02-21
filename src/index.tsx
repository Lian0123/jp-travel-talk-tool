
import * as React from "react";
import * as ReactDOM from 'react-dom';

import "./i18n";

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IndexedDB from "./components/Common/IndexedDB";

const theme = createTheme({
  palette: {
    primary: {
      main: '#280b0bff',
    },
    background: {
      default: '#f9f9f9ff',
    }
  },
  shape: {
    borderRadius: 10,
  }
});

const root = document.getElementById('root');

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
             <CssBaseline />
               <IndexedDB/>
            </React.Fragment>
        </ThemeProvider>
    );
};

ReactDOM.render(<App />, root);

if (window.location.protocol !== 'file:' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => null);
  });
}