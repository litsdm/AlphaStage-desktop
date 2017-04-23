import React, { Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

export default class DashboardHeader extends Component {
  constructor(props) {
    super(props);

    this.handleGameSwitch = this.handleGameSwitch.bind(this);
  }

  handleDropdownClick(e) {
    e.preventDefault();

    const myDropdown = document.getElementById('myDropdown');
    myDropdown.classList.toggle('show');
  }

  handleGameSwitch(e) {
    e.preventDefault();
    const target = e.target;

    if (target.classList.contains('active')) {
      return
    }

    $(target).siblings().removeClass('active'); // Refactor to vanilla JS
    target.classList.toggle('active');

    const { switchGame } = this.props;
    const index = target.id;

    switchGame(index);
  }

  render() {
    const { currentUser, selectedGameIndex, games } = this.props;

    let gameElements;
    if (games.length > 0) {
      gameElements = games.map((game, i) => {
        if (i == 0) {
          return <a href="#" onClick={this.handleGameSwitch} id={i} key={game._id} className="active dg-link"><i className="fa fa-check"></i>{game.name}</a>
        }

        return <a href="#" onClick={this.handleGameSwitch} id={i} key={game._id} className="dg-link"><i className="fa fa-check"></i>{game.name}</a>
      })
    }

    return (
      <div className="dashboard-header">
        <span className="dh-content-left">
          <div className="dropdown">
            <a href="#" className="drop-btn" onClick={this.handleDropdownClick}>

              {games.length > 0 &&
                <span>
                  <img src={games[selectedGameIndex].img} className="group-img small"/>
                  {games[selectedGameIndex].name}
                </span>
              }
              {!games &&
                <span>Your Games</span>
              }
              <i className="fa fa-chevron-down"></i>
            </a>
            <div id="myDropdown" className="dropdown-content">
              <span className="dropdown-header">Switch game</span>
              {gameElements &&
                gameElements
              }
              <Link to="/games/new"><i className="fa fa-plus"></i> Create Game</Link>
            </div>
          </div>
          {games.length > 0 &&
            <Link to={`/games/new?id=${games[selectedGameIndex]._id}`} className="edit-btn"><i className="fa fa-pencil"></i></Link>
          }
        </span>
        <span className="dh-content-right">
        </span>
      </div>
    )
  }
}
