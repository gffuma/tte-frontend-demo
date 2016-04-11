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
  resetFilters
} from '../actions/search-families';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      families,
      currentFilters,
      utensilsFilters,
      utensilsLoading,
      geometriesFilters,
      geometriesLoading,
      cuttersFilters,
      cuttersLoading
    } = this.props;

    return (
      <div>

        <button
          type="button"
          onClick={() => this.props.resetFilters()}>Reset Filters!</button>
        <br />
        <br />

        {(() => {
          if (this.props.utensilsLoading) {
            return <div>Loading...</div>;
          }
        })()}
        <Filter
          filterName="Utensile"
          filters={utensilsFilters}
          onFilterChange={utensil => this.props.setFilters({ utensil })}
          currentFilter={currentFilters.utensil} />

        {(() => {
          if (this.props.geometriesLoading) {
            return <div>Loading...</div>;
          }
        })()}
        <Filter
          filterName="Geometria"
          filters={geometriesFilters}
          onFilterChange={geometry => this.props.setFilters({ geometry })}
          currentFilter={currentFilters.geometry} />

        {(() => {
          if (this.props.cuttersLoading) {
            return <div>Loading...</div>;
          }
        })()}
        <Filter
          filterName="Tagliente"
          filters={cuttersFilters}
          onFilterChange={cutter => this.props.setFilters({ cutter })}
          currentFilter={currentFilters.cutter} />

        <br />

        <PaginateFamilyList families={families} />
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
  };
}

export default connect(mapStateToProps, {
  setFilters,
  resetFilters
})(App);
