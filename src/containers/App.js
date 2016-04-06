import React from 'react'
import Filter from '../components/Filter';
import FamilyList from '../components/FamilyList';
import { connect } from 'react-redux';
import {
  setSearchFamiliesFilters,
  resetSearchFamiliesFilters
} from '../actions';

function mapToFilters(items) {
  return items.map(item => {
    return { value: item.id, name: item.description };
  });
}

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { currentFilters, families, cutters, geometries } = this.props;

    return (
      <div>
        <button type="button"
          onClick={() => this.props.resetSearchFamiliesFilters()}
          >Reset Filters!</button>
        <br />
        <br />

        <Filter
          filters={mapToFilters(cutters)}
          onFilterChange={cutter => this.props.setSearchFamiliesFilters({ cutter })}
          currentFilter={currentFilters.cutter} />
        <Filter
          filters={mapToFilters(geometries)}
          onFilterChange={geometry => this.props.setSearchFamiliesFilters({ geometry })}
          currentFilter={currentFilters.geometry} />

        <br />
        <FamilyList families={families} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cutters: state.cutters.items,
    geometries: state.geometries.items,
    currentFilters: state.searchFamilies.filters,
    families: state.searchFamilies.families.items,
  };
}

export default connect(mapStateToProps, {
  setSearchFamiliesFilters,
  resetSearchFamiliesFilters,
})(App);
