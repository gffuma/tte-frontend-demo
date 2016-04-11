import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import { hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store/configureStore';
import { setApiToken, setApiLocale } from './actions/api';
import Root from './containers/Root';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

// API settings...
store.dispatch(setApiToken('MTQ1ODMxOTU2OA==.8LfkVjFEq4NAtLImtAZfjruCAPaajyU6o6lHw1mUnRkJGEMzUk2hRnWt5uKxP1l8UwFgkFrL1X3DfMFKkav'));
//store.dispatch(setApiLocale('it'));

ReactDom.render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);
