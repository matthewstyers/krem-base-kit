require('./styles/site.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import { Router, browserHistory } from 'react-router';

import RootReducer from './RootReducer';
import routes from './routes';

const store = createStore(
  RootReducer,
  compose(
    applyMiddleware(promise),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

ReactDOM.render(
  <Provider store={ store }>
    <Router
      history={ browserHistory }
      routes={ routes } />
  </Provider>
  , document.querySelector('#react'));
