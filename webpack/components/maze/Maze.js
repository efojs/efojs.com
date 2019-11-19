import React, { Component } from 'react';
import {render} from 'react-dom';
import * as api from './api';

const ponies = [
  { name: "Twilight Sparkle", },
  { name: "Applejack", },
  { name: "Fluttershy", },
  { name: "Rarity", },
  { name: "Pinkie Pie", },
  { name: "Rainbow Dash", },
  { name: "Spike", }
]

const initialState = {
  player: null,
  playerId: 0,
  maze_id: null,
  maze_print: null,
  gameState: null,
  gameStateString: null,
  hiddenUrl: null,
  wins: 0,
  losses: 0,
}

// ====================================


class PlayerSelect extends Component {
  constructor(props) {
   super(props);
   this.state = {
     value: this.props.player,
     game: this.props.game,
   };
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    selectPlayer(this.props.game, event.target.value)
  }

  render() {
    const options = ponies.map(ponie => {
      return (
        <option key={ponie["name"]} value={ponie["name"]}>{ponie["name"]}</option>
      )
    });

    return (
      <select className="PlayerSelect" onChange={(e) => this.handleChange(e)}>
        {options}
      </select>
    )
  }
}

class Title extends Component {
  render() {
    let { player, wins, losses } = this.props.game.state;
    return (
      <div className="Title">
          <span>Lead <PlayerSelect player={player} game={this.props.game} /> to <span className='Exit noAnimation'>Exit</span> to save from <span className='Dog'>Domokun</span></span>
          <span className="Score">Wins: {wins}, losses: {losses}</span>
      </div>
    )
  }
}

class Maze extends Component {
  render() {
    const mazeGame = this.props.state;
    let mazePrint = mazeGame.maze_print;
    if (mazePrint) {
      mazePrint = makeString(mazePrint);
    }
    let image;
    if (this.props.state.gameState) {
      image = <img alt={this.props.state.gameStateString} className="finalImage" src={"https://ponychallenge.trustpilot.com" + this.props.state.hiddenUrl} />;
    }
    return (
      <div>
        <div>
          <div className={"Maze " + this.props.state.gameState} dangerouslySetInnerHTML={{__html: mazePrint }}></div>
          {image}
        </div>
      </div>
    )
  }
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleKeyDown(e) {
    pressKey(e, this);
  }

  render() {
    let { player, maze_id, maze_print, gameState } = this.state;
    if (!maze_id || !maze_print) {
      return (
        <div className="mazeApp">
          <Title game={this} />
          <p className="loading">
            Loading maze for {player}...
          </p>
        </div>
      );
    } else {
      if (gameState) {
        return (
          <div className="mazeApp" ref={this.mainContainer}>
            <Title game={this} />
            <Maze state={this.state} />

            <div className="Buttons">
              <button onClick={() => initiateGame(this)}>Start new game</button>
            </div>
          </div>
        );
      } else {
        return (
          <div className="mazeApp" tabIndex="0" onKeyDownCapture={(e) => this.handleKeyDown(e)} >
            <Title game={this} />
            <div className="Buttons">
              <button onClick={() => makeMove(this, "west")}>Left</button>&nbsp;
              <button onClick={() => makeMove(this, "north")}>Up</button>&nbsp;
              <button onClick={() => makeMove(this, "south")}>Down</button>&nbsp;
              <button onClick={() => makeMove(this, "east")}>Right</button>
              &nbsp;|&nbsp;
              <button>Use keyboard</button>
            </div>
            <Maze state={this.state} />
          </div>
        );
      }
    }
  }

  componentDidMount() {
    initiateGame(this);
  }
}


// ===================

function initiateGame(that, player) {
  // console.log("Initiating game:");

  // set player
  let newPlayer = player;
  if (!newPlayer) {
      if (that.state.gameState) {
        // game finished — set current player
        newPlayer = that.state.player;
      } else {
        newPlayer = ponies[0]["name"];
      }
  }

  // load saved games
  const savedMazeGames = window.localStorage.getItem("savedMazeGames");
  let savedGame;
  if (savedMazeGames) {
      savedGame = JSON.parse(savedMazeGames)[[newPlayer][0]];
  }

  // set game
  if (savedGame && !savedGame["gameState"]) {

    // set saved not finished game
    that.setState(savedGame);

  } else {

    // prepare game state
    // ead initial
    let newGameInit = initialState;

    // add score from finished game
    if (savedGame && savedGame["gameState"]) {
      if (savedGame.gameState === "won") {
        newGameInit["wins"] = savedGame["wins"] + 1;
      } else {
        newGameInit["losses"] = savedGame["losses"] + 1;
      }
    }

    // add player
    newGameInit["player"] = newPlayer;
    newGameInit["playerId"] = findPlayer(newPlayer);

    // update or create storage
    api.updateStorage(newGameInit, newPlayer);

    // update state with new player data
    that.setState(newGameInit);

    // set new maze
    api.setNewMaze(that, newPlayer);
  }
}

function makeMove(that, direction) {
  api.makeMove(that, that.state.maze_id, direction);
}

function findPlayer(player) {
  for (var i=0; i < ponies.length; i++) {
      if (ponies[i].value === player) {
          return i;
      }
  }
}

function selectPlayer(that, newPlayer) {
  // save game
  const savedMazeGames = window.localStorage.getItem("savedMazeGames");
  let updatedMazeGames = savedMazeGames;

  if (updatedMazeGames) {
    updatedMazeGames = JSON.parse(updatedMazeGames);
  }

  if (updatedMazeGames) {
    updatedMazeGames[[that.state.player][0]] = that.state;
  } else {
    updatedMazeGames = {[that.state.player]: that.state};
  }
  window.localStorage.setItem("savedMazeGames", JSON.stringify(updatedMazeGames));

  // load game
  initiateGame(that, newPlayer);
}


function makeString(string) {
  var str = string
    // .replace(/\|/g,"│")
    // .replace(/\+/g,"•")//┼
    // .replace(/-/g,"─")
    .replace(/(?:\r\n|\r|\n)/g, '<br>')
    .replace(/\s/g,"&nbsp;")
    .replace(/P/g, "<span class='Player'>&nbsp;</span>")
    .replace(/E/g, "<span class='Exit'>&nbsp;</span>")
    .replace(/D/g, "<span class='Dog'>&nbsp;</span>");
  return str
}


function pressKey(evt, that) {
    evt = evt || window.event;
    switch (evt.keyCode) {
      case 65: //a
      case 37: //left
        // console.log("left");
        makeMove(that, "west")
         evt.stopPropagation();
         evt.preventDefault();
        break;
      case 87: //w
      case 38: //up
        // console.log("up");
        makeMove(that, "north");
        evt.stopPropagation();
        evt.preventDefault();
        break;
      case 68: //d
      case 39: //right
        // console.log("right");
        makeMove(that, "east");
        evt.stopPropagation();
        evt.preventDefault();
        break;
      case 83: //s
      case 40: //down
        // console.log("down");
        makeMove(that, "south");
        evt.stopPropagation();
        evt.preventDefault();
        break;
      default:
        // console.log("no");
    }
};

let maze = document.getElementById('maze-container');
if (maze) {
    render(<App />, maze);
}
