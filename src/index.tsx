import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import {store} from "./store/redux-toolkit/store";
import {BrowserRouter as Router} from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <Router>
            <App />
          </Router>
      </Provider>
  </React.StrictMode>,
  document.querySelector('.main')
);
