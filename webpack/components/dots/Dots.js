import React, { Component } from 'react';
import {render} from 'react-dom';
import axios from 'axios';
const config = require('./config.json');

// import Button from '@material-ui/core/Button';

class Point extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    // console.log("click");
    this.props.onClick(this.props.id);
  }
  handleMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleMouseOver(e) {
  }

  handleMouseOut(e) {

  }

  render() {
    return (
      <svg version="1.1"
           baseProfile="full"
           xmlns="http://www.w3.org/2000/svg"
           className="Point"
           viewBox="-50 -50 100 100"
           onClick={this.handleClick}
           onMouseOver={this.handleMouseOver}
           onMouseOut={this.handleMouseOut}
           onMouseDown={this.handleMouseDown}
           style={{top: this.props.top*100 + "%", left: this.props.left*100 + "%"}}>
        <circle r="48" />
      </svg>
    );
  }
}



class Field extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      points: []
    }

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.deletePoint = this.deletePoint.bind(this);
    this.fetchPoints = this.fetchPoints.bind(this);
  }

    fetchPoints (e) {
        const fetchPromise = axios.get(`${config.api.invokeUrl}/points`);
        fetchPromise.then(response => {
          this.setState({
            points: response.data
          });
        }).catch((err) => console.error(err));
    }

   handleMouseDown (e) {
    // e.preventDefault();
    e.persist();

    let height = e.target.offsetHeight;
    let width = e.target.offsetWidth;
    let targetY = e.clientY-e.target.offsetTop;
    let relativeY = targetY/height;
    let targetX = e.clientX-e.target.offsetLeft;
    let relativeX = targetX/width;

    if (relativeY >= 1 || relativeX >= 1) {
      relativeY = 0.5;
      relativeX = 0.5;
    }

    const params = {
      "id": (new Date() / 1000).toString(),
      "top": relativeY.toString(),
      "left": relativeX.toString()
    };

    this.setState(oldState => (
        {
          points: [...oldState.points, {top: params.top, left: params.left, id: params.id}]
        }
      )
    );

    const postResponse = axios.post(`${config.api.invokeUrl}/points/${params.id}`, params);
    postResponse.then(() => {
      this.fetchPoints();
    }).catch((err) => console.error(err));
  }

  handleTextClick(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  deletePoint (id) {
    const deleteResponse = axios.delete(`${config.api.invokeUrl}/points/${id}`);
    deleteResponse.then(() => {
      this.setState(oldState => (
        {
          points: oldState.points.filter((point) => point.id !== id)
        }
      ));
      this.fetchPoints();
    })
  }

  componentDidMount() {
    this.fetchPoints();
  }

  componentWillUnmount() {
    // clearInterval(this.timerID);
  }

  render() {
    return (
      <div className="DotsField" onMouseDown={this.handleMouseDown}>
        {
          this.state.points && this.state.points.length > 0 ? (
            this.state.points.map(point => <Point onClick={this.deletePoint} top={point.top} left={point.left} id={point.id} key={point.id} />)
          ) : (
            <div className="Empty" onClick={this.handleTextClick}>♥</div>
          )
        }

      </div>
    );
  }
}

class Op extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="">OPA</div>
    );
  }
}


let dots = document.getElementById('dots-container');
if (dots) {
    render(<Field />, dots);
}
