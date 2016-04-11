import { pick, isEqual, mapValues, trim } from 'lodash';

// Compare only given keys of two objects
export function isEqualObjPick(obj1, obj2, cmpKeys = null) {
  if (cmpKeys) {
    return isEqual(pick(obj1, cmpKeys), pick(obj2, cmpKeys));
  }

  // No pick
  return isEqual(obj1, obj2);
};

// Empty string instead of null
export function mapObjForQs(obj) {
  return mapValues(obj, value => trim(value));
};
