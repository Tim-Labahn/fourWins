import "./style.css";
//--------------
let player = "R";
let win = false;
let gameSize = 7;
const gameMap: GameMap = [];
type GameMap = {
  isEmpty: boolean;
  player: string;
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
        player: "",
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
        if (gameMap[x][y].player === "R") {
          tile.innerText = "🔴";
        } else if (gameMap[x][y].player === "B") {
          tile.innerText = "🔵";
        }
      }
    }
  }
}

function tileClick(x: number) {
  if (gameMap[x][1]?.player === "") {
    for (let i = 1; i < gameSize; i++) {
      if (gameMap[x][i]?.player === "") {
        console.log("ahh");
      } else {
        gameMap[x][i].player = player;
        break;
      }
      changePlayer();
    }
    renderMap();
  } else {
    gameMap[x][gameSize - 1].player = player;
  }
}

function changePlayer() {
  if (player === "R") {
    player = "B";
  } else {
    player = "R";
  }
}
