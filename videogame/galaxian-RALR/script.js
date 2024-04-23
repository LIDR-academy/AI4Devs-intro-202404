// Constants
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const playerWidth = 20;
const playerHeight = 20;
const enemyRadius = 10;
const bulletRadius = 3;
const playerSpeed = 5;
const bulletSpeed = 8;
const enemySpeed = 1;
const enemySpawnInterval = 10000; // in milliseconds
const enemyPoints = 5;
const enemyPenalty = 1;
const crashPenalty = 3;

// Variables
let playerX = canvas.width / 2 - playerWidth / 2;
const playerY = canvas.height - playerHeight - 10;
let score = 0;
let maxScore = 0;
let enemies = [];
let bullets = [];
let isGameOver = false;
// Shooting flag
let isShooting = false;

// Event listeners
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

// Game loop
function gameLoop() {
    if (!isGameOver) {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }
}

// Update game state
function update() {
    // Move player
    if (keys.ArrowLeft && playerX > 0) {
        playerX -= playerSpeed;
    }
    if (keys.ArrowRight && playerX < canvas.width - playerWidth) {
        playerX += playerSpeed;
    }

    // Shoot if spacebar is pressed
    if (isShooting) {
        shoot();
    }

    // Move bullets
    bullets.forEach(bullet => {
        bullet.y -= bulletSpeed;
    });

    // Move enemies
    enemies.forEach(enemy => {
        enemy.y += enemySpeed;
    });

    // Spawn enemies
    if (Math.random() < 0.02) {
        spawnEnemy();
    }

    // Check collisions
    checkBulletEnemyCollisions();
    checkEnemyPlayerCollisions();
    checkEnemyOutOfBounds();

    // Update score
    document.getElementById('current-score').textContent = `Score: ${score}`;
    document.getElementById('max-score').textContent = `Max Score: ${maxScore}`;
}

// Draw game objects
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(playerX, playerY);
    ctx.lineTo(playerX + playerWidth / 2, playerY - playerHeight);
    ctx.lineTo(playerX + playerWidth, playerY);
    ctx.closePath();
    ctx.fill();

    // Draw bullets
    ctx.fillStyle = 'yellow';
    bullets.forEach(bullet => {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bulletRadius, 0, Math.PI * 2);
        ctx.fill();
    });

    // Draw enemies
    ctx.fillStyle = 'red';
    enemies.forEach(enemy => {
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemyRadius, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Handle player input
const keys = {};
function handleKeyDown(e) {
    keys[e.code] = true;
    if (e.code === 'Space') {
        isShooting = true;
    }
    else if (isGameOver && e.key === 'Enter') {
        restartGame();
    }

}
function handleKeyUp(e) {
    keys[e.code] = false;
    if (e.code === 'Space') {
        isShooting = false;
    }
}

// Spawn new enemy
function spawnEnemy() {
    const x = Math.random() * (canvas.width - enemyRadius * 2) + enemyRadius;
    const y = -enemyRadius;
    enemies.push({ x, y });
}

// Player shoots
function shoot() {
    const x = playerX + playerWidth / 2;
    const y = playerY;
    bullets.push({ x, y });
}

// Check bullet-enemy collisions
function checkBulletEnemyCollisions() {
    bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
            const dx = bullet.x - enemy.x;
            const dy = bullet.y - enemy.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < enemyRadius + bulletRadius) {
                bullets.splice(bulletIndex, 1);
                enemies.splice(enemyIndex, 1);
                score += enemyPoints;
                if (score > maxScore) {
                    maxScore = score;
                }
            }
        });
    });
}

// Check enemy-player collisions
function checkEnemyPlayerCollisions() {
    enemies.forEach((enemy, index) => {
        if (enemy.y + enemyRadius >= playerY &&
            enemy.x >= playerX &&
            enemy.x <= playerX + playerWidth) {
            enemies.splice(index, 1);
            score -= crashPenalty;
            if (score <= 0) {
                endGame();
            }
        }
    });
}

// Check if enemies are out of bounds
function checkEnemyOutOfBounds() {
    enemies.forEach((enemy, index) => {
        if (enemy.y - enemyRadius >= canvas.height) {
            enemies.splice(index, 1);
            score -= enemyPenalty;
            if (score <= 0) {
                endGame();
            }
        }
    });
}

function endGame() {
    document.getElementById('current-score').textContent = 'Game Over!';
    isGameOver = true;
}

// Restart the game
function restartGame() {
    // Reset variables
    isGameOver = false;
    score = 0;
    enemies = [];
    bullets = [];
    playerX = canvas.width / 2 - playerWidth / 2;
    
    // Remove game over message
    const gameOverMessage = document.querySelector('.game-over-message');
    if (gameOverMessage) {
        gameOverMessage.remove();
    }

    // Start game loop again
    gameLoop();
}

// Start the game loop
gameLoop();
