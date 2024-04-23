const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Ship {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.angle = Math.PI / 2; // apuntando hacia arriba
        this.rotationSpeed = 0.05;
        this.speed = 0.1;
    }

    draw() {
        ctx.strokeStyle = "#ffffff";
        ctx.beginPath();
        ctx.moveTo(this.x + Math.cos(this.angle) * 20, this.y - Math.sin(this.angle) * 20);
        ctx.lineTo(this.x - Math.cos(this.angle) * 10, this.y + Math.sin(this.angle) * 10);
        ctx.lineTo(this.x - Math.cos(this.angle + 0.5) * 10, this.y + Math.sin(this.angle + 0.5) * 10);
        ctx.lineTo(this.x + Math.cos(this.angle) * 20, this.y - Math.sin(this.angle) * 20);
        ctx.stroke();
    }

    rotate(dir) {
        this.angle += this.rotationSpeed * dir;
    }

    update() {
        this.draw();
    }
}

function draw() {
    ctx.strokeStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(this.x + Math.cos(this.angle) * 20, this.y - Math.sin(this.angle) * 20);
    ctx.lineTo(this.x - Math.cos(this.angle) * 10, this.y + Math.sin(this.angle) * 10);
    ctx.lineTo(this.x - Math.cos(this.angle + 0.5) * 10, this.y + Math.sin(this.angle + 0.5) * 10);
    ctx.lineTo(this.x + Math.cos(this.angle) * 20, this.y - Math.sin(this.angle) * 20);
    ctx.stroke();
}

const ship = new Ship(canvas.width / 2, canvas.height / 2);

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ship.update();
}

animate();

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

let leftPressed = false;
let rightPressed = false;
let upPressed = false;

// Ajustar la velocidad de giro de la nave
const rotationSpeed = Math.PI / 90; // Ajusta este valor para cambiar la velocidad de giro

function keyDownHandler(event) {
    console.log("Tecla presionada UNO:", event.key);
    if (event.key === 'ArrowLeft') {
        leftPressed = true;
    } else if (event.key === 'ArrowRight') {
        rightPressed = true;
    } else if (event.key === 'ArrowUp') {
        upPressed = true;
    }
}
function keyUpHandler(event) {
    console.log("Tecla liberada UNO:", event.key);
    if (event.key === 'ArrowLeft') {
        leftPressed = false;
    } else if (event.key === 'ArrowRight') {
        rightPressed = false;
    } else if (event.key === 'ArrowUp') {
        upPressed = false;
    }
}

function update() {
    if (leftPressed) {
        ship.angle -= rotationSpeed; // Reducir el ángulo para aumentar la velocidad de giro a la izquierda
    } else if (rightPressed) {
        ship.angle += rotationSpeed; // Aumentar el ángulo para aumentar la velocidad de giro a la derecha
    }
    /*if (leftPressed) {
        ship.angle -= Math.PI / 180;
    } else if (rightPressed) {
        ship.angle += Math.PI / 180;
    }*/
}

class Asteroid {
    constructor(x, y, radius, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocity = velocity;
    }

    draw() {
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

const asteroids = [];

function createAsteroids() {
    for (let i = 0; i < 5; i++) {
        const radius = Math.random() * 30 + 15;
        let x, y;
        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
            y = Math.random() * canvas.height;
        } else {
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        }
        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
        const velocity = {
            x: Math.cos(angle) * (Math.random() * 2 + 1),
            y: Math.sin(angle) * (Math.random() * 2 + 1)
        };
        asteroids.push(new Asteroid(x, y, radius, velocity));
    }
}

createAsteroids();

function drawAsteroids() {
    asteroids.forEach(asteroid => asteroid.draw());
}

function updateAsteroids() {
    asteroids.forEach(asteroid => {
        asteroid.update();
        handleOutOfBounds(asteroid);
    });
}
function handleOutOfBounds(asteroid) {
    if (asteroid.x < 0) {
        asteroid.x = canvas.width;
    } else if (asteroid.x > canvas.width) {
        asteroid.x = 0;
    }
    
    if (asteroid.y < 0) {
        asteroid.y = canvas.height;
    } else if (asteroid.y > canvas.height) {
        asteroid.y = 0;
    }
}
function detectCollision(obj1, obj2) {
    const distance = Math.sqrt((obj1.x - obj2.x) ** 2 + (obj1.y - obj2.y) ** 2);
    return distance < obj1.radius + obj2.radius;
}
let score = 0;

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText('Puntuación: ' + score, 20, 40);
}
/*function checkCollisions() {
    asteroids.forEach(asteroid => {
        if (detectCollision(ship, asteroid)) {
            // Colisión detectada, puedes añadir acciones aquí como perder una vida o reiniciar el juego
            console.log('¡Colisión detectada!');
        }
    });
}*/
function checkCollisions() {
    bullets.forEach(bullet => {
        asteroids.forEach((asteroid, asteroidIndex) => {
            if (detectCollision(bullet, asteroid)) {
                bullets.splice(bullets.indexOf(bullet), 1);
                asteroids.splice(asteroidIndex, 1);
               score += 10; // Incrementar la puntuación
               
            }
        });
    });

     // Colisión entre la nave y los asteroides
     asteroids.forEach((asteroid) => {
        if (detectCollision(ship, asteroid)) {
            // Colisión detectada, reiniciar el juego
            score = 0;
            ship.x = canvas.width / 2;
            ship.y = canvas.height / 2;
            asteroids.length = 0;
            bullets.length = 0;
            createAsteroids();
        }
    });

    // Verificar si todos los asteroides han sido destruidos
    if (asteroids.length === 0) {
        createAsteroids(); // Crear nuevos asteroides
    }

}

/*function checkCollisions() {
    bullets.forEach((bullet, bulletIndex) => {
        asteroids.forEach((asteroid, asteroidIndex) => {
            if (detectCollision(bullet, asteroid)) {
                bullets.splice(bulletIndex, 1);
                asteroids.splice(asteroidIndex, 1);
                score += 10; // Incrementar la puntuación
            }
        });
    });
}*/

const bullets = [];

document.addEventListener('keydown', keyDownHandler);

function keyDownHandler(event) {
    console.log("Tecla presionada: DOS", event.key);
    if (event.key === 'ArrowLeft') {
        leftPressed = true;
    } else if (event.key === 'ArrowRight') {
        rightPressed = true;
    } else if (event.key === 'ArrowUp') {
        upPressed = true;
    } else if (event.key === ' ') {
        bullets.push(new Bullet(ship.x, ship.y, ship.angle));
    }
}

class Bullet {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.radius = 2;
        this.speed = 5;
        this.velocity = {
            x: Math.cos(angle) * this.speed,
            y: Math.sin(angle) * this.speed
        };
    }

    draw() {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

function drawBullets() {
    bullets.forEach(bullet => bullet.draw());
}

function updateBullets() {
    bullets.forEach(bullet => bullet.update());
}
const shipSpeed = 5; // Velocidad de movimiento de la nave

function updateShipPosition() {
    if (leftPressed) {
        ship.angle -= rotationSpeed;
    } else if (rightPressed) {
        ship.angle += rotationSpeed;
    }

    if (upPressed) {
        const accelerationX = Math.cos(ship.angle) * shipSpeed;
        const accelerationY = Math.sin(ship.angle) * shipSpeed;
        ship.x += accelerationX;
        ship.y += accelerationY;
    }

    // Asegurarse de que la nave no salga de los límites del lienzo
    if (ship.x < 0) {
        ship.x = canvas.width;
    } else if (ship.x > canvas.width) {
        ship.x = 0;
    }
    
    if (ship.y < 0) {
        ship.y = canvas.height;
    } else if (ship.y > canvas.height) {
        ship.y = 0;
    }
}

function gameLoop() {
    update();
    updateAsteroids();
    updateBullets();
    updateShipPosition();
    checkCollisions();
    draw();
    drawAsteroids();
    drawBullets();
    drawScore(); // Dibujar la puntuación
    requestAnimationFrame(gameLoop);
}

gameLoop();
