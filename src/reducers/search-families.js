import { combineReducers } from 'redux';
import { pick, keys } from 'lodash';
import {
  SET_SEARCH_FAMILIES_FILTERS,
  RESET_SEARCH_FAMILIES_FILTERS,
  SEARCH_FAMILIES_REQUEST,
  SEARCH_FAMILIES_SUCCESS,
  SEARCH_FAMILIES_FAILURE,
  SET_SEARCH_FAMILIES_PAGE,
  SEARCH_FAMILIES_UTENSILS_REQUEST,
  SEARCH_FAMILIES_UTENSILS_SUCCESS,
  SEARCH_FAMILIES_UTENSILS_FAILURE,
  SEARCH_FAMILIES_GEOMETRIES_REQUEST,
  SEARCH_FAMILIES_GEOMETRIES_SUCCESS,
  SEARCH_FAMILIES_GEOMETRIES_FAILURE,
  SEARCH_FAMILIES_CUTTERS_REQUEST,
  SEARCH_FAMILIES_CUTTERS_SUCCESS,
  SEARCH_FAMILIES_CUTTERS_FAILURE
} from '../constants/ActionTypes';

const defaultFiltersState = {
  geometry: null,
  cutter: null,
  utensil: null,
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

const defaultFamiliesState = {
  loading: false,
  items: [],
  pagination: {
    currentPage: 1,
    perPage: 500,
  }
};
// TODO: Handle loading and check for a valid request
function families(state = defaultFamiliesState, { type, items, pagination, page }) {
  if (type === SEARCH_FAMILIES_SUCCESS) {
    return { ...state, items, pagination };
  }

  if (type === SET_SEARCH_FAMILIES_PAGE) {
    return { ...state, pagination: { ...state.pagination, currentPage: page, count: null } };
  }

  return state;
}

function stupidListOfStuff(types) {
  const defaultState = {
    loading: false,
    items: [],
    error: null,
  };
  const [requestType, successType, failureType] = types;
  return (state = defaultState, { type, items, error }) => {
    if (type === requestType) {
      return {...state, loading: true };
    }
    if (type === successType) {
      return {...state, items, loading: false, error: null };
    }
    if (type === failureType) {
      return {...state, loading: false, error };
    }

    return state;
  };
}

// TODO: Handle loading and check valid
const utensils = stupidListOfStuff([
  SEARCH_FAMILIES_UTENSILS_REQUEST,
  SEARCH_FAMILIES_UTENSILS_SUCCESS,
  SEARCH_FAMILIES_UTENSILS_FAILURE
]);
const geometries = stupidListOfStuff([
  SEARCH_FAMILIES_GEOMETRIES_REQUEST,
  SEARCH_FAMILIES_GEOMETRIES_SUCCESS,
  SEARCH_FAMILIES_GEOMETRIES_FAILURE,
]);
const cutters = stupidListOfStuff([
  SEARCH_FAMILIES_CUTTERS_REQUEST,
  SEARCH_FAMILIES_CUTTERS_SUCCESS,
  SEARCH_FAMILIES_CUTTERS_FAILURE
]);

export default combineReducers({
  filters,
  families,
  utensils,
  geometries,
  cutters
});
