
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
            square.addEventListener('click', movePiece); // Event listener for moving the piece
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
        const blackPositions = [
            1, 3, 5, 7,
            8, 10, 12, 14,
            17, 19, 21, 23
        ];
        blackPositions.forEach(position => placePiece(position, 'black-piece'));
    }

    function placeRedPieces() {
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
        selectedPieceIndex = squares.findIndex(square => square.contains(selectedPiece));
        event.stopPropagation(); // Prevent the click from reaching the square
    }

    function isValidMove(startIndex, endIndex, isCapture) {
        const startRow = Math.floor(startIndex / 8);
        const endRow = Math.floor(endIndex / 8);
        const squareIsEmpty = !squares[endIndex].hasChildNodes();
        const moveIsDiagonal = Math.abs(startIndex - endIndex) === 7 || Math.abs(startIndex - endIndex) === 9;
        const moveIsForward = selectedPiece.classList.contains('black-piece') ? endRow > startRow : endRow < startRow;

        if (isCapture) {
            const opponentExists = squares[startIndex].hasChildNodes() && 
                                   squares[startIndex].firstChild.classList.contains(selectedPiece.classList.contains('black-piece') ? 'red-piece' : 'black-piece');
            return squareIsEmpty && moveIsDiagonal && opponentExists;
        }

        return squareIsEmpty && moveIsDiagonal && moveIsForward && !isCapture;
    }

    function movePiece(event) {
        if (!selectedPiece) return; // No piece selected

        const index = squares.findIndex(square => square === event.currentTarget);
        const isCapture = selectedPieceIndex >= 0 && 
                          squares[selectedPieceIndex].hasChildNodes() && 
                          squares[index].hasChildNodes() &&
                          squares[index].firstChild.classList.contains(selectedPiece.classList.contains('black-piece') ? 'red-piece' : 'black-piece');

        if (isCapture) {
            if (isValidMove(selectedPieceIndex, index, true)) {
                // Capture the piece
                squares[selectedPieceIndex].removeChild(squares[selectedPieceIndex].firstChild);
                squares[index].appendChild(selectedPiece);
            } else {
                alert('Invalid move');
            }
        } else if (isValidMove(selectedPieceIndex, index, false)) {
            squares[index].appendChild(selectedPiece);
        } else {
            alert('Invalid move');
        }

        selectedPiece.classList.remove('selected');
        selectedPiece = null;
        selectedPieceIndex = -1;
    }

    createBoard();
});
