
document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('game-board');
    const squares = [];
    let selectedPiece = null;
    let selectedPieceIndex = -1;

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
            1, 3, 5, 7,
            8, 10, 12, 14,
            17, 19, 21, 23
        ];
        blackPositions.forEach(position => placePiece(position, 'black-piece'));
    }

    function placeRedPieces() {
        // Hardcoded positions for the 12 red pieces
        const redPositions = [
            40, 42, 44, 46,
            49, 51, 53, 55,
            56, 58, 60, 62
        ];
        redPositions.forEach(position => placePiece(position, 'red-piece'));
    }

    function placePiece(position, className) {
        const piece = document.createElement('div');
        piece.classList.add('piece', className);
        piece.addEventListener('click', selectPiece);
        squares[position].appendChild(piece);
    }

    function selectPiece(event) {
        if (selectedPiece) {
            selectedPiece.classList.remove('selected');
        }
        selectedPiece = event.currentTarget;
        selectedPiece.classList.add('selected');
        selectedPieceIndex = squares.findIndex(square => square === selectedPiece.parentElement);
        event.stopPropagation(); // Prevent the click from reaching the square
    }

    function isValidMove(startIndex, endIndex) {
        const startRow = Math.floor(startIndex / 8);
        const endRow = Math.floor(endIndex / 8);
        return (
            squares[endIndex].childElementCount === 0 && // Target square is empty
            Math.abs(startRow - endRow) === 1 && // Move is only one row away
            (Math.abs(startIndex - endIndex) === 7 || Math.abs(startIndex - endIndex) === 9) // Move is diagonal
        );
    }

    function movePiece(event) {
        const index = squares.findIndex(square => square === event.currentTarget);
        if (selectedPiece && isValidMove(selectedPieceIndex, index)) {
            event.currentTarget.appendChild(selectedPiece);
            selectedPiece.classList.remove('selected');
            selectedPiece = null;
            selectedPieceIndex = -1;
        } else {
            alert('Invalid move');
            if (selectedPiece) {
                selectedPiece.classList.remove('selected');
            }
            selectedPiece = null;
        }
    }

    board.addEventListener('click', movePiece);

    createBoard();
});
