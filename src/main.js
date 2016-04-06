//import './style.scss';
import 'babel-polyfill';
import { createStore, applyMiddleware } from 'redux';
import React from 'react';
import ReactDom from 'react-dom';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import App from './containers/App';
import { loadCutters, loadGeometries, loadSearchFamilies } from './actions';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, createLogger())
);


store.dispatch(loadCutters());
store.dispatch(loadGeometries());
store.dispatch(loadSearchFamilies());

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
