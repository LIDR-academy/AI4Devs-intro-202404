document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('gameArea');
    const gridSize = 20;
    let snake = [{ x: 10, y: 10 }, { x: 10, y: 9 }];
    let food = { x: 15, y: 15 };
    let direction = { x: 0, y: 1 }; // Movimiento inicial hacia abajo


    document.addEventListener('keydown', event => {
        const key = event.key;
        const { x, y } = direction;
    
        // Asegurarse de que la serpiente no se invierta
        if (key === 'ArrowUp' || key === 'w') {
            if (y === 0) direction = { x: 0, y: -1 };
        } else if (key === 'ArrowDown' || key === 's') {
            if (y === 0) direction = { x: 0, y: 1 };
        } else if (key === 'ArrowLeft' || key === 'a') {
            if (x === 0) direction = { x: -1, y: 0 };
        } else if (key === 'ArrowRight' || key === 'd') {
            if (x === 0) direction = { x: 1, y: 0 };
        }
    });

    function randomFoodPosition() {
        return {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize)
        };
    }

    function moveSnake() {
        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    
        // Comprobar si la cabeza de la serpiente está en la misma posición que el alimento
        if (head.x === food.x && head.y === food.y) {
            food = randomFoodPosition(); // Reposition food
        } else {
            snake.pop(); // Elimina el último segmento si no ha comido
        }
    
        snake.unshift(head); // Añade la nueva cabeza al inicio de la serpiente
        refreshGameArea();
    }


    


function isCollision(part) {
    return part.x === head.x && part.y === head.y;
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Comprobar colisión con las paredes o consigo misma
    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize || snake.some(isCollision)) {
        alert(`Game over! Your final score is: ${snake.length * 30}`);
        document.location.reload();
        return;
    }

    // Comer alimento y reposicionar
    if (head.x === food.x && head.y === food.y) {
        food = randomFoodPosition();
        snake.unshift(head);
    } else {
        snake.pop();
    }

    snake.unshift(head);
    refreshGameArea();
}


let score = 0;
let moveInterval = 1000;
let foodCount = 0;
let moveTimer = setInterval(moveSnake, moveInterval);

function increaseSpeed() {
    if (foodCount % 3 === 0 && moveInterval > 100) {
        clearInterval(moveTimer);
        moveInterval *= 0.9;
        moveTimer = setInterval(moveSnake, moveInterval);
    }
}

function moveSnake() {
    // Código anterior aquí
    if (head.x === food.x && head.y === food.y) {
        score += 30;
        foodCount++;
        increaseSpeed();
    }
}

    
    // Inicializar comida en una posición aleatoria al principio
    food = randomFoodPosition();


    function createGrid() {
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                const cell = document.createElement('div');
                cell.style.top = `${i * 20}px`;
                cell.style.left = `${j * 20}px`;
                cell.classList.add('cell');
                gameArea.appendChild(cell);
            }
        }
    }

    function drawSnake() {
        snake.forEach(segment => {
            const snakePart = document.createElement('div');
            snakePart.style.top = `${segment.y * 20}px`;
            snakePart.style.left = `${segment.x * 20}px`;
            snakePart.classList.add('cell', 'snake');
            gameArea.appendChild(snakePart);
        });
    }

    function drawFood() {
        const foodItem = document.createElement('div');
        foodItem.style.top = `${food.y * 20}px`;
        foodItem.style.left = `${food.x * 20}px`;
        foodItem.classList.add('cell', 'food');
        gameArea.appendChild(foodItem);
    }

    function refreshGameArea() {
        while (gameArea.firstChild) {
            gameArea.removeChild(gameArea.firstChild);
        }
        drawSnake();
        drawFood();
    }

    createGrid();
    refreshGameArea();

    // Movimiento de la serpiente
    function moveSnake() {
        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
        snake.unshift(head); // Añade la nueva cabeza al inicio de la serpiente
        snake.pop(); // Elimina el último segmento del cuerpo de la serpiente
        refreshGameArea();
    }

    setInterval(moveSnake, 1000); // Mueve la serpiente cada segundo
});












