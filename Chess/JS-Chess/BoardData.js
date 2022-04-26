class BoardData {
    constructor() {
        this.initPieces();
    }

    // Create list of pieces (32 total)
    initPieces() {
        this.pieces = [];
    
        for (let i = 0; i < BOARD_SIZE; i++) {
          this.pieces.push(new Piece(0, i, PIECES[i], WHITE_PLAYER));
          this.pieces.push(new Piece(1, i, PAWN, WHITE_PLAYER));
          this.pieces.push(new Piece(6, i, PAWN, BLACK_PLAYER));
          this.pieces.push(new Piece(7, i, PIECES[i], BLACK_PLAYER));
        }
      } 

      
    //     function addFirstRowPieces(result, row, player) {
    //         const positioningPieces = [ROOK, KNIGHT, BISHOP, KING, QUEEN, BISHOP, KNIGHT, ROOK];
    //         positioningPieces.forEach((piece, index) => {
    //         result.push(new Piece(row, index, piece, player));
    //       });
    //     }

    //     addFirstRowPieces(pieces, 0, WHITE_PLAYER);
    //     addFirstRowPieces(pieces, 7, BLACK_PLAYER);

    //     for (let i = 0; i < BOARD_SIZE; i++) {
    //         pieces.push(new Piece(1, i, PAWN, WHITE_PLAYER));
    //         pieces.push(new Piece(6, i, PAWN, BLACK_PLAYER));
    //     }
    //     return pieces;
    // }


    // Returns piece in row, col, or undefined if not exists.
    getPiece(row, col) {
        for (const piece of this.pieces) {
            if (piece.row === row && piece.col === col) {
                return piece;
            }
        }
    }

    removePiece(row, col) {
        for (let i = 0; i < this.pieces.length; i++) {
            const piece = this.pieces[i];
            if (piece.row === row && piece.col === col) {
                // Remove piece at index i
                this.pieces.splice(i, 1);
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
