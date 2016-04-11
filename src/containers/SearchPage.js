import React from 'react'
import Filter from '../components/Filter';
import PaginateFamilyList from '../components/PaginateFamilyList';
import { connect } from 'react-redux';
import {
  getUtensilsFilters,
  getGeometriesFilters,
  getCuttersFilters
} from '../selectors';
import {
  setFilters,
  resetFilters,
  setPage
} from '../actions/search-families';

class SearchPage extends React.Component {
  render() {
    const {
      families,
      familiesLoading,
      pagination,
      currentFilters,
      utensilsFilters,
      utensilsLoading,
      geometriesFilters,
      geometriesLoading,
      cuttersFilters,
      cuttersLoading,
      setFilters,
      resetFilters,
      setPage
    } = this.props;

    return (
      <div>

        <button
          type="button"
          onClick={resetFilters}>Reset Filters!</button>
        <br />
        <br />

        {(() => {
          if (utensilsLoading) {
            return <div>Loading...</div>;
          }
        })()}
        <Filter
          filterName="Utensile"
          filters={utensilsFilters}
          onFilterChange={utensil => setFilters({ utensil })}
          currentFilter={currentFilters.utensil} />

        {(() => {
          if (geometriesLoading) {
            return <div>Loading...</div>;
          }
        })()}
        <Filter
          filterName="Geometria"
          filters={geometriesFilters}
          onFilterChange={geometry => setFilters({ geometry })}
          currentFilter={currentFilters.geometry} />

        {(() => {
          if (cuttersLoading) {
            return <div>Loading...</div>;
          }
        })()}
        <Filter
          filterName="Tagliente"
          filters={cuttersFilters}
          onFilterChange={cutter => setFilters({ cutter })}
          currentFilter={currentFilters.cutter} />

        <br />
        <hr />

        {(() => {
          if (familiesLoading) {
            return <div><b>Loading...</b></div>;
          }
        })()}
        <PaginateFamilyList families={families} pagination={pagination} onPageChange={setPage} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    utensilsFilters: getUtensilsFilters(state),
    utensilsLoading: state.searchFamilies.utensils.loading,
    geometriesFilters: getGeometriesFilters(state),
    geometriesLoading: state.searchFamilies.geometries.loading,
    cuttersFilters: getCuttersFilters(state),
    cuttersLoading: state.searchFamilies.cutters.loading,
    currentFilters: state.searchFamilies.filters,
    families: state.searchFamilies.families.items,
    familiesLoading: state.searchFamilies.families.loading,
    pagination: state.searchFamilies.families.pagination,
  };
}

export default connect(mapStateToProps, {
  setFilters,
  resetFilters,
  setPage,
})(SearchPage);
