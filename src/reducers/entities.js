import { merge } from 'lodash';

const defaultState = {
  families: {},
  cutters: {},
  utensils: {},
  geometries: {},
  articles: {},
  headers: {},
};
export default function entities(state = defaultState, action) {
  if (action.entities) {
    return merge({}, state, action.entities);
  }

  return state;
}
