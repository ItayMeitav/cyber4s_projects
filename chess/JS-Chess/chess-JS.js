const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const BLACK_PLAYER = 'black';

const PAWN = 'pawn';
const ROOK = 'rook';
const KNIGHT = 'knight';
const BISHOP = 'bishop';
const KING = 'king';
const QUEEN = 'queen';

const CHESS_BOARD_ID = 'chess-board';

const PIECES = [ROOK, KNIGHT, BISHOP, KING, QUEEN, BISHOP, KNIGHT, ROOK];

let table;
let selectedPiece;
let game;



function tryUpdateSelectedPiece(row, col) {
  // Clear all previous possible moves
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      table.rows[i].cells[j].classList.remove('possible-move');
      table.rows[i].cells[j].classList.remove('selected');
    }
  }

  // Show possible moves
  const piece = game.boardData.getPiece(row, col);
  if (piece !== undefined) {
    let possibleMoves = game.getCurrentPlayerTurn(piece);
    for (let possibleMove of possibleMoves) {
      const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
      cell.classList.add('possible-move');
    }
  }

  table.rows[row].cells[col].classList.add('selected');
  selectedPiece = piece;
}

function onCellClick(row, col) {
  // selectedPiece - The current selected piece (selected in previous click)
  // row, col - the currently clicked cell - it may be empty, or have a piece.
  if (selectedPiece !== undefined && game.tryMove(selectedPiece, row, col)) {
    selectedPiece = undefined;
    // Recreate whole board - this is not efficient, but doesn't affect user experience
    createChessBoard(game.boardData);
  } else {
    tryUpdateSelectedPiece(row, col);
  }
}

//matching icons to classes function
function addImage(cell, player, name) {
  const image = document.createElement('img');
  // image.src = 'images/' + player + '/' + name + '.png';
  image.src = `images/${player}/${name}.png`;
  image.draggable = false;
  cell.appendChild(image);
}

function createChessBoard(boardData) {
  table = document.getElementById(CHESS_BOARD_ID);
  if (table !== null) {
    table.remove();
  }

  // Create empty chess board HTML: 
  const cols = { 1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "F", 7: "G", 8: "H" }
  table = document.createElement('table');
  table.id = CHESS_BOARD_ID;
  table.className = "board";
  document.body.appendChild(table);
  for (let row = 0; row < BOARD_SIZE; row++) {
    // let rowElement = table.insertRow();
    let rowElement = document.createElement('tr');
    table.appendChild(rowElement);
    rowElement.dataset.line = row + 1;
    for (let col = 0; col < BOARD_SIZE; col++) {
      //   let cell = rowElement.insertCell();
      let cell = document.createElement('td');
      cell.dataset.column = cols[col + 1];
      cell.dataset.line = row;
      rowElement.appendChild(cell);
      cell.id = "cell-" + row.toString() + "_" + col.toString();
      if ((row + col) % 2 === 0) {
        cell.className = 'light-cell';
      } else {
        cell.className = 'dark-cell';
      }
      cell.addEventListener('click', () => onCellClick(row, col));
    }
  }


  // Add pieces images to board
  for (let piece of boardData.pieces) {
    const cell = table.rows[piece.row].cells[piece.col];
    addImage(cell, piece.player, piece.type);
  }

  if (game.winner !== undefined) {
    const winnerPopup = document.createElement('div');
    const toStartAgain = document.createElement('div');
    const winner = game.winner.charAt(0).toUpperCase() + game.winner.slice(1);
    winnerPopup.textContent = winner + ' player wins!';
    toStartAgain.textContent = 'Click here to start a new one';
    winnerPopup.classList.add('winner-dialog');
    toStartAgain.classList.add('start-again');
    // table.classList.add('disabled');
    table.appendChild(winnerPopup);
    table.appendChild(toStartAgain);
    toStartAgain.addEventListener('click', () => initGame());
  }
}

function initGame() {
  game = new Game(WHITE_PLAYER);
  createChessBoard(game.boardData);
}

window.addEventListener('load', initGame);
