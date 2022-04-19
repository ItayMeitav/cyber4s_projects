const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const BLACK_PLAYER = 'black';

const PAWN = 'pawn';
const ROOK = 'rook';
const KNIGHT = 'knight';
const BISHOP = 'bishop';
const KING = 'king';
const QUEEN = 'queen';

let selectedCell;
let pieces = [];
let table;

class Piece {                                                //creating classes to pieces
    constructor (row, col, type, player) {
        this.row = row;
        this.col = col;
        this.type= type;
        this.player = player
    }


getPossibleMoves() {
  let relativeMoves;
  if (this.type === PAWN) {
    relativeMoves = this.getPawnRelativeMoves();
  } else if (this.type === ROOK) {
    relativeMoves = this.getRookRelativeMoves();
  } else if (this.type === KNIGHT) {
    // TODO: Get moves
  } else if (this.type === BISHOP) {
    // TODO: Get moves
  } else if (this.type === KING) {
    // TODO: Get moves
  } else if (this.type === QUEEN) {
    // TODO: Get moves
  } else {
    console.log("Unknown type", type)
  }
  console.log('relativeMoves', relativeMoves);

  let absoluteMoves = [];
  for (let relativeMove of relativeMoves) {
    const absoluteRow = this.row + relativeMove[0];
    const absoluteCol = this.col + relativeMove[1];
    absoluteMoves.push([absoluteRow, absoluteCol]);
  }
  console.log('absoluteMoves', absoluteMoves);

  let filteredMoves = [];
  for (let absoluteMove of absoluteMoves) {
    const absoluteRow = absoluteMove[0];
    const absoluteCol = absoluteMove[1];
    if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
      filteredMoves.push(absoluteMove);
    }
  }
  console.log('filteredMoves', filteredMoves);
  return filteredMoves;
}

getPawnRelativeMoves() {
  // TODO: Give different answer to black player
  return [[1, 0]];
}

getRookRelativeMoves() {
  let result = [];
  for (let i = 1; i < BOARD_SIZE; i++) {
    result.push([i, 0]);
    result.push([-i, 0]);
    result.push([0, i]);
    result.push([0, -i]);
  }
  return result;
}
}

// class BoardData {
//   constructor(pieces) {
//     this.pieces = pieces;
//   }

//   // Returns piece in row, col, or undefined if not exists.
//   getPiece(row, col) {

//   }
// }



function getInitialBoard() {
let result = [];                                            //creating start-positions by loops
for (let i = 0; i < 8; i++) {
    if (i==0 || i==7) {
        result.push(new Piece(0, i, ROOK, WHITE_PLAYER));
    } else if (i==1 || i==6) {
    result.push(new Piece(0, i, KNIGHT, WHITE_PLAYER));
    } else if (i==2 || i==5) {
    result.push(new Piece(0, i, BISHOP, WHITE_PLAYER));
}
}
result.push(new Piece (0, 3, QUEEN, WHITE_PLAYER))
result.push(new Piece (0, 4, KING, WHITE_PLAYER))

for (let i = 0; i < 8; i++) {
   result.push(new Piece (1, i, PAWN, WHITE_PLAYER));
}
for (let j=0; j < 8; j++) {
    result.push(new Piece (6, j, PAWN, BLACK_PLAYER));
}
for (let i = 0; i < 8; i++) {
    if (i==0 || i==7) {
        result.push(new Piece(7, i, ROOK, BLACK_PLAYER));
    } else if (i==1 || i==6) {
        result.push(new Piece(7, i, KNIGHT, BLACK_PLAYER));
    } else if (i==2 || i==5) {
    result.push(new Piece(7, i, BISHOP, BLACK_PLAYER));
}
}
result.push(new Piece (7, 3, QUEEN, BLACK_PLAYER))
result.push(new Piece (7, 4, KING, BLACK_PLAYER))
return result;
}

function addImage(cell, player, name) {                    //matching icons to classes function
  const image = document.createElement('img');
  image.src = 'images/' + player + '/' + name + '.png';
  cell.appendChild(image);
}

function onCellClick(event, row, col) {
  console.log(row);
  console.log(col);
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      table.rows[i].cells[j].classList.remove('possible-move');
    }
  }

  for (let piece of pieces) {
    if (piece.row === row && piece.col === col) {
      console.log(piece);
      let possibleMoves = piece.getPossibleMoves();
      for (let possibleMove of possibleMoves)
      table.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('possible-move');
    }
  }

  if (selectedCell !== undefined) {
    selectedCell.classList.remove('selected');
  }
  selectedCell = event.currentTarget;
  selectedCell.classList.add('selected');
}
     

function createChessBoard() {                             //creating board function
  const cols = {1:"A", 2:"B", 3:"C", 4:"D", 5:"E", 6:"F", 7:"G", 8:"H"}
  table = document.createElement('table');
  table.className = "board";
  document.body.appendChild(table);
  for (let row = 0; row < BOARD_SIZE; row++) {
    // let rowElement = table.insertRow();
    let rowElement = document.createElement('tr');
    table.appendChild(rowElement);
    rowElement.dataset.line = row+1;
    for (let col = 0; col < BOARD_SIZE; col++) {
    //   let cell = rowElement.insertCell();
    let cell = document.createElement('td');
      cell.dataset.column = cols[col+1];
      cell.dataset.line = row;
      rowElement.appendChild(cell);
      cell.id = "cell-" + row.toString() + "_" + col.toString();
      if ((row + col) % 2 === 0) {
        cell.className = 'light-cell';
      } else {
        cell.className = 'dark-cell';
      }
      cell.addEventListener('click', (event) => onCellClick(event, row, col));
    }
  }
  
  pieces = getInitialBoard();
  pieces[0].getPossibleMoves();
  // console.log('pieces', pieces);

  for (let piece of pieces) {
    addImage(table.rows[piece.row].cells[piece.col], piece.player, piece.type);
  }
}
window.addEventListener('load', createChessBoard);

