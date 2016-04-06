import { combineReducers } from 'redux';
import { pick, keys } from 'lodash';
import {
  SET_SEARCH_FAMILIES_FILTERS,
  RESET_SEARCH_FAMILIES_FILTERS,
  SEARCH_FAMILIES_REQUEST,
  SEARCH_FAMILIES_SUCCESS,
  SEARCH_FAMILIES_FAILURE
} from '../constants/ActionTypes';

const defaultFiltersState = {
  geometry: null,
  cutter: null,
};
function filters(state = defaultFiltersState, action) {
  if (action.type === SET_SEARCH_FAMILIES_FILTERS && typeof action.filters === 'object') {
    return Object.assign({}, state, pick(action.filters, keys(defaultFiltersState)));
  }

  if (action.type === RESET_SEARCH_FAMILIES_FILTERS) {
    return defaultFiltersState;
  }

  return state;
}

function families(state = {loading: false, items: []}, action) {
  if (action.type === SEARCH_FAMILIES_SUCCESS) {
    return { ...state, items: action.items };
  }
  return state;
}

export default combineReducers({
  filters,
  families,
});
