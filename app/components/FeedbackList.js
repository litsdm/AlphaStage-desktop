import React, { Component } from 'react';

import FeedbackListItem from './FeedbackListItem';

export default class FeedbackList extends Component {
  render() {
    const { gameplays } = this.props
    const listItems = gameplays.map((gameplay, i) =>
      <li><GameplayListItem gameplay={gameplay}  key={gameplay._id}/></li>
    );
    return (
      <ul className="gameplays">
        {listItems}
      </ul>
    )
  }
}
