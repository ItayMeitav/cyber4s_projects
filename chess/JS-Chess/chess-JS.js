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
let boardData;
let table;

class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
  }

  getOpponent() {
    if (this.player === WHITE_PLAYER) {
      return BLACK_PLAYER;
    }
    return WHITE_PLAYER;
  }

  getPossibleMoves(boardData) {
    // Get relative moves
    let moves;
    if (this.type === PAWN) {
      moves = this.getPawnMoves(boardData);
    } else if (this.type === ROOK) {
      moves = this.getRookMoves(boardData);
    } else if (this.type === KNIGHT) {
      moves = this.getKnightMoves(boardData);
    } else if (this.type === BISHOP) {
      moves = this.getBishopMoves(boardData);
    } else if (this.type === KING) {
      moves = this.getKingMoves(boardData);
    } else if (this.type === QUEEN) {
      moves = this.getQueenMoves(boardData);
    } else {
      console.log("Unknown type", type)
    }

    // // Get absolute moves
    // let absoluteMoves = [];
    // for (let relativeMove of relativeMoves) {
    //   const absoluteRow = this.row + relativeMove[0];
    //   const absoluteCol = this.col + relativeMove[1];
    //   absoluteMoves.push([absoluteRow, absoluteCol]);
    // }

    // Get filtered absolute moves
    let filteredMoves = [];
    for (let absoluteMove of moves) {
      const absoluteRow = absoluteMove[0];
      const absoluteCol = absoluteMove[1];
      if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
        filteredMoves.push(absoluteMove);
      }
    }
    return filteredMoves;
  }


  getMovesInDirection(directionRow, directionCol, boardData) {
    let result = [];

    for (let i = 1; i < BOARD_SIZE; i++) {
      let row = this.row + directionRow * i;
      let col = this.col + directionCol * i;
      if (boardData.isEmpty(row, col)) {
        result.push([row, col]);
      } else if (boardData.isPlayer(row, col, this.getOpponent())) {
        result.push([row, col]);
        return result;
      } else if (boardData.isPlayer(row, col, this.player)) {
        return result;
      }
    }
  }


  getPawnMoves(boardData) {
    let result = [];
    let direction = 1;
    if (this.player === BLACK_PLAYER) {
      direction = -1;
    }

    let position = [this.row + direction, this.col];
    if (boardData.isEmpty(position[0], position[1])) {
      result.push(position);
    }

    position = [this.row + direction, this.col + direction];
    if (boardData.isPlayer(position[0], position[1], this.getOpponent())) {
      result.push(position);
    }

    position = [this.row + direction, this.col - direction];
    if (boardData.isPlayer(position[0], position[1], this.getOpponent())) {
      result.push(position);
    }

    return result;
  }

  getKnightMoves(boardData) {
    let result = [];
    const relativeMoves = [[2, 1], [2, -1], [-2, 1], [-2, -1], [-1, 2], [1, 2], [-1, -2], [1, -2]];
    for (let relativeMove of relativeMoves) {
      let row = this.row + relativeMove[0];
      let col = this.col + relativeMove[1];
      if (!boardData.isPlayer(row, col, this.player)) {
        result.push([row, col]);
      }
    }
    return result;
  }

  getBishopMoves(boardData) {
    let result = [];
    result = result.concat(this.getMovesInDirection(-1, -1, boardData));
    result = result.concat(this.getMovesInDirection(-1, 1, boardData));
    result = result.concat(this.getMovesInDirection(1, -1, boardData));
    result = result.concat(this.getMovesInDirection(1, 1, boardData));
    return result;
  }

  getKingMoves(boardData) {
    let result = [];
    const relativeMoves = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    for (let relativeMove of relativeMoves) {
      let row = this.row + relativeMove[0];
      let col = this.col + relativeMove[1];
      if (!boardData.isPlayer(row, col, this.player)) {
        result.push([row, col]);
      }
    }
    return result;
  }

  getQueenMoves(boardData) {
    let result = this.getBishopMoves(boardData);
    result = result.concat(this.getRookMoves(boardData));
    return result;
  }
}




// getRookMoves(boardData) {
//   const boardSizeArray = [...Array(BOARD_SIZE).keys()].slice(1);
//   const movesArray = boardSizeArray.flatMap(i => {
//     return [[+i, 0, boardData], [-i, 0, boardData], [0, +i, boardData], [0, -i, boardData]]
//   });
//   movesArray = movesArray.concat(this.getMovesInDirection(movesArray));
//   return movesArray;
// }

// getKnightMoves(boardData) {
//   const numbers = { ones: [-1, +1], twos: [-2, +2] };
//   const combined = numbers.twos.flatMap(o => numbers.ones.map(t => [o, t]));
//   const reversedcombined = numbers.ones.flatMap(o => numbers.twos.map(t => [o, t]));
//   return [...combined, ...reversedcombined];
// }

// getBishopMoves(boardData) {
//   const boardSizeArray = [...Array(BOARD_SIZE).keys()].slice(1);
//   const movesArray = boardSizeArray.map(i => {
//     return [[+i, +i], [-i, -i], [+i, -i], [-i, +i]]
//   }).flat();
//   return movesArray;
// }; 

// getKingMoves(boardData) {
//   const numbers = [-1, 0, +1];
//   const combined = numbers.flatMap(o => numbers.flatMap(t => (o !== 0 || t !== 0) ? [[o, t]] : []))
//   return combined;
// }

// getQueenMoves(boardData) {
//   return [...this.getRookMoves(), ...this.getBishopMoves()];
// }
// }

class BoardData {
  constructor(pieces) {
    this.pieces = pieces;
  }

  // Returns piece in row, col, or undefined if not exists.
  getPiece(row, col) {
    for (const piece of this.pieces) {
      if (piece.row === row && piece.col === col) {
        return piece;
      }
    }
  }

  isEmpty(row, col) {
    return this.getPiece(row, col) === undefined;
  }

  isPlayer(row, col, player) {
    const piece = this.getPiece(row, col);
    return piece !== undefined && piece.player === player;
  }
}

//positioning pieces on board
function getInitialPieces() {
  let result = [];

  addFirstRowPieces(result, 0, WHITE_PLAYER);
  addFirstRowPieces(result, 7, BLACK_PLAYER);

  for (let i = 0; i < BOARD_SIZE; i++) {
    result.push(new Piece(1, i, PAWN, WHITE_PLAYER));
    result.push(new Piece(6, i, PAWN, BLACK_PLAYER));
  }
  return result;
}

function addFirstRowPieces(result, row, player) {
  const positioningPieces = [ROOK, KNIGHT, BISHOP, KING, QUEEN, BISHOP, KNIGHT, ROOK];
  positioningPieces.forEach((piece, index) => {
    result.push(new Piece(row, index, piece, player));
  });
}

//matching icons to classes function
function addImage(cell, player, name) {
  const image = document.createElement('img');
  // image.src = 'images/' + player + '/' + name + '.png';
  image.src = `images/${player}/${name}.png`;
  cell.appendChild(image);
}

// Clear all previous possible moves
function onCellClick(event, row, col) {
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      table.rows[i].cells[j].classList.remove('possible-move');
    }
  }

  // Show possible moves
  const piece = boardData.getPiece(row, col);
  if (piece !== undefined) {
    let possibleMoves = piece.getPossibleMoves(boardData);
    for (let possibleMove of possibleMoves) {
      const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
      cell.classList.add('possible-move');
    }
  }

  // Clear previously selected cell
  if (selectedCell !== undefined) {
    selectedCell.classList.remove('selected');
  }

  // Show selected cell
  selectedCell = event.currentTarget;
  selectedCell.classList.add('selected');
}

// Create empty chess board HTML: 
function createChessBoard() {
  const cols = { 1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "F", 7: "G", 8: "H" }
  table = document.createElement('table');
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
      cell.addEventListener('click', (event) => onCellClick(event, row, col));
    }
  }

  // Create list of pieces (32 total)
  boardData = new BoardData(getInitialPieces());

  // Add pieces images to board
  for (let piece of boardData.pieces) {
    const cell = table.rows[piece.row].cells[piece.col];
    addImage(cell, piece.player, piece.type);
  }
}

window.addEventListener('load', createChessBoard);
