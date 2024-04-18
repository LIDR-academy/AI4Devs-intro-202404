const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [];
snake[0] = {
  x: Math.floor(tileCount / 2),
  y: Math.floor(tileCount / 2)
};

let food = {
  x: Math.floor(Math.random() * tileCount),
  y: Math.floor(Math.random() * tileCount)
};

let dx = 0;
let dy = 0;
let score = 0;
let gamePaused = false;
let gameOver = false;

function drawSnake() {
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = (i === 0) ? 'yellow' : 'white';
    ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize, gridSize);
  }
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function moveSnake() {
  const head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy
  };
  
  snake.unshift(head);
  
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };
  } else {
    snake.pop();
  }
}

function checkCollision() {
  if (
    snake[0].x < 0 ||
    snake[0].x >= tileCount ||
    snake[0].y < 0 ||
    snake[0].y >= tileCount
  ) {
    return true;
  }
  
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  
  return false;
}

function displayScore() {
  document.getElementById('score').textContent = 'Score: ' + score;
}

function gameLoop() {
  if (gameOver) {
    alert('Game Over! Your score: ' + score);
    resetGame();
    return;
  }
  
  if (checkCollision()) {
    gameOver = true;
    return;
  }
  
  drawSnake();
  drawFood();
  moveSnake();
  displayScore();
}

function resetGame() {
  snake = [];
  snake[0] = {
    x: Math.floor(tileCount / 2),
    y: Math.floor(tileCount / 2)
  };
  food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
  };
  dx = 0;
  dy = 0;
  score = 0;
  gameOver = false;
}

document.addEventListener('keydown', e => {
  if (gamePaused) return;

  switch (e.key) {
    case 'ArrowUp':
      if (dy === 0) {
        dx = 0;
        dy = -1;
      }
      break;
    case 'ArrowDown':
      if (dy === 0) {
        dx = 0;
        dy = 1;
      }
      break;
    case 'ArrowLeft':
      if (dx === 0) {
        dx = -1;
        dy = 0;
      }
      break;
    case 'ArrowRight':
      if (dx === 0) {
        dx = 1;
        dy = 0;
      }
      break;
    case 'p':
      gamePaused = !gamePaused;
      break;
  }
});

setInterval(gameLoop, 100);
