import React, { Component } from 'react';

import FeedbackListItem from './FeedbackListItem';

export default class FeedbackList extends Component {
  render() {
    const { feedback } = this.props
    const listItems = feedback.map((feedback, i) =>
      <li><FeedbackListItem gameplay={feedback.gameplay}  key={feedback.gameplay._id}/></li>
    );
    return (
      <ul className="gameplays">
        {listItems}
      </ul>
    )
  }
}
