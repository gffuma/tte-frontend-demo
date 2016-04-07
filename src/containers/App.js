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
      geometriesFilters,
      cuttersFilters
    } = this.props;

    return (
      <div>
        <button type="button"
          onClick={() => this.props.resetFilters()}
          >Reset Filters!</button>
        <br />
        <br />

        <Filter
          filters={utensilsFilters}
          onFilterChange={utensil => this.props.setFilters({ utensil })}
          currentFilter={currentFilters.utensil} />
        <Filter
          filters={geometriesFilters}
          onFilterChange={geometry => this.props.setFilters({ geometry })}
          currentFilter={currentFilters.geometry} />
        <Filter
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
    geometriesFilters: getGeometriesFilters(state),
    cuttersFilters: getCuttersFilters(state),
    currentFilters: state.searchFamilies.filters,
    families: state.searchFamilies.families.items,
  };
}

export default connect(mapStateToProps, {
  setFilters,
  resetFilters
})(App);
