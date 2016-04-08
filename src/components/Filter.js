import React from 'react'
import style from '../style.scss';
import classNames from 'classnames';

class FilterElement extends React.Component {
  render() {
    const { value, name, selected, onChange } = this.props;
    return (
      <div className={style.filterElement}>
        <input
          type="radio"
          value={value}
          onChange={() => onChange(value)}
          checked={selected}
        />
        <span className={style.filterElementName}>{name}</span>
      </div>
    );
  }
}

export default class Filter extends React.Component {

  render() {
    const { filterName, filters, currentFilter, onFilterChange } = this.props;
    const loading = false;

    return (
      <div className={classNames(style.filter, {[style.loading]: loading})}>
        <div className={style.filterName}>{filterName}</div>
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
