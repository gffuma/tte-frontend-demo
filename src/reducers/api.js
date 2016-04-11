import { combineReducers } from 'redux';
import {
  SET_API_TOKEN,
  SET_API_LOCALE
} from '../constants/ActionTypes';

function token(state = null, action) {
  if (action.type === SET_API_TOKEN) {
    return action.token;
  }

  return state;
}

function locale(state = null, action) {
  if (action.type === SET_API_LOCALE) {
    return action.locale;
  }

  return state;
}

export default combineReducers({
  token,
  locale,
});
