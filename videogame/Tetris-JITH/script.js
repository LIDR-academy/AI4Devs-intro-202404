let gameOver = false;

document.addEventListener('DOMContentLoaded', function() {
    console.log('Tetris cargado correctamente');
});

document.addEventListener('DOMContentLoaded', function() {
    drawBoard();
});

document.addEventListener('keydown', function(event) {
    if(event.keyCode === 37) {
        // Flecha izquierda
        p.moveLeft();
        dropStart = Date.now();
    } else if(event.keyCode === 38) {
        // Flecha arriba, rotar
        p.rotate();
        dropStart = Date.now();
    } else if(event.keyCode === 39) {
        // Flecha derecha
        p.moveRight();
        dropStart = Date.now();
    } else if(event.keyCode === 40) {
        // Mantener presionado para acelerar la caída
        p.moveDown();
    }
});

// Evento para manejar la aceleración rápida
let dropStart = Date.now();
let defaultDropSpeed = 1000;  // 1 segundo por movimiento hacia abajo
let quickDropSpeed = 100;    // 0.1 segundos por movimiento hacia abajo cuando se mantiene presionado

document.addEventListener('keydown', function(event) {
    if(event.keyCode === 40) {
        defaultDropSpeed = quickDropSpeed;
    }
});

document.addEventListener('keyup', function(event) {
    if(event.keyCode === 40) {
        defaultDropSpeed = 1000; // Volver a la velocidad normal
    }
});

function drop() {
    let now = Date.now();
    let delta = now - dropStart;
    if(delta > defaultDropSpeed) {
        p.moveDown();
        dropStart = Date.now();
    }
    if (!gameOver) {
        requestAnimationFrame(drop);
    }
}

drop();  // Inicia el ciclo del juego

let p;

document.addEventListener('DOMContentLoaded', function() {
    p = randomPiece(); // Crea una nueva pieza al cargar la página
    drawBoard();
    drop(); // Inicia el ciclo de caída de las piezas
});

function getHighScores() {
    const scores = localStorage.getItem('highScores');
    return scores ? JSON.parse(scores) : [];
}

function saveHighScore(score, initials) {
    const highScores = getHighScores();
    const newScoreEntry = { score, initials };
    highScores.push(newScoreEntry);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5); // Mantener solo los top 5
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

function showHighScores() {
    const highScores = getHighScores();
    const highScoreList = document.getElementById('top-scores');
    highScoreList.innerHTML = 'Top Puntuaciones:<br>' +
        highScores.map(scoreEntry => `${scoreEntry.initials} - ${scoreEntry.score}`).join('<br>');
}



document.addEventListener('DOMContentLoaded', function() {
    showHighScores();
    // Inicialización del juego, etc.
});
