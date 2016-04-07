import { createSelector } from 'reselect';

const itemToFilter = ({ id, description }) => {
  return { value: id, name: description };
};

const getGeometries = (state) => state.searchFamilies.geometries.items;

export const getGeometriesFilters = createSelector(
  [ getGeometries ],
  geometries => geometries.map(itemToFilter)
);

const getCutters = (state) => state.searchFamilies.cutters.items;

export const getCuttersFilters = createSelector(
  [ getCutters ],
  cutters => cutters.map(itemToFilter)
);

const getUtensils = (state) => state.searchFamilies.utensils.items;

export const getUtensilsFilters = createSelector(
  [ getUtensils ],
  utensils => utensils.map(itemToFilter)
);
