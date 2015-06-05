
import React from 'react';

export default class Tile extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;

    return (
      <div className="tile" style={props.style}>
        <div className="tile__name">{props.name}</div>
        <p className="tile__desc">{props.desc}</p>
      </div>
    )
  }
}
