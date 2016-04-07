import { combineReducers } from 'redux';
import searchFamilies from './search-families.js';

const rootReducer = combineReducers({
  searchFamilies,
});

export default rootReducer;
