import "./style.css";
//--------------
let player = true;
let win = false;
let gameSize = 7;
const gameMap: GameMap = [];
type GameMap = {
  isEmpty: boolean;
  player: boolean;
}[][];
//---------------
createMap();
game();

//---------------

function createMap() {
  for (let x = 0; x < gameSize; x++) {
    const rowY = [];
    for (let y = 0; y < gameSize; y++) {
      const tile = {
        isEmpty: true,
        player: false,
      };
      rowY.push(tile);
    }
    gameMap.push(rowY);
  }
}

function game() {
  renderMap();
  changePlayer();
}

function renderMap() {
  const gameField = document.querySelector(".field");
  if (gameField !== null) {
    gameField.innerHTML = "";
  }
  for (let x = 0; x < gameSize; x++) {
    for (let y = 0; y < gameSize; y++) {
      const tile = document.createElement("div");
      tile.className = "tile";
      gameField?.appendChild(tile);
      tile.onclick = () => {
        tileClick(x);
      };
      if (!gameMap[x][y].isEmpty) {
        if (gameMap[x][y].player) {
          tile.innerText = "🔴";
        } else {
          tile.innerText = "🔵";
        }
      }
    }
  }
}

function tileClick(x: number) {
  let y = -1;
  for (let i = gameSize - 1; i >= 0; i--) {
    console.log("let", i);
    if (gameMap[x][i].isEmpty) {
      y = i;
      console.log("Y.", y);
      break;
    }
  }

  changePlayer();

  if (y !== -1) {
    console.log("if y");
    gameMap[x][y].player = player;
    gameMap[x][y].isEmpty = false;
    renderMap();
  }
}

function changePlayer() {
  player = !player;
}
