import { createSelector } from 'reselect';

const itemToFilter = ({ id, description }) => {
  return { value: id, name: description };
};

const getUtensilsEntity = (state) => state.entities.utensils;
const getUtensilsIds = (state) => state.searchFamilies.utensils.ids;
const getUtensils = createSelector(
  [ getUtensilsIds, getUtensilsEntity ],
  (ids, utensils) => ids.map(id => utensils[id])
);
export const getUtensilsFilters = createSelector(
  [ getUtensils ],
  utensils => utensils.map(itemToFilter)
);

const getGeometriesEntity = (state) => state.entities.geometries;
const getGeometriesIds = (state) => state.searchFamilies.geometries.ids;
const getGeometries = createSelector(
  [ getGeometriesIds, getGeometriesEntity ],
  (ids, geometries) => ids.map(id => geometries[id])
);
export const getGeometriesFilters = createSelector(
  [ getGeometries ],
  geometries => geometries.map(itemToFilter)
);

const getCuttersEntity = (state) => state.entities.cutters;
const getCuttersIds = (state) => state.searchFamilies.cutters.ids;
const getCutters = createSelector(
  [ getCuttersIds, getCuttersEntity ],
  (ids, cutters) => ids.map(id => cutters[id])
);

export const getCuttersFilters = createSelector(
  [ getCutters ],
  cutters => cutters.map(itemToFilter)
);

const getFamiliesEntity = (state) => state.entities.families;
const getFamiliesIds = (state) => state.searchFamilies.families.ids;
export const getFamilies = createSelector(
  [  getFamiliesIds, getFamiliesEntity ],
  (ids, families) => ids.map(id => families[id])
);
