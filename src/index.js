import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material';

import store from './redux/store';

import App from './components/App/App';

const theme = createTheme({
  palette: {
    primary: {
        main: '#364f6b',
        contrastText: '#fff'
    },
    secondary: {
        main: '#67ced4'
    }
  }
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#364f6b',
      contrastText: '#fff'
      },
    secondary: {
      main: '#67ced4'
      } ,
    }
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={darkTheme}>
    <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('react-root'),
);
