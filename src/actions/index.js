import fetchApi from './fetch-api';
import {
  CUTTERS_REQUEST,
  CUTTERS_SUCCESS,
  CUTTERS_FAILURE,
  GEOMETRIES_REQUEST,
  GEOMETRIES_SUCCESS,
  GEOMETRIES_FAILURE,
  SET_SEARCH_FAMILIES_FILTERS,
  RESET_SEARCH_FAMILIES_FILTERS,
  SEARCH_FAMILIES_REQUEST,
  SEARCH_FAMILIES_SUCCESS,
  SEARCH_FAMILIES_FAILURE
} from '../constants/ActionTypes'
import { trim, mapValues } from 'lodash';

export function loadCutters() {
  return (dispatch, getState) => {
    dispatch({ type: CUTTERS_REQUEST });
    fetchApi(`/cutters`)
      .then(json => dispatch({ type: CUTTERS_SUCCESS, items: json.data }));
  };
};

export function loadGeometries() {
  return (dispatch, getState) => {
    dispatch({ type: GEOMETRIES_REQUEST });
    fetchApi(`/geometries`)
      .then(json => dispatch({ type: GEOMETRIES_SUCCESS, items: json.data }));
  };
};

export function setSearchFamiliesFilters(filters) {
  return (dispatch, getState) => {
    dispatch({ type: SET_SEARCH_FAMILIES_FILTERS, filters });
    dispatch(loadSearchFamilies());
  };
};

export function resetSearchFamiliesFilters() {
  return (dispatch, getState) => {
    dispatch({ type: RESET_SEARCH_FAMILIES_FILTERS });
    dispatch(loadSearchFamilies());
  };
};

export function loadSearchFamilies() {
  return (dispatch, getState) => {
    const filters = getState().searchFamilies.filters;
    const { cutter, geometry } = mapValues(filters, filter => trim(filter));
    dispatch({ type: SEARCH_FAMILIES_REQUEST });
    fetchApi(`/families?cutter=${cutter}&geometry=${geometry}`)
      .then(json => dispatch({
        type: SEARCH_FAMILIES_SUCCESS,
        items: json.data,
        pagination: json.meta.pagination,
      }));
  };
};
