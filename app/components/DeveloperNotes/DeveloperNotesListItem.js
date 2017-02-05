import React, { Component } from 'react';

export default class DeveloperNotesListItem extends Component {
  render() {
    return (
      <div className="note-li">
        <div className="note-header">
          <img src="http://www.sheffield.com/wp-content/uploads/2013/06/placeholder.png" className="note-pic"/>
        </div>
        <div className="note-content">
          <h3>What we went through last week.</h3>
          <p className="note-preview">
            Cras accumsan vel purus sed consectetur. Suspendisse congue sapien tempor odio eleifend, quis sagittis leo tristique. Morbi ullamcorper sem a dui tincidunt, eleifend scelerisque dui interdum. Sed id velit ut sapien luctus laoreet quis porttitor lacus. Sed interdum lorem in tellus euismod, a euismod magna maximus. Vivamus mattis ipsum sagittis ligula mollis tincidunt. Sed imperdiet lacus ut turpis bibendum, non rhoncus dui cursus. Nunc pulvinar urna a eleifend tempus. Phasellus tincidunt vitae lorem posuere viverra. Praesent id sapien sed libero finibus ultricies quis non diam. Duis luctus egestas lectus auctor blandit. Proin ultrices, velit et lobortis iaculis, augue purus dignissim libero, vel dignissim odio neque eget dui. Ut commodo lobortis elit nec sollicitudin. Donec in purus sit amet dolor vehicula feugiat in eu eros. Phasellus rutrum sodales metus.
          </p>
        </div>
      </div>
    )
  }
}
