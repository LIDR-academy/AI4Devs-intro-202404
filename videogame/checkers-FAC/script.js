
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
        placeRedPieces();
    }

    function placeBlackPieces() {
        // Hardcoded positions for the 12 black pieces
        const blackPositions = [
            1, 3, 5, 7, // The first row (from the top, 0-indexed)
            8, 10, 12, 14, // The second row
            17, 19, 21, 23  // The third row
        ];

        blackPositions.forEach(position => {
            const piece = document.createElement('div');
            piece.classList.add('piece', 'black-piece');
            squares[position].appendChild(piece);
        });
    }

    function placeRedPieces() {
        // Hardcoded positions for the 12 red pieces
        const redPositions = [
            40, 42, 44, 46, // The sixth row (from the top, 0-indexed)
            49, 51, 53, 55, // The seventh row
            56, 58, 60, 62  // The eighth row
        ];

        redPositions.forEach(position => {
            const piece = document.createElement('div');
            piece.classList.add('piece', 'red-piece');
            squares[position].appendChild(piece);
        });
    }

    createBoard();
});
