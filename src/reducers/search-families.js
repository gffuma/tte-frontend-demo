import { combineReducers } from 'redux';
import { pick, keys } from 'lodash';
import { isEqualObjPick } from '../utils';
import {
  SET_SEARCH_FAMILIES_FILTERS,
  RESET_SEARCH_FAMILIES_FILTERS,
  SEARCH_FAMILIES_REQUEST,
  SEARCH_FAMILIES_SUCCESS,
  SEARCH_FAMILIES_FAILURE,
  SET_SEARCH_FAMILIES_PAGE,
  RESET_SEARCH_FAMILIES_PAGE,
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
    perPage: 10,
  }
};
function families(state = defaultFamiliesState, { type, items, pagination, page }) {

  // Valid pagination
  if (type === SEARCH_FAMILIES_SUCCESS || type === SEARCH_FAMILIES_FAILURE ) {
    if (! isEqualObjPick(state.pagination, pagination, ['currentPage', 'perPage'])) {
      return state;
    }
  }

  if (type === SEARCH_FAMILIES_REQUEST) {
    return {...state, loading: true };
  }

  if (type === SEARCH_FAMILIES_SUCCESS) {
    return { ...state, items, pagination, loading: false };
  }

  if (type === SEARCH_FAMILIES_FAILURE) {
    return {...state, loading: false };
  }

  if (type === SET_SEARCH_FAMILIES_PAGE) {
    return { ...state, pagination: {
      ...state.pagination,
      currentPage: page,
      count: null,
    }};
  }

  if (type === RESET_SEARCH_FAMILIES_PAGE) {
    return { ...state, pagination: {
      ...state.pagination,
      currentPage: 1,
      count: null,
      total: null,
      totalPages: null,
    }};
  }

  return state;
}

function stupidListOfStuff(types) {
  const defaultState = {
    loading: false,
    items: [],
  };
  const [requestType, successType, failureType] = types;
  return (state = defaultState, { type, items }) => {
    if (type === requestType) {
      return {...state, loading: true };
    }
    if (type === successType) {
      return {...state, items, loading: false };
    }
    if (type === failureType) {
      return {...state, loading: false };
    }

    return state;
  };
}

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

function validFilters(reducer) {
  return (state, action) => {
    switch (action.type) {

      case SEARCH_FAMILIES_SUCCESS:
      case SEARCH_FAMILIES_FAILURE:
        if (isEqualObjPick(state.filters, action.filters)) {
          return reducer(state, action);
        }
        return state;

      case SEARCH_FAMILIES_GEOMETRIES_SUCCESS:
      case SEARCH_FAMILIES_GEOMETRIES_FAILURE:
        if (isEqualObjPick(state.filters, action.filters, ['utensil'])) {
          return reducer(state, action);
        }
        return state;

      case SEARCH_FAMILIES_CUTTERS_SUCCESS:
      case SEARCH_FAMILIES_CUTTERS_FAILURE:
        if (isEqualObjPick(state.filters, action.filters, ['utensil', 'geometry'])) {
          return reducer(state, action);
        }
        return state;

      default:
        return reducer(state, action);
    }
  };
}

export default validFilters(combineReducers({
  filters,
  families,
  utensils,
  geometries,
  cutters
}));
