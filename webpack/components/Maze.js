import React, { Component } from 'react';
import {render} from 'react-dom';

class Maze extends Component {
  render() {
    return (
      <div>Hey, Rall!!</div>
    )
  }
}

let maze = document.getElementById('maze-container');
if (maze) {
    render(<Maze />, maze);
}

export default Maze;
