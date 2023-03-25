
import * as React from "react"
import * as ReactDOM from 'react-dom';
import ViewPage from "./components/ViewPage";

import { useTranslation } from "react-i18next";
import "./i18n";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import IndexedDB from "./components/Common/IndexedDB";

const theme = createTheme({
  palette: {
    primary: {
      main: '#280b0bff',
    },
  },
});
// import '../styles/globals.css'


const root = document.getElementById('root');

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
               <IndexedDB/>
            </React.Fragment>
        </ThemeProvider>
    );
}

ReactDOM.render(<App />, root);