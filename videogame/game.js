/* 0: vacio, 1: ladrillo, 2: plataforma, 3: Mario */
const levelMatrix = [
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [2, 2, 2, 2, 2, 0, 2, 2, 2, 2],
];

const player = {
  x: 1,
  y: 5,
};

function generateLevel() {
  const gameContainer = document.getElementById('game-container');
  for (let y = 0; y < levelMatrix.length; y++) {
    for (let x = 0; x < levelMatrix[y].length; x++) {
      const tileType = levelMatrix[y][x];
      const tile = document.createElement('div');
      tile.className = `tile type-${tileType}`;
      gameContainer.appendChild(tile);
    }
  }
}

function renderPlayer() {
  const playerTile = document.createElement('div');
  playerTile.className = 'tile type-3'; // Tipo 3 para Mario
  playerTile.style.gridColumnStart = player.x + 1; // Ajustar posición X
  playerTile.style.gridRowStart = player.y + 1; // Ajustar posición Y
  document.getElementById('game-container').appendChild(playerTile);
}

function clearPlayer() {
  const playerTile = document.querySelector('.type-3'); // Encontrar el tile de Mario
  if (playerTile) {
    playerTile.remove(); // Eliminar el tile de Mario
  }
}

function movePlayer(direction) {
  clearPlayer(); // Limpiar la posición anterior de Mario

  // Actualizar la posición de Mario según la dirección
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
      // Implementar salto si es necesario
      break;
  }

  renderPlayer(); // Renderizar a Mario en la nueva posición
}

document.addEventListener('keydown', (event) => {
  movePlayer(event.key); // Mover a Mario cuando se presiona una flecha
});

generateLevel(); // Generar el nivel inicial
renderPlayer(); // Renderizar a Mario inicialmente
