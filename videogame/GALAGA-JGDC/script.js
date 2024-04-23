// Variables globales
let ship;
let aliens = [];
let bullets = [];
let score = 0;
let lastSpeedUpTime = 0;
let gameover = false;
let aliensToRemove = []; // Array para almacenar los alienígenas marcados para eliminación

function setup() {
    createCanvas(800, 600);
    ship = new Ship();
    // Crear fondo de galaxia
    createGalaxyBackground(200);
    // Crear alienígenas
    createAliens(3, 10);
}

function draw() {
    if (gameover) {
        showGameOver();
        return;
    }

    background(0);

    // Dibujar y actualizar la nave espacial
    ship.show();
    ship.move();

    // Verificar si es hora de acelerar los alienígenas
    if (millis() - lastSpeedUpTime > 10000) {
        speedUpAliens();
        lastSpeedUpTime = millis();
    }

    // Dibujar y actualizar los alienígenas
    for (let i = aliens.length - 1; i >= 0; i--) {
        aliens[i].show();
        aliens[i].move();
        // Verificar colisión entre proyectiles y alienígenas
        for (let j = bullets.length - 1; j >= 0; j--) {
            if (aliens[i].hits(bullets[j])) {
                bullets.splice(j, 1);
                aliensToRemove.push(i); // Marcar el alienígena para su eliminación
                score++;
                break;
            }
        }
        // Verificar si un alienígena alcanza la nave espacial
        if (aliens[i].reachesShip(ship)) {
            gameover = true;
            break;
        }
    }

    // Eliminar los alienígenas marcados para su eliminación
    for (let i = aliensToRemove.length - 1; i >= 0; i--) {
        aliens.splice(aliensToRemove[i], 1);
    }
    aliensToRemove = []; // Limpiar el array de aliensToRemove

    // Dibujar y actualizar los proyectiles
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].show();
        bullets[i].move();
        if (bullets[i].y < 0) {
            bullets.splice(i, 1);
        }
    }

    // Mostrar el puntaje
    showScore();

    // Verificar si el jugador ha ganado
    if (aliens.length === 0) {
        showVictoryMessage();
        noLoop(); // Detener la animación del juego
    }

}


// Función para mostrar un mensaje de victoria
function showVictoryMessage() {
    background(0);
    fill(255);
    textSize(64);
    textAlign(CENTER, CENTER);
    text('¡Has ganado!', width / 2, height / 2);
    textSize(24);
    text('¡Felicidades, eres el héroe del espacio!', width / 2, height / 2 + 50);
}

function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        ship.setDir(1);
    } else if (keyCode === LEFT_ARROW) {
        ship.setDir(-1);
    } else if (key === ' ' && !gameover) {
        let bullet = new Bullet(ship.x + ship.w / 2, height - 50);
        bullets.push(bullet);
    }
}

function keyReleased() {
    if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
        ship.setDir(0);
    }
}

// Clase Ship
class Ship {
    constructor() {
        this.x = width / 2;
        this.y = height - 50;
        this.w = 40;
        this.speed = 5;
    }

    show() {
        fill(0, 255, 0);
        rect(this.x, this.y, this.w, 20);
    }

    move() {
        this.x += this.speed;
        this.x = constrain(this.x, 0, width - this.w);
    }

    setDir(dir) {
        this.speed = dir * 5;
    }
}

// Clase Alien
class Alien {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 30;
        this.speed = 2;
    }

    show() {
        fill(255, 0, 0);
        rectMode(CENTER);
        rect(this.x, this.y, this.width, this.height);
        fill(255);
        triangle(this.x - this.width / 2, this.y, this.x - this.width / 4, this.y - this.height / 2, this.x, this.y);
        triangle(this.x + this.width / 2, this.y, this.x + this.width / 4, this.y - this.height / 2, this.x, this.y);
        fill(0, 255, 255);
        rect(this.x, this.y - this.height / 2, this.width / 3, this.height / 4);
    }

    move() {
        this.x += this.speed;
        if (this.x > width - this.width / 2 || this.x < this.width / 2) {
            this.speed *= -1;
            this.y += this.height / 2;
        }
    }

    hits(bullet) {
        return (
            bullet.x > this.x - this.width / 2 &&
            bullet.x < this.x + this.width / 2 &&
            bullet.y > this.y - this.height / 2 &&
            bullet.y < this.y + this.height / 2
        );
    }

    reachesShip(ship) {
        return this.y + this.height / 2 >= ship.y && abs(this.x - ship.x) <= ship.w / 2;
    }
}

// Clase Bullet
class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 8;
        this.speed = 5;
    }

    show() {
        fill(0, 0, 255);
        ellipse(this.x, this.y, this.r * 2);
    }

    move() {
        this.y -= this.speed;
    }
}

// Función para crear el fondo de galaxia
function createGalaxyBackground(stars) {
    for (let i = 0; i < stars; i++) {
        let x = random(width);
        let y = random(height);
        stroke(255);
        point(x, y);
    }
}

// Función para mostrar el puntaje
function showScore() {
    textSize(24);
    fill(255);
    text('Puntaje: ' + score, 10, 30);
}

// Función para acelerar los alienígenas
function speedUpAliens() {
    for (let alien of aliens) {
        alien.speed *= 2;
    }
}

// Función para mostrar "Game Over"
function showGameOver() {
    background(0);
    fill(255);
    textSize(64);
    textAlign(CENTER, CENTER);
    text('Game Over', width / 2, height / 2);
}

// Función para crear los alienígenas
function createAliens(rows, cols) {
    let alienWidth = width / cols;
    let alienHeight = 50;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let x = j * alienWidth + alienWidth / 2;
            let y = i * alienHeight + alienHeight / 2 + 100;
            aliens.push(new Alien(x, y));
        }
    }
}
