import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './Components/Reducers/index'
import {composeWithDevTools} from 'redux-devtools-extension'
import reduxThunk from 'redux-thunk'
import store from './store';
import './index.css';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <Router>
    <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
