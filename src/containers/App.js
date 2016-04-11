import React from 'react';
import { IndexLink, Link } from 'react-router';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>TTE</h1>
        <p>
          <Link to="/who" activeStyle={{ color: 'red' }}>Who We Are?</Link>
          <span> | </span>
          <IndexLink to="/" activeStyle={{ color: 'red' }}>Search</IndexLink>
        </p>
        <hr />
        <div>{this.props.children}</div>
      </div>
    );
  }
}
