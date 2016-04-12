import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import WhoWeArePage from './containers/WhoWeArePage';
import SearchPage from './containers/SearchPage';
import {
  loadUtensils,
  loadCutters,
  loadGeometries,
  setFilters,
  loadFamilies
} from './actions/search-families';

export default (store) => (
  <Route path="/" component={App}>
    <IndexRoute component={SearchPage} onEnter={(nextState) => {
      store.dispatch(loadCutters());
      store.dispatch(loadUtensils());
      store.dispatch(loadGeometries());
      store.dispatch(loadCutters());
      //store.dispatch(loadFamilies());
    }} />
    <Route path="/who" component={WhoWeArePage} />
  </Route>
);
