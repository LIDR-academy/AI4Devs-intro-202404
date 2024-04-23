// Obtener el lienzo del juego
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Cargar imagen de la primera carga del juego
const initialImage = new Image();
initialImage.onload = function() {
    main();
};
initialImage.src = "https://miro.medium.com/v2/resize:fit:1358/1*DZ5fTW0uIZZct8qP55SptA.png";

// Constantes del juego
const birdWidth = 34; // Ancho del pájaro
const birdHeight = 24; // Altura del pájaro
const tubeWidth = 50; // Ancho de los tubos
const gap = 200; // Brecha entre los tubos
const jumpStrength = -7; // Fuerza del salto (se reduce para hacer el juego más lento)
const gravity = 0.3; // Gravedad (se reduce para hacer el juego más lento)

// Estado del juego
let gameStarted = false; // Estado del juego
let gameOver = false; // Estado de fin del juego

// Variables del juego
let birdY = canvas.height / 2; // Posición vertical del pájaro
let velocityY = 0; // Velocidad vertical del pájaro
let tubeX = canvas.width; // Posición horizontal de los tubos
let tubeHeight = Math.random() * 300 + 50; // Altura de los tubos
let score = 0; // Puntaje inicial

// Cargar imagen del fondo
const backgroundImage = new Image();
backgroundImage.src = "https://i.pinimg.com/originals/b2/b0/84/b2b084ad6061dfe2122302266ea8af58.jpg";

// Cargar imagen de los tubos
const tubeImage = new Image();
tubeImage.src = "https://www.pngkey.com/png/full/437-4376722_pipe-8-bit-mario-pipe-png.png";

// Cargar imagen del pájaro
const birdImage = new Image();
birdImage.src = "https://www.pngall.com/wp-content/uploads/15/Flappy-Bird-PNG-Background.png";

// Función principal del juego
function main() {
    if (gameStarted && !gameOver) {
        // Dibujar el fondo
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        drawBird();
        drawTubes();
        drawScore();
        updateGame();
        requestAnimationFrame(main);
    } else if (gameOver) {
        showGameOverScreen();
    } else {
     
        // Ampliar la imagen de la primera carga del juego y dibujarla centrada
        ctx.drawImage(initialImage, -canvas.width * 0.1, -canvas.height * 0.0, canvas.width * 1.2, canvas.height * 1.0);
    }
}
// Dibuja el pájaro en el lienzo
function drawBird() {
    ctx.drawImage(birdImage, 50, birdY, birdWidth, birdHeight);
}

// Dibuja los tubos en el lienzo
function drawTubes() {   

     // Dibujar el tubo superior con la imagen invertida
     ctx.save(); // Guardar el estado actual del contexto
     ctx.scale(1, -1); // Invertir horizontalmente
     ctx.drawImage(tubeImage, tubeX, -tubeHeight, tubeWidth, tubeHeight); // Tubo superior
     ctx.restore(); // Restaurar el estado previamente guardado

    ctx.drawImage(tubeImage, tubeX, tubeHeight + gap, tubeWidth, canvas.height - tubeHeight - gap); // Tubo inferior
}

// Dibuja el puntaje en el lienzo
function drawScore() {
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);
}

// Actualiza la posición del pájaro y los tubos
function updateGame() {
    birdY += velocityY;
    velocityY += gravity;
    tubeX -= 1; // Se reduce la velocidad de los tubos

    checkCollisions();
    updateScore();
    generateTubes();
}

// Verifica las colisiones del pájaro con los tubos o con los bordes del lienzo
function checkCollisions() {
    if (birdY <= 0 || birdY + birdHeight >= canvas.height || 
        ((50 + birdWidth >= tubeX && 50 <= tubeX + tubeWidth) && 
        (birdY <= tubeHeight || birdY + birdHeight >= tubeHeight + gap))) {
        gameOver = true;
    }
}

// Actualiza el puntaje si el pájaro pasa un tubo
function updateScore() {
    if (tubeX + tubeWidth < 50) {
        score++;
    }
}

// Genera nuevos tubos cuando los tubos actuales están fuera del lienzo
function generateTubes() {
    if (tubeX <= -tubeWidth) {
        tubeX = canvas.width;
        tubeHeight = Math.random() * 300 + 50;
    }
}

// Muestra la pantalla de "Game Over" con el puntaje y el botón de reinicio
function showGameOverScreen() {
    ctx.fillStyle = "#000";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 90, canvas.height / 2 - 50);
    ctx.fillText("Score: " + score, canvas.width / 2 - 70, canvas.height / 2);

    ctx.fillStyle = "#4caf50";
    ctx.fillRect(canvas.width / 2 - 50, canvas.height / 2 + 50, 100, 50);
    ctx.fillStyle = "#000";
    ctx.fillText("Restart", canvas.width / 2 - 47, canvas.height / 2 + 85);

    canvas.addEventListener("click", restartGame);
}

// Reinicia el juego cuando se hace clic en el botón de reinicio
function restartGame() {
    canvas.removeEventListener("click", restartGame);

    gameStarted = false;
    gameOver = false;
    score = 0; // Reiniciar puntaje
    tubeX = canvas.width; // Reiniciar posición de los tubos
    birdY = canvas.height / 2; // Reiniciar posición del pájaro
    main(); // Comenzar el juego
    velocityY = jumpStrength; // Hacer saltar al pájaro
}

// Evento de clic para hacer saltar al pájaro y comenzar el juego
document.addEventListener("click", function() {
    if (!gameStarted || gameOver) {
        gameStarted = true;
        gameOver = false;
        score = 0; // Reiniciar puntaje
        tubeX = canvas.width; // Reiniciar posición de los tubos
        birdY = canvas.height / 2; // Reiniciar posición del pájaro
        main(); // Comenzar el juego
        velocityY = jumpStrength; // Hacer saltar al pájaro
    } else {
        velocityY = jumpStrength; // Hacer saltar al pájaro
    }
});

// Comenzar el juego
main();
