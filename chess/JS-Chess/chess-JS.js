const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const DARK_PLAYER = 'dark';
let selectedCell;
let pieces = [];
// let table;

class Piece {                                                //creating classes to pieces
    constructor (row, col, type, player) {
        this.row = row;
        this.col = col;
        this.type= type;
        this.player = player
    }
}

function getInitialBoard() {
let result = [];                                            //creating start-positions by loops
for (let i = 0; i < 8; i++) {
    if (i==0 || i==7) {
        result.push(new Piece(0, i, "rook", WHITE_PLAYER));
    } else if (i==1 || i==6) {
    result.push(new Piece(0, i, "knight", WHITE_PLAYER));
    } else if (i==2 || i==5) {
    result.push(new Piece(0, i, "bishop", WHITE_PLAYER));
}
}
result.push(new Piece (0, 3, "queen", WHITE_PLAYER))
result.push(new Piece (0, 4, "king", WHITE_PLAYER))

for (let i = 0; i < 8; i++) {
   result.push(new Piece (1, i, "pawn", WHITE_PLAYER));
}
for (let j=0; j < 8; j++) {
    result.push(new Piece (6, j, "pawn", DARK_PLAYER));
}
for (let i = 0; i < 8; i++) {
    if (i==0 || i==7) {
        result.push(new Piece(7, i, "rook", DARK_PLAYER));
    } else if (i==1 || i==6) {
        result.push(new Piece(7, i, "knight", DARK_PLAYER));
    } else if (i==2 || i==5) {
    result.push(new Piece(7, i, "bishop", DARK_PLAYER));
}
}
result.push(new Piece (7, 3, "queen", DARK_PLAYER))
result.push(new Piece (7, 4, "king", DARK_PLAYER))
return result;
}

function addImage(cell, player, name) {                    //matching icons to classes function
  const image = document.createElement('img');
  image.src = 'images/' + player + '/' + name + '.png';
  cell.appendChild(image);
}

function onCellClick (event){                             //click on a cell
    if(selectedCell !== undefined) {
        selectedCell.classList.remove('selected');
    }
    selectedCell = event.currentTarget;
    selectedCell.classList.add('selected');
    }
     

function createChessBoard() {                             //creating board function
    const cols = {1:"A", 2:"B", 3:"C", 4:"D", 5:"E", 6:"F", 7:"G", 8:"H"}
  const table1 = document.createElement('table');
  table1.className = "board";
  document.body.appendChild(table1);
  for (let i = 0; i < BOARD_SIZE; i++) {
    // let row = table1.insertRow();
    let row = document.createElement('tr');
    table1.appendChild(row);
    row.dataset.line = i+1;
    for (let j = 0; j < BOARD_SIZE; j++) {
    //   let cell = row.insertCell();
    let cell = document.createElement('td');
      cell.dataset.col = cols[j+1];
      cell.dataset.line = i;
      row.appendChild(cell);
      cell.id = "cell-" + i.toString() + "_" + j.toString();
      if ((i + j) % 2 === 0) {
        cell.className = 'light-cell';
      } else {
        cell.className = 'dark-cell';
      }
      cell.addEventListener('click', onCellClick);
    }
  } 
  pieces = getInitialBoard();

  for(let piece of pieces) {
      addImage(table1.rows[piece.row].cells[piece.col], piece.player, piece.type)
  }
}
window.addEventListener('load', createChessBoard);

