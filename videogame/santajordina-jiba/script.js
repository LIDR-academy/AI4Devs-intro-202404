const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

let level = 1;
let dragonDowned = 0;
let dragonsToLose = 3;
let playerX = canvas.width / 2;
let playerSpeed = 15;
let bullets = [];
let dragons = [];
let roses = [];
let fires = [];
let freezeTime = 0;

document.addEventListener('keydown', (event) => {
    if (freezeTime === 0) {
        if (event.key === 'ArrowLeft') {
            playerX = Math.max(0, playerX - playerSpeed);
        } else if (event.key === 'ArrowRight') {
            playerX = Math.min(canvas.width, playerX + playerSpeed);
        } else if (event.key === 'd') {
            bullets.push({ x: playerX, y: canvas.height - 20 });
        }
    }
});

function spawnDragon() {
    if (Math.random() < 0.05) {
        dragons.push({ x: Math.random() * canvas.width, y: 0, size: 30 });
    }
}

function checkSpawnRose() {
    if (dragonDowned % 10 === 0 && dragonDowned !== 0) {
        roses.push({ x: Math.random() * canvas.width, y: 0, size: 10 });
    }
}

function checkSpawnFire() {
    if (dragonDowned % 20 === 0 && dragonDowned !== 0) {
        fires.push({ x: Math.random() * canvas.width, y: 0, size: 15 });
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Arial";
    ctx.fillText("🥷🏼", playerX - 15, canvas.height - 20);

    dragons.forEach(d => {
        ctx.fillText("🐉", d.x, d.y);
    });

    roses.forEach(r => {
        ctx.fillText("🌹", r.x, r.y);
    });

    fires.forEach(f => {
        ctx.fillText("🔥", f.x, f.y);
    });

    bullets.forEach(bullet => {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(bullet.x, bullet.y, 5, 10);
    });
}

function update() {
    if (freezeTime > 0) {
        freezeTime--;
        return;
    }

    spawnDragon();

    // Manejo de colisiones con el jugador
    dragons.forEach((d, index) => {
        d.y += level;
        if (Math.abs(d.x - playerX) < d.size && d.y >= canvas.height - 30) {
            dragons.splice(index, 1);
            dragonsToLose--;
            document.getElementById('dragonsToLose').textContent = dragonsToLose;
            if (dragonsToLose === 0) {
                alert('Game Over');
                location.reload();
            }
        }
    });

    // Manejo de colisiones con balas
    bullets.forEach((bullet, bulletIndex) => {
        bullet.y -= 10;
        if (bullet.y > 0) {
            dragons.forEach((dragon, dragonIndex) => {
                if (bullet.x >= dragon.x && bullet.x <= dragon.x + dragon.size &&
                    bullet.y >= dragon.y && bullet.y <= dragon.y + dragon.size) {
                    dragons.splice(dragonIndex, 1);
                    bullets.splice(bulletIndex, 1);
                    dragonDowned++;
                    document.getElementById('dragonDowned').textContent = dragonDowned;
                    checkSpawnRose();
                    checkSpawnFire();
                }
            });
        }
    });

    if (Date.now() % 60000 === 0 && level < 10) {
        level++;
        document.getElementById('level').textContent = level;
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
