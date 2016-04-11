import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './containers/App';
import { setApiToken, setApiLocale } from './actions/api';
import {
  loadUtensils,
  loadCutters,
  loadGeometries,
  setFilters,
  loadSearchFamilies
} from './actions/search-families';

const store = configureStore();

// API settings...
store.dispatch(setApiToken('MTQ1ODMxOTU2OA==.8LfkVjFEq4NAtLImtAZfjruCAPaajyU6o6lHw1mUnRkJGEMzUk2hRnWt5uKxP1l8UwFgkFrL1X3DfMFKkav'));
//store.dispatch(setApiLocale('it'));
//

//store.dispatch(setFilters({ utensil: 2 }));

//fetchApi(store.getState(), '/me?giova=figo')
//.catch((e) => {
  //console.log('Got', e);
//});

// Loading initial data...
store.dispatch(loadUtensils());
store.dispatch(loadGeometries());
store.dispatch(loadCutters());
//store.dispatch(loadFamilies());

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
