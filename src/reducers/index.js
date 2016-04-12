import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import api from './api.js';
import entities from './entities.js';
import searchFamilies from './search-families.js';

const rootReducer = combineReducers({
  api,
  entities,
  searchFamilies,
  routing,
});

export default rootReducer;
