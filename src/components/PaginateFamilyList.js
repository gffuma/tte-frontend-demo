import React from 'react';
import { range } from 'lodash';

class FamilyListItem extends React.Component {

  render() {
    const { code } = this.props;

    let image;
    if (this.props.image) {
      image = this.props.image.data;
    }

    let img;
    if (image && image.urlImage) {
      img = <img src={image.urlImage} />;
    }

    return (
      <div>
        {code}
        {img}
      </div>
    );
  }
}

class FamilyPaginator extends React.Component {

  render() {
    const {
      total,
      count,
      currentPage,
      perPage,
      totalPages,
      onPageChange
    } = this.props;
    return (
      <p>
        Showig {count ? count : '...'} shitty things of {total} page size {perPage}
        <select value={currentPage} onChange={(e) => onPageChange(e.target.value)}>
          {range(1, totalPages + 1).map(page => (
            <option key={page} value={page}>{page}</option>
          ))}
        </select>
      </p>
    );
  }
}

export default class FamilyList extends React.Component {

  render() {
    const { families, pagination, onPageChange } = this.props;
    return (
      <div>
        {(() => {
          if (pagination.total && pagination.totalPages) {
            return <FamilyPaginator {...pagination} onPageChange={onPageChange} />;
          }
        })()}
        {families.map(family => (
          <FamilyListItem {...family} key={family.id} />
        ))}
      </div>
    );
  }
}
