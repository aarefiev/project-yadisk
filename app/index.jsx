// @flow

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './components/App.jsx';
import { fetchDiskItems } from './actions';

const devToolsMiddleware = window.__REDUX_DEVTOOLS_EXTENSION__ &&
                           window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    devToolsMiddleware,
  ),
);

store.dispatch(fetchDiskItems(window.location.pathname));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container'),
);
