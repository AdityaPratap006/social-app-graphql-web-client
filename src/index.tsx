import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AuthProvider } from './context/auth.context'
import { CustomThemeProvider } from "./context/theme.context";
import { ToastContainer } from 'react-toastify';

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <CustomThemeProvider>
        <ToastContainer />
        <App />
      </CustomThemeProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
