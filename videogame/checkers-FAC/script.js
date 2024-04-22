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
            square.addEventListener('click', movePiece);
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
        event.stopPropagation();
    }

    function isValidRegularMove(startIndex, endIndex) {
        // Regular move validation logic here (omitted for brevity)
    }

    function getCaptureIndices(startIndex, targetIndex) {
        // Get row and column for the starting and target indices
        const startRow = Math.floor(startIndex / 8);
        const startCol = startIndex % 8;
        const targetRow = Math.floor(targetIndex / 8);
        const targetCol = targetIndex % 8;

        // Direction of the move (1 for down-right, -1 for up-left)
        const rowDirection = Math.sign(targetRow - startRow);
        const colDirection = Math.sign(targetCol - startCol);

        // Calculate the potential landing spot
        const landingRow = targetRow + rowDirection;
        const landingCol = targetCol + colDirection;

        // Check if the landing spot is outside the board boundaries
        if (landingRow < 0 || landingRow > 7 || landingCol < 0 || landingCol > 7) {
            return null; // Capture is not possible
        }

        const landingIndex = landingRow * 8 + landingCol;
        return {targetIndex, landingIndex};
    }

    function canCapture(startIndex, endIndex) {
        const captureIndices = getCaptureIndices(startIndex, endIndex);
        if (!captureIndices) {
            return false;
        }
        const {targetIndex, landingIndex} = captureIndices;
        
        return squares[targetIndex].childElementCount === 1 &&
               !squares[landingIndex].hasChildNodes() &&
               squares[targetIndex].firstChild.classList.contains(selectedPiece.classList.contains('black-piece') ? 'red-piece' : 'black-piece');
    }

    function capturePiece(targetIndex, landingIndex) {
        // Remove the captured piece
        squares[targetIndex].removeChild(squares[targetIndex].firstChild);
        // Move the capturing piece to the landing square
        squares[landingIndex].appendChild(selectedPiece);
    }

    function movePiece(event) {
        const index = squares.findIndex(square => square === event.currentTarget);
        if (!selectedPiece) return; // No piece selected

        if (canCapture(selectedPieceIndex, index)) {
            const {landingIndex} = getCaptureIndices(selectedPieceIndex, index);
            capturePiece(index, landingIndex);
            selectedPiece.classList.remove('selected');
            selectedPiece = null;
            selectedPieceIndex = -1;
        } else if (isValidRegularMove(selectedPieceIndex, index)) {
            squares[index].appendChild(selectedPiece);
            selectedPiece.classList.remove('selected');
            selectedPiece = null;
            selectedPieceIndex = -1;
        } else {
            alert('Invalid move');
            selectedPiece.classList.remove('selected');
            selectedPiece = null;
            selectedPieceIndex = -1;
        }
    }

    createBoard();
});
