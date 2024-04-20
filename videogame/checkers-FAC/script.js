
document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('game-board');
    const squares = [];
    let isBlackTurn = true;

    function createBoard() {
        for (let i = 0; i < 64; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.classList.add(((i + Math.floor(i / 8)) % 2 === 0) ? 'light' : 'dark');
            square.addEventListener('click', function () { handleClick(i); });
            board.appendChild(square);
            squares.push(square);
        }
        placePieces();
    }

    function placePieces() {
        for (let i = 0; i < 24; i++) {
            if ((i + Math.floor(i / 8)) % 2 !== 0) {
                const piece = document.createElement('div');
                piece.classList.add('piece', i < 12 ? 'black-piece' : 'red-piece');
                squares[i < 12 ? i + (i % 8 < 4 ? 1 : 0) : 40 + i - (i % 8 < 4 ? 0 : 1)].appendChild(piece);
            }
        }
    }

    function handleClick(index) {
        // This function will be expanded to handle piece selection, movement, and capture.
        console.log('Square clicked:', index);
    }

    createBoard();
});
