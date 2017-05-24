// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

import type { Game } from '../../utils/globalTypes';

type Props = {
  selectedGameIndex: number,
  games: Array<Game>,
  switchGame: (index: number) => void
};

export default class DashboardHeader extends Component {

  handleGameSwitch: (e: SyntheticMouseEvent) => void;

  static handleDropdownClick(e: SyntheticMouseEvent) {
    e.preventDefault();

    const myDropdown = document.getElementById('myDropdown');
    if (myDropdown) {
      myDropdown.classList.toggle('show');
    }
  }

  constructor(props: Props) {
    super(props);

    this.handleGameSwitch = this.handleGameSwitch.bind(this);
  }

  handleGameSwitch(e: SyntheticMouseEvent) {
    e.preventDefault();
    const target = (e.target: any);
    const dropdown = document.getElementById('myDropdown');
    if (dropdown) {
      dropdown.classList.remove('show');
    }

    if (target.classList.contains('active')) {
      return;
    }

    $(target).siblings().removeClass('active'); // Refactor to vanilla JS
    target.classList.toggle('active');

    const { switchGame } = this.props;
    const index = target.id;

    switchGame(index);
  }

  render() {
    const { selectedGameIndex, games } = this.props;

    let gameElements;
    if (games.length > 0) {
      gameElements = games.map((game, i) => {
        if (i === 0) {
          return <a href="#switch" onClick={this.handleGameSwitch} id={i} key={game._id} className="active dg-link"><i className="fa fa-check" />{game.name}</a>;
        }

        return <a href="#switch" onClick={this.handleGameSwitch} id={i} key={game._id} className="dg-link"><i className="fa fa-check" />{game.name}</a>;
      });
    }

    return (
      <div className="dashboard-header">
        <span className="dh-content-left">
          <div className="dropdown">
            <a href="#drop" id="drop-trigger" className="drop-btn" onClick={DashboardHeader.handleDropdownClick}>
              {games.length > 0 &&
                <span>
                  <img alt="" src={games[selectedGameIndex].img} className="group-img small" />
                  {games[selectedGameIndex].name}
                </span>
              }
              {games.length === 0 &&
                <span>Your Games</span>
              }
              <i className="fa fa-chevron-down" />
            </a>
            <div id="myDropdown" className="dropdown-content">
              <span className="dropdown-header">Switch game</span>
              {gameElements &&
                gameElements
              }
              <Link to="/games/new"><i className="fa fa-plus" /> Create Game</Link>
            </div>
          </div>
          {games.length > 0 &&
            <Link to={`/games/new?id=${games[selectedGameIndex]._id}`} className="edit-btn"><i className="fa fa-pencil" /></Link>
          }
        </span>
        <span className="dh-content-right" />
      </div>
    );
  }
}
