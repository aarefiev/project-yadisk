// @flow

import React from 'react';

export default class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-inverse bg-secondary">
        <button className="btn btn-primary" type="submit">Upload</button>
        <button className="btn btn-light" type="submit">Create</button>
        <button className="btn btn-success" type="submit">Download</button>
        <button className="btn btn-danger" type="submit">Delete</button>
      </nav>
    );
  }
};
