
export function setNewMaze(that, player) {
  loadMazeId(that, reqGetMazeId(), initForMazeId(player));
}

export function setMazePrint(that, maze_id) {
  loadPrint(that, reqGetMazePrint(maze_id), initForMaze());
}

export function makeMove(that, maze_id, direction) {
  loadMakeMove(that, reqGetMaze(maze_id), initForMakeMove(direction) );
}


// ====================================


function initForMazeId(player) {
  const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');

  const myBody = {
    "maze-width": 20,
    "maze-height": 15,
    "maze-player-name": "Rainbow Dash",
    "difficulty": 0
  }

  const myInit = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(myBody),
    mode: 'cors',
    cache: 'default',
  }
  return myInit;
}

function initForMaze() {
  let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

  const myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
  }
  return myInit
}

function initForMakeMove(direction) {
  const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');

  const myBody = {
    "direction": direction,
  }

  const myInit = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(myBody),
    mode: 'cors',
    cache: 'default',
  }
  return myInit;
}


function reqGetMazeId() {
  const req = new Request('https://ponychallenge.trustpilot.com/pony-challenge/maze');
  return req;
}

function reqGetMaze(maze_id) {
  return new Request('https://ponychallenge.trustpilot.com/pony-challenge/maze/' + maze_id);
}

function reqGetMazePrint(maze_id) {
  return new Request('https://ponychallenge.trustpilot.com/pony-challenge/maze/' + maze_id + "/print");
}

function loadMazeId(that, myRequest, myInit) {
  console.log("REQUEST: loadMazeId");
  fetch(myRequest, myInit)
    .then(res => res.json())
    .then(json => {
      const result = {maze_id: json.maze_id};
      setMazePrint(that, json.maze_id);
      updateStorage(result, that.state.player);
      that.setState(result);
    })
    .catch(err => console.error(err));
}

function loadPrint(that, myRequest, myInit) {
  console.log("REQUEST: loadPrint");
  fetch(myRequest, myInit)
    .then(res => res.text())
    .then(text => {
      const result = {maze_print: text};
      updateStorage(result, that.state.player);
      that.setState(result);
    })
    .catch(err => console.error(err));
}

function loadMakeMove(that, myRequest, myInit) {
  console.log("REQUEST: loadMakeMove");
  fetch(myRequest, myInit)
    .then(res => res.json())
    .then(json => {
      if (["over", "won"].includes(json["state"])) {
        const result = {
          gameState: json["state"],
          gameStateString: json["state-result"],
          hiddenUrl: json["hidden-url"],
        };
        updateStorage(result, that.state.player);
        that.setState(result);
      }
      setMazePrint(that, that.state.maze_id)
    })
    .catch(err => console.error(err));
}


// ====================================


export function updateStorage(params, player) {
  const savedMazeGames = window.localStorage.getItem("savedMazeGames");
  let updatedMazeGames = savedMazeGames;

  // let savedGame;
  if (updatedMazeGames) {
    updatedMazeGames = JSON.parse(updatedMazeGames);
    let playerSavedGame = updatedMazeGames[[player][0]];
    if (playerSavedGame) {
      for (var key in params) {
        playerSavedGame[key] = params[key];
      };
      updatedMazeGames[[player][0]] = playerSavedGame;
    } else {
      updatedMazeGames[[player][0]] = params;
    }
  } else {
    updatedMazeGames = {[player]: params};
  }

  window.localStorage.setItem("savedMazeGames", JSON.stringify(updatedMazeGames));
}
