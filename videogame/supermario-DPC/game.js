/* 0: vacio, 1: ladrillo, 2: plataforma, 3: Mario, 4: Moneda, 5: Enemigo, 6: Meta */
const levelMatrix = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 4, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 2, 2, 2, 0, 0, 6],
  [2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2],
];

const player = {
  x: 1,
  y: 5,
  isFalling: true,
  isJumping: false,
  jumpHeight: 2,
  jumpCount: 0,
  score: 0,
  lives: 3,
};

const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const messageDisplay = document.getElementById('message');

function generateLevel() {
  for (let y = 0; y < levelMatrix.length; y++) {
    for (let x = 0; x < levelMatrix[y].length; x++) {
      const tileType = levelMatrix[y][x];
      const tile = document.createElement('div');
      tile.className = `tile type-${tileType}`;
      tile.id = `tile-${x}-${y}`;
      tile.style.gridColumnStart = x + 1;
      tile.style.gridRowStart = y + 1;
      gameContainer.appendChild(tile);
    }
  }
}

function renderPlayer() {
  const playerTile = document.createElement('div');
  playerTile.className = 'tile type-3';
  playerTile.style.gridColumnStart = player.x + 1;
  playerTile.style.gridRowStart = player.y + 1;
  gameContainer.appendChild(playerTile);
}

function clearPlayer() {
  const playerTile = document.querySelector('.type-3');
  if (playerTile) {
    playerTile.remove();
  }
}

function movePlayer(direction) {
  clearPlayer();

  if (!player.isJumping && player.isFalling && player.y < levelMatrix.length - 1 && levelMatrix[player.y + 1][player.x] !== 1 && levelMatrix[player.y + 1][player.x] !== 2) {
    player.y++;
  }
  if (!player.isJumping && player.isFalling && player.y === levelMatrix.length - 1) {
    // Mario ha llegado al límite inferior del mapa
    player.lives--;
    if (player.lives <= 0) {
      gameOver();
    } else {
      respawnPlayer();
    }
    return;
  }

  switch (direction) {
    case 'ArrowLeft':
      if (player.x > 0 && levelMatrix[player.y][player.x - 1] !== 1) {
        player.x--;
      }
      break;
    case 'ArrowRight':
      if (player.x < levelMatrix[0].length - 1 && levelMatrix[player.y][player.x + 1] !== 1) {
        player.x++;
      }
      break;
    case 'ArrowUp':
      if (!player.isJumping && (levelMatrix[player.y + 1][player.x] === 1 || levelMatrix[player.y + 1][player.x] === 2)) {
        player.isJumping = true;
        player.jumpCount = 0;
      }
      break;
  }

  if (player.isJumping) {
    if (player.jumpCount < player.jumpHeight) {
      player.y--;
      player.jumpCount++;
    } else {
      player.isJumping = false;
      player.isFalling = true;
    }
  }

  handleCollisions(); // Nueva función para manejar colisiones
  renderPlayer();
}

function updateTile(x, y, type) {
  const tile = document.querySelector(`#tile-${x}-${y}`);
  if (tile) {
    tile.className = `tile type-${type}`;
  }
}
function handleCollisions() {
  const tileType = levelMatrix[player.y][player.x];
  switch (tileType) {
    case 4: // Moneda
      player.score += 10;
      updateUI();
      levelMatrix[player.y][player.x] = 0; // Eliminar la moneda del nivel
      updateTile(player.x, player.y, 0); // Actualizar el tipo de tile en el DOM
      break;
    case 5: // Enemigo
      player.lives--;
      if (player.lives <= 0) {
        gameOver();
      } else {
        respawnPlayer();
      }
      break;
    case 6: // Meta
      levelCompleted();
      break;
  }
}

function respawnPlayer() {
  player.x = 1;
  player.y = 5;
  player.isFalling = true;
  player.isJumping = false;
  player.jumpCount = 0;
  updateUI();
}

function levelCompleted() {
  messageDisplay.textContent = 'Nivel Completado';
  setTimeout(() => {
    // Código para cargar el siguiente nivel o mostrar un mensaje de juego completado
  }, 2000);
}

function gameOver() {
  messageDisplay.textContent = 'Game Over';
  // Código para reiniciar el juego o mostrar un mensaje de finalización
}

function updateUI() {
  scoreDisplay.textContent = `Score: ${player.score}`;
  livesDisplay.textContent = `Lives: ${player.lives}`;
}

setInterval(() => {
  movePlayer('ArrowDown');
}, 200);

document.addEventListener('keydown', (event) => {
  movePlayer(event.key);
});

generateLevel();
updateUI(); // Mostrar la puntuación y vidas iniciales

