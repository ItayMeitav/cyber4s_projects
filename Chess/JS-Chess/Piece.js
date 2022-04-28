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
      if (game.currentPlayer !== this.player) {
        let filteredMoves = [];
        return filteredMoves;
      } else {
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
      return result;
    }
  
  
    getPawnMoves(boardData) {
      let result = [];
      let direction = 1;
      if (this.player === BLACK_PLAYER) {
        direction = -1;
      }

      let oneStep = [this.row + direction, this.col];
      let twoStep = [this.row + direction * 2 ,this.col];

      if (this.row === 1 || this.row === 6) {
        if (boardData.getPiece(oneStep[0], oneStep[1]) === undefined &&
          boardData.getPiece(twoStep[0], twoStep[1]) === undefined) {
            result.push(twoStep);
          }
        }

      if (boardData.getPiece(oneStep[0], oneStep[1]) === undefined) {
        result.push(oneStep);
      }
  
      let EatPiece = [this.row + direction, this.col];
      if (boardData.isEmpty(EatPiece[0], EatPiece[1])) {
        result.push(EatPiece);
      }
  
      EatPiece = [this.row + direction, this.col + direction];
      if (boardData.isPlayer(EatPiece[0], EatPiece[1], this.getOpponent())) {
        result.push(EatPiece);
      }
  
      EatPiece = [this.row + direction, this.col - direction];
      if (boardData.isPlayer(EatPiece[0], EatPiece[1], this.getOpponent())) {
        result.push(EatPiece);
      }
  
      return result;
    }
  
  
    getRookMoves(boardData) {
      let result = [];
      result = result.concat(this.getMovesInDirection(-1, 0, boardData));
      result = result.concat(this.getMovesInDirection(1, 0, boardData));
      result = result.concat(this.getMovesInDirection(0, -1, boardData));
      result = result.concat(this.getMovesInDirection(0, 1, boardData));
      return result;
    }
    
  
  
    getKnightMoves(boardData) {
      let result = [];
      const numbers = { ones: [-1, +1], twos: [-2, +2] };
      const combined = numbers.twos.flatMap(o => numbers.ones.map(t => [o, t]));
      const reversedcombined = numbers.ones.flatMap(o => numbers.twos.map(t => [o, t]));
      const combinedTogether = [...combined, ...reversedcombined];
      for (let relativeMove of combinedTogether) {
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
      const numbers = [-1, 0, +1];
      const combined = numbers.flatMap(o => numbers.flatMap(t => (o !== 0 || t !== 0) ? [[o, t]] : []))
      for (let relativeMove of combined) {
        let row = this.row + relativeMove[0];
        let col = this.col + relativeMove[1];
        if (!boardData.isPlayer(row, col, this.player)) {
          result.push([row, col]);
        }
      }
      return result;
    }
  
  
  getQueenMoves(boardData) {
      return [...this.getRookMoves(boardData), ...this.getBishopMoves(boardData)];
    }
  }

  
  // getRookMoves(boardData) {
  //   let boardSizeArray = [...Array(BOARD_SIZE).keys()].slice(1);
  //   let movesArray = boardSizeArray.flatMap(i => {
  //     return [[+i, 0], [-i, 0], [0, +i], [0, -i]]
  //   });
  //   // movesArray = movesArray.concat(this.getMovesInDirection([[movesArray]]));
  //   console.log(movesArray);
  //   return movesArray;
  //   }


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