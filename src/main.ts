import "./style.css";
//--------------
let player = true;
let win = false;
let gameSize = 7;
const gameMap: GameMap = [];
type GameMap = {
  isEmpty: boolean;
  isPlayerOne: boolean;
  isPlayerTwo: boolean;
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
        isPlayerOne: false,
        isPlayerTwo: false,
      };
      rowY.push(tile);
    }
    gameMap.push(rowY);
  }
}

function game() {
  render();
}

function render() {
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
        tileClick(x, y);
      };
      if (gameMap[x][y].isEmpty) {
        if (gameMap[x][y].isPlayerOne) {
          tile.innerText = "✗";
        } else if (gameMap[x][y].isPlayerTwo) {
          tile.innerText = "◯";
        }
      }
    }
  }
}

function tileClick(x, y) {
  //nothing yet
}

function changePlayer() {
  player = !player;
}
