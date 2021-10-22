import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import {store} from "./store/redux-toolkit/store";


ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
            <App />
      </Provider>
  </React.StrictMode>,
  document.querySelector('.main')
);
