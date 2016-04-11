import { fetchApi } from './api';
import { omit, mapValues, findIndex } from 'lodash';
import { mapObjForQs, isEqualObjPick } from '../utils';
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

// Re-calculate filter based query based on filters changes
function dispatchByDiffInFilters(diffInFilters, dispatch) {
    if (diffInFilters(['utensil'])) {
      dispatch(loadGeometries());
    }
    if (diffInFilters(['utensil', 'geometry'])) {
      dispatch(loadCutters());
    }
}

export function setFilters(filters) {
  return (dispatch, getState) => {
    // Calculate difference in filters
    const prevFilters = getState().searchFamilies.filters;
    const nextFilters = { ...prevFilters, ...filters };
    const diffInFilters = (keys = null) => !isEqualObjPick(prevFilters, nextFilters, keys);

    dispatch({ type: SET_SEARCH_FAMILIES_FILTERS, filters });
    dispatchByDiffInFilters(diffInFilters, dispatch);
  };
};

export function resetFilters() {
  return (dispatch, getState) => {
    // Calculate difference in filters
    const prevFilters = getState().searchFamilies.filters;
    const nextFilters = mapValues(prevFilters, filter => null);
    const diffInFilters = (keys = null) => !isEqualObjPick(prevFilters, nextFilters, keys);

    dispatch({ type: RESET_SEARCH_FAMILIES_FILTERS });
    dispatchByDiffInFilters(diffInFilters, dispatch);
  };
};

export function setPage(page) {
  return (dispatch, getState) => {
    dispatch({ type: SET_SEARCH_FAMILIES_PAGE, page });
    dispatch(loadFamilies());
  };
};

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

function resetInvalidFilter(state, dispatch, filterKey, entityKey) {
  const filterValue = state.searchFamilies.filters[filterKey];
  if (filterValue !== null) {
    const filterItems = state.searchFamilies[entityKey].items;
    // Invalid filter, set it to null
    if (findIndex(filterItems, ['id', filterValue]) === -1) {
      dispatch(setFilters({ [filterKey]: null }));
    }
  }
}

export function loadUtensils() {
  return (dispatch, getState) => {
    dispatch({ type: SEARCH_FAMILIES_UTENSILS_REQUEST });
    fetchApi(getState(), `/families/utensils`)
    .then(
      json => {
        dispatch({ type: SEARCH_FAMILIES_UTENSILS_SUCCESS, items: json.data })
      },
      error => dispatch({ type: SEARCH_FAMILIES_UTENSILS_FAILURE, error })
     );
  };
};

export function loadGeometries() {
  return (dispatch, getState) => {
    const filters = getState().searchFamilies.filters;
    const { utensil } = mapObjForQs(filters);

    dispatch({ type: SEARCH_FAMILIES_GEOMETRIES_REQUEST, filters });
    fetchApi(getState(), `/families/geometries?utensil=${utensil}`)
    .then(
      json => {
        dispatch({ type: SEARCH_FAMILIES_GEOMETRIES_SUCCESS, items: json.data, filters });
        resetInvalidFilter(getState(), dispatch, 'geometry', 'geometries');
      },
      error => dispatch({ type: SEARCH_FAMILIES_GEOMETRIES_FAILURE, error, filters })
    );
  };
};

export function loadCutters() {
  return (dispatch, getState) => {
    const filters = getState().searchFamilies.filters;
    const { utensil, geometry } = mapObjForQs(filters);

    dispatch({ type: SEARCH_FAMILIES_CUTTERS_REQUEST, filters });
    fetchApi(getState(), `/families/cutters?utensil=${utensil}&geometry=${geometry}`)
    .then(
      json => {
        dispatch({ type: SEARCH_FAMILIES_CUTTERS_SUCCESS, items: json.data, filters });
        resetInvalidFilter(getState(), dispatch, 'cutter', 'cutters');
      },
      error => dispatch({ type: SEARCH_FAMILIES_CUTTERS_FAILURE, error, filters })
    );
  };
};
