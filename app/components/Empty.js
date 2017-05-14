import React, { Component } from 'react';

export default class Empty extends Component {
  props: {
    title: string,
    description: string
  }

  render() {
    const { title, description } = this.props;
    return (
      <div className="empty-component">
        <h3>{title}</h3>
        {description}
      </div>
    );
  }
}
