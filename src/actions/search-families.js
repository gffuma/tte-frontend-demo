import fetchApi from './fetch-api';
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
} from '../constants/ActionTypes'
import { trim, mapValues, omit } from 'lodash';

export function setFilters(filters) {
  return (dispatch, getState) => {
    dispatch({ type: SET_SEARCH_FAMILIES_FILTERS, filters });
    dispatch(loadFamilies());
    // TODO: Check what to reload
    dispatch(loadUtensils());
    dispatch(loadGeometries());
    dispatch(loadCutters());
  };
};

export function resetFilters() {
  return (dispatch, getState) => {
    dispatch({ type: RESET_SEARCH_FAMILIES_FILTERS });
    dispatch(loadFamilies());
    // TODO: Check what to reload
    dispatch(loadUtensils());
    dispatch(loadGeometries());
    dispatch(loadCutters());
  };
};

export function setPage(page) {
  return (dispatch, getState) => {
    dispatch({ type: SET_SEARCH_FAMILIES_PAGE, page });
    dispatch(loadFamilies());
  };
};

function getFilters(state) {
  const filters = state.searchFamilies.filters;
  return mapValues(filters, filter => trim(filter));
}

export function loadFamilies() {
  return (dispatch, getState) => {
    const { cutter, geometry, utensil } = getFilters(getState());
    const { currentPage, perPage } = getState().searchFamilies.families.pagination;

    dispatch({ type: SEARCH_FAMILIES_REQUEST });

    fetchApi(`/families?cutter=${cutter}&geometry=${geometry}&utensil=${utensil}&page=${currentPage}&per_page=${perPage}`)
      .then(json => dispatch({
        type: SEARCH_FAMILIES_SUCCESS,
        items: json.data,
        pagination: omit(json.meta.pagination, ['links']),
      }));
  };
};

export function loadUtensils() {
  return (dispatch, getState) => {
    dispatch({ type: SEARCH_FAMILIES_UTENSILS_REQUEST });
    fetchApi(`/families/utensils`)
      .then(json => dispatch({ type: SEARCH_FAMILIES_UTENSILS_SUCCESS, items: json.data }));
  };
};

export function loadGeometries() {
  return (dispatch, getState) => {
    const { utensil } = getFilters(getState());

    dispatch({ type: SEARCH_FAMILIES_GEOMETRIES_REQUEST });
    fetchApi(`/families/geometries?utensil=${utensil}`)
      .then(json => dispatch({ type: SEARCH_FAMILIES_GEOMETRIES_SUCCESS, items: json.data }));
  };
};

export function loadCutters() {
  return (dispatch, getState) => {
    const { utensil, geometry } = getFilters(getState());

    dispatch({ type: SEARCH_FAMILIES_CUTTERS_REQUEST });
    fetchApi(`/families/cutters?utensil=${utensil}&geometry=${geometry}`)
      .then(json => dispatch({ type: SEARCH_FAMILIES_CUTTERS_SUCCESS, items: json.data }));
  };
};
