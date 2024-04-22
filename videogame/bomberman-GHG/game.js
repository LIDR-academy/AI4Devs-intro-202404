const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let isGameOver = false;

// Configuración inicial del canvas
canvas.width = 800;
canvas.height = 600;

// Definir el Mapa
let map = [];
const mapRows = 20;
const mapCols = 15;
const tileSize = 40;

// Bombas
let bombs = [];
const bombLifetime = 3000; // 3000 milisegundos = 3 segundos hasta la explosión
let lastBombPos = null;

// Definir la Posición y Velocidad del Jugador
let player = {
    x: 0, // posición inicial en x
    y: 0, // posición inicial en y
    size: 40, // tamaño del jugador
    speed: 4 // velocidad del jugador
};

// Manejo de Eventos de Teclado
let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

// GAME LOGIC

function initMap() {
    for (let row = 0; row < mapRows; row++) {
        map[row] = [];
        for (let col = 0; col < mapCols; col++) {
            if (row % 2 !== 0 && col % 2 !== 0) {
                map[row][col] = 1; // Bloques indestructibles en una formación de tablero de ajedrez
            } else {
                map[row][col] = Math.random() > 0.75 ? 2 : 0; // 25% de probabilidad de un bloque destructible
            }
        }
    }
    // Asegura que la posición inicial del jugador y los tiles circundantes estén libres
    map[0][0] = 0;
    map[0][1] = 0;
    map[1][0] = 0;
}

function canMove(x, y) {
    let top = Math.floor(y / tileSize);
    let bottom = Math.floor((y + player.size - 1) / tileSize);
    let left = Math.floor(x / tileSize);
    let right = Math.floor((x + player.size - 1) / tileSize);

    function isClearOrCurrentBomb(row, col) {
        return map[row][col] === 0 || (map[row][col] === 3 && player.x >= col * tileSize && player.x < (col + 1) * tileSize && player.y >= row * tileSize && player.y < (row + 1) * tileSize);
    }

    if (top < 0 || left < 0 || bottom >= mapRows || right >= mapCols) {
        return false;
    }

    return isClearOrCurrentBomb(top, left) && isClearOrCurrentBomb(top, right) &&
           isClearOrCurrentBomb(bottom, left) && isClearOrCurrentBomb(bottom, right);
}


function update() {
    let newX = player.x;
    let newY = player.y;

    if (keys.ArrowUp && canMove(player.x, player.y - player.speed) && player.x % tileSize === 0) {
        newY -= player.speed;
    } else if (keys.ArrowDown && canMove(player.x, player.y + player.speed) && player.x % tileSize === 0) {
        newY += player.speed;
    } else if (keys.ArrowLeft && canMove(player.x - player.speed, player.y) && player.y % tileSize === 0) {
        newX -= player.speed;
    } else if (keys.ArrowRight && canMove(player.x + player.speed, player.y) && player.y % tileSize === 0) {
        newX += player.speed;
    }

    // Ajustar al tile más cercano si no se está moviendo
    if (!keys.ArrowUp && !keys.ArrowDown && !keys.ArrowLeft && !keys.ArrowRight) {
        newX = Math.round(newX / tileSize) * tileSize;
        newY = Math.round(newY / tileSize) * tileSize;
    }

    player.x = newX;
    player.y = newY;

    // Limpiar lastBombPos si el jugador se ha movido
    if (lastBombPos && (player.x !== lastBombPos.x * tileSize || player.y !== lastBombPos.y * tileSize)) {
        lastBombPos = null;
    }

    updateBombs();
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

    drawMap();
    drawPlayer();
    drawBombs();
}

// Dibujar el mapa
function drawMap() {
    for (let row = 0; row < mapRows; row++) {
        for (let col = 0; col < mapCols; col++) {
            if (map[row][col] === 1) {
                ctx.fillStyle = 'gray'; // Color para bloques indestructibles
                ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            } else if (map[row][col] === 2) {
                ctx.fillStyle = 'brown'; // Color para bloques destructibles
                ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            }
        }
    }
}

// Dibujar al jugador
function drawPlayer() {
    ctx.fillStyle = 'blue'; // Color del jugador
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

// Dibujar las bombas
function drawBombs() {
    bombs.forEach(bomb => {
        ctx.fillStyle = 'black';
        ctx.globalAlpha = bomb.opacity; // Ajusta la opacidad global del canvas
        ctx.fillRect(bomb.x, bomb.y, tileSize, tileSize);
        ctx.globalAlpha = 1; // Restablece la opacidad para otros dibujos
    });
}

function main() {
    if (!isGameOver) {
        update();
        draw();
        requestAnimationFrame(main);
    } else {
        showRestartButton();
    }
}

function showRestartButton() {
    const button = document.createElement('button');
    button.textContent = 'Jugar de nuevo';
    button.onclick = restartGame;
    document.getElementById("gameCanvas").classList.add('game-over');
    document.getElementById("controls").prepend(button);
}

function restartGame() {
    isGameOver = false;
    initMap();  // Reinicia el mapa
    player.x = 0;  // Posición inicial del jugador
    player.y = 0;
    bombs = [];  // Limpia las bombas existentes
    const button = document.querySelector('button');
    if (button) {
        button.remove();  // Elimina el botón de reinicio
        document.getElementById("gameCanvas").classList.remove('game-over');
    }
    main();  // Reinicia el bucle del juego
}

// Bombas
function placeBomb(x, y) {
    let bombCol = Math.floor(x / tileSize);
    let bombRow = Math.floor(y / tileSize);

    if (map[bombRow][bombCol] === 0) {
        bombs.push({ x: bombCol * tileSize, y: bombRow * tileSize, timer: Date.now(), opacity: 1 });
        setTimeout(() => {
            map[bombRow][bombCol] = 3; // Marcar la celda como con bomba
        }, 1000);
    }
}


function updateBombs() {
    let currentTime = Date.now();
    for (let i = bombs.length - 1; i >= 0; i--) {
        let bomb = bombs[i];
        let timeElapsed = currentTime - bomb.timer;

        // Animar la opacidad
        if (timeElapsed < bombLifetime) {
            bomb.opacity = 0.5 + 0.5 * Math.sin(timeElapsed / 100); // Opacidad oscilante
        }

        if (timeElapsed > bombLifetime) {
            explodeBomb(bomb.x, bomb.y);
            bombs.splice(i, 1); // Elimina la bomba después de explotar
        }
    }
}


function explodeBomb(x, y) {
    let col = x / tileSize;
    let row = y / tileSize;
    map[row][col] = 0;  // Marca el lugar de la bomba como vacío después de la explosión

    // Definir el rango de explosión incluyendo verificaciones de límites
    let explosionRange = [];
    if (row > 0) explosionRange.push({ r: row - 1, c: col }); // Arriba
    if (row < mapRows - 1) explosionRange.push({ r: row + 1, c: col }); // Abajo
    if (col > 0) explosionRange.push({ r: row, c: col - 1 }); // Izquierda
    if (col < mapCols - 1) explosionRange.push({ r: row, c: col + 1 }); // Derecha

    explosionRange.forEach(pos => {
        if (map[pos.r][pos.c] === 2) {
            map[pos.r][pos.c] = 0; // Destruye bloques destructibles
        }
        // Verificar si el jugador está en esta posición
        if (Math.floor(player.x / tileSize) === pos.c && Math.floor(player.y / tileSize) === pos.r) {
            console.log("El jugador ha sido golpeado por una explosión!");  // Añadir lógica de daño o muerte aquí
            isGameOver = true;
        }
    });
}

function destroyBlock(row, col) {
    if (map[row][col] === 2) {
        map[row][col] = 0; // Cambia los bloques destructibles a espacio vacío
    }
}

document.addEventListener('keydown', function (event) {
    if (keys[event.key] !== undefined) {
        keys[event.key] = true;
    }

    if (event.key === ' ') { // Usar la barra espaciadora para colocar bombas
        placeBomb(player.x, player.y);
    }
});

document.addEventListener('keyup', function (event) {
    if (keys[event.key] !== undefined) {
        keys[event.key] = false;
    }
});


initMap();
main(); // Iniciar el juego

