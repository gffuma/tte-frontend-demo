import { fetchApi } from './api';
import { omit, mapValues, findIndex, keyBy, keys, parseInt } from 'lodash';
import { mapObjForQs, isEqualObjPick } from '../utils';
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
} from '../constants/ActionTypes'

// Re-calculate filter based query based on filters changes
function dispatchByDiffInFilters(diffInFilters, dispatch) {
    if (diffInFilters(['utensil'])) {
      dispatch(loadGeometries());
    }
    if (diffInFilters(['utensil', 'geometry'])) {
      dispatch(loadCutters());
    }
    if (diffInFilters()) {
      // Reload families and reset pagination
      dispatch({ type: RESET_SEARCH_FAMILIES_PAGE });
      dispatch(loadFamilies());
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

export function setPage(newPage) {
  return (dispatch, getState) => {
    const page = Number(newPage);
    if (page) {
      dispatch({ type: SET_SEARCH_FAMILIES_PAGE, page });
      dispatch(loadFamilies());
    }
  };
};

export function loadFamilies() {
  return (dispatch, getState) => {
    const filters = getState().searchFamilies.filters;
    const { cutter, geometry, utensil } = mapObjForQs(filters);
    const pagination = getState().searchFamilies.families.pagination;
    const { currentPage, perPage } = pagination;

    dispatch({ type: SEARCH_FAMILIES_REQUEST, filters });

    fetchApi(getState(), `/families?cutter=${cutter}&geometry=${geometry}&utensil=${utensil}&page=${currentPage}&per_page=${perPage}`)
    .then(
      json => {
        const families = keyBy(json.data, 'id');
        const ids = keys(families).map(parseInt);
        dispatch({
          type: SEARCH_FAMILIES_SUCCESS,
          pagination: omit(json.meta.pagination, ['links']),
          filters,
          ids,
          entities: { families },
        });
        // Check if page is valid
        const { pagination } = getState().searchFamilies.families;
        if (pagination.currentPage > pagination.totalPages) {
          dispatch({ type: RESET_SEARCH_FAMILIES_PAGE });
          dispatch(loadFamilies());
        }
      },
      error => dispatch({
        type: SEARCH_FAMILIES_GEOMETRIES_FAILURE,
        error,
        pagination,
        filters,
      })
    );
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
        const utensils = keyBy(json.data, 'id');
        const ids = keys(utensils).map(parseInt);
        dispatch({ type: SEARCH_FAMILIES_UTENSILS_SUCCESS, ids, entities: { utensils } })
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
        const geometries = keyBy(json.data, 'id');
        const ids = keys(geometries).map(parseInt);
        dispatch({ type: SEARCH_FAMILIES_GEOMETRIES_SUCCESS, ids, filters, entities: { geometries } });
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
        const cutters = keyBy(json.data, 'id');
        const ids = keys(cutters).map(parseInt);
        dispatch({ type: SEARCH_FAMILIES_CUTTERS_SUCCESS, ids, filters, entities: { cutters } });
        resetInvalidFilter(getState(), dispatch, 'cutter', 'cutters');
      },
      error => dispatch({ type: SEARCH_FAMILIES_CUTTERS_FAILURE, error, filters })
    );
  };
};
