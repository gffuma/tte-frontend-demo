//import './style.scss';
import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './containers/App';
//import { loadCutters, loadGeometries, loadSearchFamilies } from './actions';

const store = configureStore();
import {
  loadUtensils,
  loadGeometries,
  loadCutters,
  loadFamilies
} from './actions/search-families';

// Loading initial data...
store.dispatch(loadUtensils());
store.dispatch(loadGeometries());
store.dispatch(loadCutters());
store.dispatch(loadFamilies());

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
