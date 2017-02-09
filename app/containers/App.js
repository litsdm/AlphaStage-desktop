import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Menu from '../components/Menu/Menu';
import Login from '../components/Login';

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
  };

  render() {
    const { isAuthenticated } = this.props;

    return (
      <div className="app">
        {!isAuthenticated &&
          <Login />
        }
        {isAuthenticated &&
          <div id="container">
            <section id="menu">
              <Menu />
            </section>
            <div id="content-container">
              {this.props.children}
            </div>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(App);
