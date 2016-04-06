import React from 'react';

class FamilyListItem extends React.Component {

  render() {
    const { code } = this.props;

    let image;
    if (this.props.image) {
      image = this.props.image.data;
    }

    let img;
    if (image && image.url_image) {
      img = <img src={image.url_image} />;
    }

    return (
      <div>
        {code}
        {img}
      </div>
    );
  }
}

export default class FamilyList extends React.Component {

  render() {
    const { families } = this.props;
    return (
      <div>
        {families.map(family => (
          <FamilyListItem {...family} key={family.id} />
        ))}
      </div>
    );
  }
}
