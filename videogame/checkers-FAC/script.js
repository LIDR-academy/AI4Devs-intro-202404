
document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('game-board');
    const squares = [];
    let isBlackTurn = true;

    function createBoard() {
        for (let i = 0; i < 64; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.classList.add(((i + Math.floor(i / 8)) % 2 === 0) ? 'light' : 'dark');
            board.appendChild(square);
            squares.push(square);
        }
        placePieces();
    }

    function placePieces() {
        // Place black pieces
        for (let i = 0; i < 24; i++) {
            if ((i + Math.floor(i / 8)) % 2 !== 0) {
                const piece = document.createElement('div');
                piece.classList.add('piece');
                if (i < 12) {
                    // Add black pieces to the first 3 rows
                    piece.classList.add('black-piece');
                    squares[i + Math.floor(i / 4) * 8].appendChild(piece);
                } else if (i >= 24 - 12) {
                    // Add red pieces to the last 3 rows
                    piece.classList.add('red-piece');
                    squares[40 + (i - 12) + Math.floor((i - 12) / 4) * 8].appendChild(piece);
                }
            }
        }
    }

    createBoard();
});
