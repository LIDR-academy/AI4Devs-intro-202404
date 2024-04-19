const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let gamePaused = true;

const ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 1.5; // Velocidad horizontal
let dy = -1.5; // Velocidad vertical

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#eb8512";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collectBonuses();
    collisionDetection();
    if (!gamePaused) {

        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 4;
        } else if (leftPressed && paddleX > 0) {
            paddleX -= 4;
        }

        // Cambiar dirección si toca el borde
        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if (y + dy < ballRadius) {
            dy = -dy;
        } else if (y + dy > canvas.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            } else {
                lives--;
                if (lives === 0) {
                    // Si el jugador pierde todas sus vidas, mostrar "Game Over" y terminar el juego
                    gameOver();
                    return;
                } else {
                    // Si el jugador todavía tiene vidas, reiniciar el juego
                    x = canvas.width / 2;
                    y = canvas.height - 30;
                    dx = 1.5;
                    dy = -1.5;
                    paddleX = (canvas.width - paddleWidth) / 2;
                }
            }
        }

        x += dx;
        y += dy;

        // Actualizar la información en la pantalla
        document.getElementById('score').textContent = score;
        document.getElementById('lives').textContent = lives;
        document.getElementById('level').textContent = level;
    }
}

setInterval(draw, 0);

const paddleHeight = 10;
let paddleWidth = 100; // Modificado para ser una variable
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

let interval = 0;
let lives = 3;
let level = 1;
let score = 0;
let brickRowCount = 5 + level;
const brickColumnCount = 8;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const brickColors = ["#0095DD", "#FF7F50", "#32CD32", "#FFD700", "#FF6347"];

const bricks = [];

function initBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1, color: brickColors[r % brickColors.length] };
        }
    }
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = bricks[c][r].color;
                ctx.shadowColor = '#333'; // Color de la sombra
                ctx.shadowBlur = 5; // Desenfoque de la sombra
                ctx.roundRect(brickX, brickY, brickWidth, brickHeight, 5); // Función para dibujar un rectángulo redondeado
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

let bonuses = [];

const bonusTypes = [
    { type: "bigPaddle", color: "#32CD32" },
    { type: "multiHit", color: "#FF6347" }
];

function generateBonus(x, y) {
    const randomIndex = Math.floor(Math.random() * bonusTypes.length);
    const { type, color } = bonusTypes[randomIndex];
    bonuses.push({ x, y, type, color });
}

function drawBonuses() {
    for (let i = 0; i < bonuses.length; i++) {
        const bonus = bonuses[i];
        ctx.beginPath();
        ctx.rect(bonus.x, bonus.y, brickWidth, brickHeight);
        ctx.fillStyle = bonus.color;
        ctx.fill();
        ctx.closePath();
    }
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c] && bricks[c][r];
            if (b && b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score += 10; // Incrementar la puntuación por cada ladrillo destruido
                    if (levelComplete()) {
                        level++;
                        brickRowCount = 5 + level;
                        initBricks();
                        x = canvas.width / 2;
                        y = canvas.height - 30;
                        dx = 1.5;
                        dy = -1.5;
                        paddleX = (canvas.width - paddleWidth) / 2;
                    }
                    const chanceForBonus = Math.random();
                    if (chanceForBonus < 0.2) { // 20% de probabilidad de que aparezca una bonificación
                        generateBonus(b.x, b.y);
                    }
                }
            }
        }
    }
}



function collectBonuses() {
    for (let i = 0; i < bonuses.length; i++) {
        const bonus = bonuses[i];
        if (x > bonus.x && x < bonus.x + brickWidth && y > bonus.y && y < bonus.y + brickHeight) {
            applyBonus(bonus.type);
            bonuses.splice(i, 1);
            score += 50; // Incrementar la puntuación por cada bonificación recogida
            break;
        }
    }
}


function applyBonus(type) {
    switch (type) {
        case "bigPaddle":
            // Lógica para hacer la paleta más grande
            // Por ejemplo, podríamos aumentar temporalmente el ancho de la paleta.
            // Esto requeriría ajustar la lógica para el tamaño de la paleta y cómo interactúa con la pelota.
            paddleWidth += 20;
            setTimeout(() => {
                paddleWidth -= 20; // Después de cierto tiempo, volver al tamaño original
            }, 10000); // Mantener el tamaño grande durante 10 segundos
            break;
        case "multiHit":
            // Lógica para un arma especial que destruye múltiples ladrillos
            // Por ejemplo, podríamos destruir todos los ladrillos en una cierta área alrededor de la bonificación.
            // Esto requeriría detectar los ladrillos cercanos a la bonificación y marcarlos como destruidos.
            // Por simplicidad, simplemente destruiremos todos los ladrillos en la misma fila que la bonificación.
            const row = Math.floor((canvas.height - y) / (brickHeight + brickPadding));
            for (let c = 0; c < brickColumnCount; c++) {
                if (bricks[c][row] !== undefined) {
                    bricks[c][row].status = 0;
                }
            }
            break;
    }
}

function levelComplete() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                return false;
            }
        }
    }
    return true;
}

// Inicializar los ladrillos
initBricks();

document.getElementById('playButton').addEventListener('click', function () {
    clearInterval(interval); // Pausar el juego al hacer clic en el botón "Pause"
    interval = setInterval(draw, 10); // Comenzar el juego al hacer clic en el botón "Play"
    gamePaused = false; // Asegurarse de que el juego no esté pausado al comenzar
    this.disabled = true; // Deshabilitar el botón "Play" después de hacer clic en él
    document.getElementById('pauseButton').disabled = false; // Habilitar el botón "Pause"
});

document.getElementById('pauseButton').addEventListener('click', function () {
    clearInterval(interval); // Pausar el juego al hacer clic en el botón "Pause"
    gamePaused = true; // Marcar el juego como pausado
    this.disabled = true; // Deshabilitar el botón "Pause" después de hacer clic en él
    document.getElementById('continueButton').disabled = false; // Habilitar el botón "Continue"
});

document.getElementById('continueButton').addEventListener('click', function () {
    interval = setInterval(draw, 10); // Continuar el juego al hacer clic en el botón "Continue"
    gamePaused = false; // Asegurarse de que el juego no esté pausado
    this.disabled = true; // Deshabilitar el botón "Continue" después de hacer clic en él
    document.getElementById('pauseButton').disabled = false; // Habilitar el botón "Pause"
});

document.getElementById('restartButton').addEventListener('click', function () {
    document.location.reload(); // Reiniciar el juego al hacer clic en el botón "Restart"
});


// Obtener el modal
const modal = document.getElementById('gameOverModal');

// Obtener el span de cierre
const closeBtn = document.getElementsByClassName('close')[0];

// Cuando el juego termine, mostrar el modal
function gameOver() {
  gamePaused = true; // Marcar el juego como pausado
  modal.style.display = 'block';
  document.getElementById('finalScore').textContent = score; // Mostrar la puntuación final
}

// Cuando el usuario haga clic en el botón de cierre, ocultar el modal
closeBtn.onclick = function() {
  modal.style.display = 'none';
}

// Cuando el usuario haga clic en el botón de cierre, ocultar el modal y reiniciar el juego
closeBtn.onclick = function() {
  modal.style.display = 'none'; // Ocultar el modal
  document.location.reload(); // Reiniciar el juego al hacer clic en el botón "Restart"
}