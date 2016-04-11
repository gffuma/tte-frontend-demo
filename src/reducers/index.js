import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import searchFamilies from './search-families.js';
import api from './api.js';

const rootReducer = combineReducers({
  api,
  searchFamilies,
  routing,
});

export default rootReducer;
