import React from 'react'

class FilterElement extends React.Component {
  render() {
    const { value, name, selected, onChange } = this.props;
    return (
      <span className="filter-element">
        {name}
        <input
          type="radio"
          value={value}
          onChange={() => onChange(value)}
          checked={selected}
        />
      </span>
    );
  }
}

export default class Filter extends React.Component {

  render() {
    const { filters, currentFilter, onFilterChange } = this.props;

    return (
      <div>
        {filters.map(filter => (
          <FilterElement
            key={filter.value}
            onChange={onFilterChange}
            selected={filter.value === currentFilter}
            {...filter}
          />
        ))}
      </div>
    );
  }
}
