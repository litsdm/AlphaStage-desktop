import React, { Component } from 'react';

import DeveloperNotesListItem from './DeveloperNotesListItem';

export default class DeveloperNotesList extends Component {
  render() {
    return (
      <div className="notes-list details-card">
        <h2>Developer Notes</h2>
        <p>The developer has not posted any notes. Follow the game if you want to get notified when he does.</p>
        {/*<DeveloperNotesListItem />*/}
      </div>
    )
  }
}
