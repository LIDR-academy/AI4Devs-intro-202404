document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('tetrisCanvas');
    const ctx = canvas.getContext('2d');
    const previewCanvas = document.getElementById('previewCanvas');
    const previewCtx = previewCanvas.getContext('2d');
    const startButton = document.getElementById('startButton');
    const scoreDisplay = document.getElementById('score');

    // Constantes
    const ROWS = 20;
    const COLS = 10;
    const BLOCK_SIZE = 30;
    const FALL_DELAY = 1000; // 1 segundo

    // Variables globales
    let board = [];
    let score = 0;
    let gameOver = false;
    let currentPiece;
    let nextPiece;
    let lastTime = 0;
    let paused = false;

    const SHAPES = [
        // Formas de las piezas de Tetris
        [[1, 1, 1], [0, 1, 0]],       // T
        [[0, 1, 1], [1, 1, 0]],       // S
        [[1, 1], [1, 1]],             // Cuadrado
        [[1, 1, 0], [0, 1, 1]],       // Z
        [[0, 1, 0], [1, 1, 1]],       // L
        [[1, 0], [1, 0], [1, 1]],     // L invertida
        [[0, 1], [0, 1], [1, 1]],     // S invertida
        [[1, 1, 1, 1]],               // I (horizontal)
        [[1], [1], [1], [1]]          // I (vertical)
    ];
    
    function getRandomColor() {
        const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    

    // Función principal de inicialización del juego
    function startGame() {
        initBoard();
        initPieces();
        startButton.style.display = 'none';
        score = 0;
        scoreDisplay.textContent = score;
        gameOver = false;
        update();
        drawNextPiece();
    }

    // Inicializar el tablero
    function initBoard() {
        board = Array.from({ length: ROWS }, () => Array(COLS).fill('#000'));
    }

    // Inicializar las piezas
    function initPieces() {
        currentPiece = getRandomPiece();
        nextPiece = getRandomPiece();
        drawNextPiece();
    }

    // Generar una pieza aleatoria
    function getRandomPiece() {
        const index = Math.floor(Math.random() * SHAPES.length);
        return {
            shape: SHAPES[index],
            color: getRandomColor(),
            x: Math.floor(COLS / 2) - 1,
            y: -1
        };
    }
  
// Dibujar la próxima pieza en el canvas de vista previa
function drawNextPiece() {
    previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
    
    // Dibujar la cuadrícula
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
            previewCtx.strokeStyle = '#999';
            previewCtx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        }
    }    

    // Dibujar la pieza
    drawPiecePreview(previewCtx, nextPiece,1,1);
}

// Función para dibujar una pieza en el canvas de vista previa
function drawPiecePreview(context, piece, offsetX = 0, offsetY = 0) {        
    for (let row = 0; row < piece.shape.length; row++) {
        for (let col = 0; col < piece.shape[row].length; col++) {
            if (piece.shape[row][col]) {
                const x = (col + offsetX) * BLOCK_SIZE;
                const y = (row + offsetY) * BLOCK_SIZE;
                context.fillStyle = piece.color;
                context.fillRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
                context.strokeStyle = '#999';
                context.strokeRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
            }
        }
    }
}


    // Dibujar una pieza en el tablero o en la vista previa
    function drawPiece(context, piece, offsetX = 0, offsetY = 0) {        
        for (let row = 0; row < piece.shape.length; row++) {
            for (let col = 0; col < piece.shape[row].length; col++) {
                if (piece.shape[row][col]) {
                    const x = (piece.x + col + offsetX) * BLOCK_SIZE;
                    const y = (piece.y + row + offsetY) * BLOCK_SIZE;
                    context.fillStyle = piece.color;
                    context.fillRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
                    context.strokeStyle = '#999';
                    context.strokeRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
                }
            }
        }
    }


    // Función para actualizar el juego en cada fotograma
    function update(time = 0) {
        const deltaTime = time - lastTime;

        if (!gameOver && !paused) {
            if (deltaTime > FALL_DELAY) {
                movePieceDown();
                lastTime = time;
            }
        }

        requestAnimationFrame(update);
    }

    // Dibujar el tablero
    function drawBoard() {
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                drawBlock(col, row, board[row][col]);
            }
        }
    }

    // Dibujar un bloque
    function drawBlock(x, y, color, context = ctx) {
        context.fillStyle = color;
        context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        context.strokeStyle = '#999';
        context.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    }
   

   // Colocar la pieza en su posición actual en el tablero
    function placePiece() {
        for (let row = 0; row < currentPiece.shape.length; row++) {
            for (let col = 0; col < currentPiece.shape[row].length; col++) {
                if (currentPiece.shape[row][col]) {
                    const boardX = currentPiece.x + col;
                    const boardY = currentPiece.y + row;
                    if (boardY >= 0) {
                        board[boardY][boardX] = currentPiece.color;
                    }
                }
            }
        }

        // Verificar si alguna parte de la pieza está por encima del tablero
        if (currentPiece.y <= 0) {
            gameOver = true;
            startButton.style.display = 'block';
            startButton.textContent = 'Reiniciar';
            animateGameOver(); // Llamar a la función para animar el fin del juego
            //return; // Salir de la función si el juego ha terminado
        }        
    }




    // Colorear una fila completa
    function drawCompleteRow(row) {
        ctx.fillStyle = '#333';
        ctx.fillRect(0, row * BLOCK_SIZE, canvas.width, BLOCK_SIZE);
    }

    // Animación cuando se completa una línea
    function animateLineClear(row) {
        drawCompleteRow(row);
        setTimeout(() => {
            ctx.clearRect(0, row * BLOCK_SIZE, canvas.width, BLOCK_SIZE);
            drawBoard();
        }, 300);
    }

    // Animación cuando el juego termina
    function animateGameOver() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = '40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
    }

    // Manejar el movimiento de las piezas hacia abajo   
    function movePieceDown() {        
        if (!gameOver && !paused && isValidMove(0, 1, currentPiece)) {
            currentPiece.y++;
            drawBoard();
            drawPiece(ctx, currentPiece);
        } else if (!isValidMove(0, 1, currentPiece)) {
            placePiece();
            checkLines();
            currentPiece = nextPiece;
            nextPiece = getRandomPiece();
            drawNextPiece();            
        }
    }


    // Manejar el movimiento hacia la izquierda
    function movePieceLeft() {
        if (!gameOver && !paused && isValidMove(-1, 0, currentPiece)) {
            currentPiece.x--;
            drawBoard();
            drawPiece(ctx, currentPiece);
        }
    }

    // Manejar el movimiento hacia la derecha
    function movePieceRight() {
        if (!gameOver && !paused && isValidMove(1, 0, currentPiece)) {
            currentPiece.x++;
            drawBoard();
            drawPiece(ctx, currentPiece);
        }
    }

    // Manejar la rotación de las piezas
    function rotatePiece() {
        if (!gameOver && !paused) {
            const rotatedPiece = {
                shape: [],
                color: currentPiece.color,
                x: currentPiece.x,
                y: currentPiece.y
            };
            for (let col = 0; col < currentPiece.shape[0].length; col++) {
                rotatedPiece.shape[col] = [];
                for (let row = 0; row < currentPiece.shape.length; row++) {
                    rotatedPiece.shape[col][row] = currentPiece.shape[currentPiece.shape.length - 1 - row][col];
                }
            }
            if (isValidMove(0, 0, rotatedPiece)) {
                currentPiece.shape = rotatedPiece.shape;
                drawBoard();
                drawPiece(ctx, currentPiece);
            }
        }
    }

    // Comprobar si una posición es válida para mover la pieza
    function isValidMove(offsetX, offsetY, piece) {
        for (let row = 0; row < piece.shape.length; row++) {
            for (let col = 0; col < piece.shape[row].length; col++) {
                if (piece.shape[row][col]) {
                    const newX = piece.x + col + offsetX;
                    const newY = piece.y + row + offsetY;
                    // Comprobar si la nueva posición está dentro del tablero
                    if (newX < 0 || newX >= COLS || newY >= ROWS || (newY >= 0 && board[newY][newX] !== '#000')) {
                        return false; // La posición no es válida
                    }
                }
            }
        }
        return true; // La posición es válida
    }


   // Comprobar si hay líneas completas
   function checkLines() {
    let linesCleared = 0;
    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row].every(cell => cell !== '#000')) {
            animateLineClear(row); // Llamar a la función para animar la línea borrada
            board.splice(row, 1);
            board.unshift(Array(COLS).fill('#000'));
            linesCleared++;
        }
    }
    if (linesCleared > 0) {
        score += linesCleared * 100;
        scoreDisplay.textContent = score;
        // Llamar recursivamente a checkLines para eliminar todas las líneas completas
        checkLines();
    }
}


    // Pausar el juego
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            paused = !paused;
            if (paused) {
                startButton.style.display = 'block'; // Mostrar el botón de inicio al pausar el juego
                ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#fff';
                ctx.font = '40px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('Paused', canvas.width / 2, canvas.height / 2);
            } else {
                startButton.style.display = 'none'; // Ocultar el botón de inicio al reanudar el juego
                update();
            }
        }
    });


    // Event listeners para las teclas de flecha y la barra espaciadora
    document.addEventListener('keydown', event => {
        if (!gameOver && !paused) {
            switch (event.key) {
                case 'ArrowLeft':
                    movePieceLeft();
                    break;
                case 'ArrowUp':
                    rotatePiece();
                    break;
                case 'ArrowRight':
                    movePieceRight();
                    break;
                case 'ArrowDown':
                    movePieceDown();
                    break;
            }
        }
    });

    // Reiniciar el juego
    function restartGame() {
        initBoard();
        initPieces();
        startButton.style.display = 'none';
        score = 0;
        scoreDisplay.textContent = score;
        gameOver = false;
        paused = false; // Asegúrate de reiniciar el estado de pausa
        update(); // Reanudar el juego
    }


    // Evento click en el botón de inicio
    startButton.addEventListener('click', startGame);

    // Evento click en el botón de reinicio
    startButton.addEventListener('click', restartGame);
});
