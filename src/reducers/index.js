import { combineReducers } from 'redux';
import searchFamilies from './search-families.js';
import api from './api.js';

const rootReducer = combineReducers({
  api,
  searchFamilies,
});

export default rootReducer;
