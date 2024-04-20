
document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('game-board');
    const squares = [];

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
        placeBlackPieces();
    }

    function placeBlackPieces() {
        // Hardcoded positions for the 12 black pieces
        const positions = [
            1, 3, 5, 7, // The first row (from the top, 0-indexed)
            8, 10, 12, 14, // The second row
            17, 19, 21, 23  // The third row
        ];

        positions.forEach(position => {
            const piece = document.createElement('div');
            piece.classList.add('piece', 'black-piece');
            squares[position].appendChild(piece);
        });
    }

    createBoard();
});
