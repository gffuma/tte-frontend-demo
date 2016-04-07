//import './style.scss';
import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './containers/App';
import { loadCutters, loadGeometries, loadSearchFamilies } from './actions';

const store = configureStore();

// Loading initial data...
store.dispatch(loadCutters());
store.dispatch(loadGeometries());
store.dispatch(loadSearchFamilies());

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
