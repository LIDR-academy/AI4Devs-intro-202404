const canvas = document.getElementById('tetris-board');
const context = canvas.getContext('2d');

const row = 20;
const col = 10;
const sq = 30; // Tamaño de cada cuadrado
const vacant = 'white'; // Color de cuadrado vacío

// Dibujar un cuadrado
function drawSquare(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * sq, y * sq, sq, sq);
    context.strokeStyle = 'black';
    context.strokeRect(x * sq, y * sq, sq, sq);
}

// Crear el tablero
let board = [];
for (let r = 0; r < row; r++) {
    board[r] = [];
    for (let c = 0; c < col; c++) {
        board[r][c] = vacant;
    }
}

// Dibujar el tablero
function drawBoard() {
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
            drawSquare(c, r, board[r][c]);
        }
    }
}

drawBoard();

// Formas de las piezas
const I = [
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
    ]
];
const J = [
    [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0]
    ]
];
const L = [
    [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0]
    ],
    [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
    ]
];
const O = [
    [
        [1, 1],
        [1, 1]
    ]
];
const S = [
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1]
    ]
];
const T = [
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
    ],
    [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0]
    ]
];
const Z = [
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0]
    ]
];

const PIECES = [
    [Z, "red"],
    [S, "green"],
    [T, "yellow"],
    [O, "blue"],
    [L, "purple"],
    [I, "cyan"],
    [J, "orange"]
];

function randomPiece() {
    let r = Math.floor(Math.random() * PIECES.length);
    return new Piece(PIECES[r][0], PIECES[r][1]);
}

// Clase para manejar las piezas
class Piece {
    constructor(tetromino, color) {
        this.tetromino = tetromino;
        this.color = color;

        this.tetrominoN = 0; // Índice de la rotación actual
        this.activeTetromino = this.tetromino[this.tetrominoN];
        
        this.x = 3;
        this.y = -2;
    }

    draw() {
        for (let r = 0; r < this.activeTetromino.length; r++) {
            for (let c = 0; c < this.activeTetromino[r].length; c++) {
                if (this.activeTetromino[r][c]) {
                    drawSquare(this.x + c, this.y + r, this.color);
                }
            }
        }
    }
}

Piece.prototype.moveDown = function() {
    if (!this.collision(0, 1, this.activeTetromino)) {
        this.unDraw();
        this.y++;
        this.draw();
    } else {
        // Llama a lock cuando la pieza toca el fondo o otra pieza
        this.lock();
        p = randomPiece();
    }
};


Piece.prototype.moveRight = function() {
    if (!this.collision(1, 0, this.activeTetromino)) {
        this.unDraw();
        this.x++;
        this.draw();
    }
};

Piece.prototype.moveLeft = function() {
    if (!this.collision(-1, 0, this.activeTetromino)) {
        this.unDraw();
        this.x--;
        this.draw();
    }
};

Piece.prototype.rotate = function() {
    let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
    if (!this.collision(0, 0, nextPattern)) {
        this.unDraw();
        this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.draw();
    }
};

Piece.prototype.collision = function(x, y, piece) {
    for (let r = 0; r < piece.length; r++) {
        for (let c = 0; c < piece[r].length; c++) {
            // Si el cuadrado está vacío, lo ignoramos
            if (!piece[r][c]) continue;

            // Coordenadas de la pieza después del movimiento
            let newX = this.x + c + x;
            let newY = this.y + r + y;

            // Condiciones de colisión
            if (newX < 0 || newX >= col || newY >= row) return true;
            if (newY < 0) continue;  // Ignorar si está por encima del tablero
            if (board[newY][newX] != vacant) return true;
        }
    }
    return false;
};
Piece.prototype.unDraw = function() {
    for (let r = 0; r < this.activeTetromino.length; r++) {
        for (let c = 0; c < this.activeTetromino[r].length; c++) {
            if (this.activeTetromino[r][c]) {
                // Dibuja el cuadrado como 'vacant' en la posición actual antes de moverse
                drawSquare(this.x + c, this.y + r, vacant);
            }
        }
    }
};

Piece.prototype.lock = function() {
    for (let r = 0; r < this.activeTetromino.length; r++) {
        for (let c = 0; c < this.activeTetromino[r].length; c++) {
            // Ignoramos los cuadros vacíos
            if (!this.activeTetromino[r][c]) continue;

            // Si la pieza se bloquea fuera del tablero, es Game Over
            if (this.y + r < 0) {
                // Detener el juego
                gameOver = true;
                if (gameOver) {
                    endGame();
                }  
                return;
            }
            board[this.y + r][this.x + c] = this.color;
        }
    }

    // Eliminar líneas completas y aumentar puntuación
    let linesCleared = 0;
    for (let r = 0; r < row; r++) {
        let isRowFull = true;
        for (let c = 0; c < col; c++) {
            isRowFull = isRowFull && (board[r][c] != vacant);
        }
        if (isRowFull) {
            // Si la fila está completa, eliminamos la fila y desplazamos hacia abajo
            for (let y = r; y > 1; y--) {
                for (let c = 0; c < col; c++) {
                    board[y][c] = board[y-1][c];
                }
            }
            // La fila más superior no tiene una fila arriba, entonces la pintamos de vacío
            for (let c = 0; c < col; c++) board[0][c] = vacant;

            // Cada línea completada incrementa la cuenta
            linesCleared++;
        }
    }

    // Actualizar puntuación
    if (linesCleared > 0) {
        updateScore(linesCleared);
    }

    // Redibujar el tablero
    drawBoard();
};

let score = 0;

function updateScore(linesCleared) {
    score += linesCleared * 10;  // 10 puntos por línea
    document.getElementById('score').innerText = 'Puntuación: ' + score;

    // Aumentar la velocidad del juego por cada línea completada
    defaultDropSpeed = Math.max(100, defaultDropSpeed - 20 * linesCleared);
}

function getHighScores() {
    const scores = localStorage.getItem('highScores');
    return scores ? JSON.parse(scores) : [];
}

function saveHighScore(score) {
    const highScores = getHighScores();
    highScores.push(score);
    highScores.sort((a, b) => b - a);
    highScores.splice(5); // Mantener solo los top 5
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

function showHighScores() {
    const highScores = getHighScores();
    const highScoreList = document.getElementById('top-scores');
    highScoreList.innerHTML = 'Top Puntuaciones:<br>' + highScores.map(score => `${score}`).join('<br>');
}

let isGameOverHandled = false;

function endGame() {
    if (isGameOverHandled) return;
    isGameOverHandled = true;

    // Tu lógica para el fin del juego, incluyendo el pop-up de puntaje alto
    const currentScore = score;
    const highScores = getHighScores();
    
    if (highScores.length < 5 || currentScore > (highScores[4]?.score || 0)) {
        const initials = prompt('Nuevo récord! Ingresa tus iniciales:');
        if (initials) {
            saveHighScore(currentScore, initials);
            showHighScores();
        }
    }
    alert('Game Over. Tu puntuación fue: ' + currentScore);
    // Reiniciar el juego o manejar el fin del juego
}

// Lugar en tu código donde detectas el fin del juego
if (gameOver) {
    endGame();
}




