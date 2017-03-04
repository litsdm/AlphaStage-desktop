import React, { Component } from 'react';
import { Link } from 'react-router';
import jwtDecode from 'jwt-decode';

export default class MenuList extends Component {
  render() {
    const { path } = this.props;

    let token = localStorage.getItem('id_token');
    let currentUser = jwtDecode(token);

    return (
      <div className="menu-list container">
        <div className="menu-category">
          <span className="menu-title">Main</span>
          <ul className="menu-ul">
            {currentUser.isDeveloper && path === '/dashboard' &&
              <p className="menu-link active"><Link to="/dashboard">Dashboard</Link></p>
            }
            {currentUser.isDeveloper && path !== '/dashboard' &&
              <p className="menu-link"><Link to="/dashboard">Dashboard</Link></p>
            }
            {path === '/' &&
              <p className="menu-link active"><Link to="/">Browse</Link></p>
            }
            {path !== '/' &&
              <p className="menu-link"><Link to="/">Browse</Link></p>
            }
          </ul>
        </div>
        <div className="menu-category">
          <span className="menu-title">Library</span>
          <ul className="menu-ul">
            {path === '/games/library' &&
              <p className="menu-link active"><Link to="/games/library">Your library</Link></p>
            }
            {path !== '/games/library' &&
              <p className="menu-link"><Link to="/games/library">Your library</Link></p>
            }
          </ul>
        </div>
      </div>
    );
  }
}
