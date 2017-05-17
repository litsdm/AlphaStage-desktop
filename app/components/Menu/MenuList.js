import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import $ from 'jquery';

class MenuList extends Component {
  props: {
    path: string
  }

  static redeemClick(e) {
    e.preventDefault();
    $('#redeemItemModal').modal();
  }

  render() {
    const { path } = this.props;

    const token = localStorage.getItem('id_token');
    const currentUser = jwtDecode(token);

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
            <p className="menu-link"><a href="#redeem" onClick={this.redeemClick}>Redeem Key</a></p>
          </ul>
        </div>
      </div>
    );
  }
}

export default MenuList;
