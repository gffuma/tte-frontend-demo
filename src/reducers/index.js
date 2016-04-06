import { combineReducers } from 'redux';
import searchFamilies from './search-families.js';
import {
  CUTTERS_REQUEST,
  CUTTERS_SUCCESS,
  CUTTERS_FAILURE,
  GEOMETRIES_REQUEST,
  GEOMETRIES_SUCCESS,
  GEOMETRIES_FAILURE
} from '../constants/ActionTypes'

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

const cutters = stupidListOfStuff([CUTTERS_REQUEST, CUTTERS_SUCCESS, CUTTERS_FAILURE]);
const geometries = stupidListOfStuff([GEOMETRIES_REQUEST, GEOMETRIES_SUCCESS, GEOMETRIES_FAILURE]);

const rootReducer = combineReducers({
  searchFamilies,
  cutters,
  geometries,
});

export default rootReducer;
