import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
// store, components, styles
import { store } from "./store";
import reportWebVitals from './reportWebVitals';
import App from './App';
import './stylesheets/index.css';
import './stylesheets/App.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Fragment>
    <BrowserRouter>
      <ReduxProvider store={store}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </ReduxProvider>
    </BrowserRouter>
  </Fragment>
);

reportWebVitals();
