import "./style.css";
//--------------
let player = true;
let win = "";
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
    if (gameMap[x][i].isEmpty) {
      y = i;
      break;
    }
  }
  changePlayer();
  if (y !== -1) {
    gameMap[x][y].player = player;
    gameMap[x][y].isEmpty = false;
    renderMap();
  }
  checkWin();
}

function changePlayer() {
  player = !player;
}
//---------------------------------------------------------------------------------------------------------------------
function checkWin() {
  checkHorizontal();
  checkVertical();
  checkDiagonalLeftToRight();
  checkDiagonalRightToLeft();
  if (win !== "") {
    console.log("player:", win, "won");
  }
}

function checkVertical() {
  let chips = 0;
  for (let k = 0; k <= gameSize - 4; k++) {
    //<check if red has on the left side from up to down to the first 4
    chips = 0;
    for (let y = gameSize - 1; y >= 0; y--) {
      chips = 0;
      for (let i = gameSize - 1; i >= 0; i--) {
        if (gameMap[i - k]) {
          if (gameMap[i - k][y]?.player === player && !gameMap[i][y]?.isEmpty) {
            chips++;
            console.log("chips", chips);
            checkChips(chips);
          } else {
            break;
          }
        }
      }
    }
    //>
  }
}

function checkHorizontal() {}

function checkDiagonalLeftToRight() {}

function checkDiagonalRightToLeft() {}

function checkChips(c: number) {
  if (c >= 4) {
    if (player) {
      win = "1";
    }
    if (!player) {
      win = "2";
    }
  }
}
