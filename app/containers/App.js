import React, { Component, PropTypes } from 'react';

import Menu from '../components/Menu/Menu';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div id="container">
        <section id="menu">
          <Menu />
        </section>
        <div id="content-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
