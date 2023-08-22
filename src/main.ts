import './style.css';
//--------------
let player = true;
let win = '';
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
}

function renderMap() {
  const gameField = document.querySelector('.field');
  if (gameField !== null) {
    gameField.innerHTML = '';
  }
  for (let x = 0; x < gameSize; x++) {
    for (let y = 0; y < gameSize; y++) {
      const tile = document.createElement('div');
      tile.className = 'tile';
      gameField?.appendChild(tile);
      tile.onclick = () => {
        tileClick(x);
      };
      if (!gameMap[x][y].isEmpty) {
        if (gameMap[x][y].player) {
          tile.innerText = '🔴';
        } else if (!gameMap[x][y].player) {
          tile.innerText = '🔵';
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
  if (y !== -1) {
    gameMap[x][y].player = player;
    gameMap[x][y].isEmpty = false;
    renderMap();
  }
  checkWin();
  changePlayer();
}

function changePlayer() {
  player = !player;
  console.log('changed');
}
//---------------------------------------------------------------------------------------------------------------------
function checkWin() {
  checkHorizontal();
  checkVertical();
  checkDiagonal();
  if (win !== '') {
    showWinner();
    game();
  }
}
function showWinner() {
  console.log('player:', win, 'won');
  const winText = document.querySelector('.winText') as HTMLDialogElement;
  winText.showModal();
}

function checkHorizontal() {
  let BChips = 0;
  let RChips = 0;
  for (let y = gameSize - 1; y >= 0; y--) {
    BChips = 0;
    RChips = 0;
    for (let i = gameSize - 1; i >= 0; i--) {
      if (gameMap[i][y]?.player && !gameMap[i][y]?.isEmpty) {
        RChips++;
        BChips = 0;
        checkChips(RChips);
      }
      if (!gameMap[i][y]?.player && !gameMap[i][y]?.isEmpty) {
        BChips++;
        RChips = 0;
        checkChips(BChips);
      }
      if (gameMap[i][y]?.isEmpty) {
        BChips = 0;
        RChips = 0;
      }
    }
  }
}

function checkVertical() {
  let BChips = 0;
  let RChips = 0;
  for (let x = gameSize - 1; x >= 0; x--) {
    BChips = 0;
    RChips = 0;
    for (let i = gameSize - 1; i >= 0; i--) {
      if (gameMap[x][i]?.player && !gameMap[x][i]?.isEmpty) {
        RChips++;
        BChips = 0;
        checkChips(RChips);
      }
      if (!gameMap[x][i]?.player && !gameMap[x][i]?.isEmpty) {
        BChips++;
        RChips = 0;
        checkChips(BChips);
      }
      if (gameMap[x][i]?.isEmpty) {
        BChips = 0;
        RChips = 0;
      }
    }
  }
}

function checkDiagonal() {
  for (let i = 2; i >= 0; i--) {
    for (let y = gameSize - 1; y > 0; y--) {
      for (let x = gameSize - 1; x > 0; x--) {
        if (
          gameMap[y][x].player === player &&
          !gameMap[y][x].isEmpty &&
          gameMap[y - 1]?.[x - 1]?.player === player &&
          !gameMap[y - 1]?.[x - 1]?.isEmpty &&
          gameMap[y - 2]?.[x - 2]?.player === player &&
          !gameMap[y - 2]?.[x - 2]?.isEmpty &&
          gameMap[y - 3]?.[x - 3]?.player === player &&
          !gameMap[y - 3]?.[x - 3]?.isEmpty
        ) {
          showWinner();
        }
        if (
          gameMap[y][x].player === player &&
          !gameMap[y][x].isEmpty &&
          gameMap[y - 1]?.[x + 1]?.player === player &&
          !gameMap[y - 1]?.[x + 1]?.isEmpty &&
          gameMap[y - 2]?.[x + 2]?.player === player &&
          !gameMap[y - 2]?.[x + 2]?.isEmpty &&
          gameMap[y - 3]?.[x + 3]?.player === player &&
          !gameMap[y - 3]?.[x + 3]?.isEmpty
        ) {
          showWinner();
        }
      }
    }
  }
}

function checkChips(c: number) {
  if (c >= 4) {
    if (player) {
      win = '1';
    }
    if (!player) {
      win = '2';
    }
  }
}
