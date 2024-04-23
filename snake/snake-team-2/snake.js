document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('gameArea');
    let snake = [{ x: 0, y: 0 }];
    const snakeElement = () => {
        const element = document.createElement('div');
        element.classList.add('snake');
        gameArea.appendChild(element);
        return element;
    };
    let snakeSegments = [snakeElement()];

    const food = document.createElement('div');
    food.classList.add('food');
    gameArea.appendChild(food);
    food.style.width = '20px';
    food.style.height = '20px';
    food.style.backgroundColor = 'red';
    food.style.position = 'absolute';
    placeFood();

    let x = 0;
    let y = 0;
    const snakeSpeed = 20;
    let direction = null;
    let gameInterval = setInterval(moveSnake, 200);

    function placeFood() {
        food.style.left = Math.floor(Math.random() * 19) * 20 + 'px';
        food.style.top = Math.floor(Math.random() * 19) * 20 + 'px';
    }

    function resetGame() {
        clearInterval(gameInterval);
        window.location.reload();
    }

    function moveSnake() {
        const head = { x: snake[0].x + x, y: snake[0].y + y };
        snake.unshift(head);
        if (head.x === parseInt(food.style.left) && head.y === parseInt(food.style.top)) {
            placeFood();
            snakeSegments.push(snakeElement());
        } else {
            snake.pop();
        }

        if (head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400 || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
            alert("Game Over!");
            resetGame();
        }

        snakeSegments.forEach((seg, index) => {
            seg.style.left = snake[index].x + 'px';
            seg.style.top = snake[index].y + 'px';
        });
    }

    document.addEventListener('keydown', event => {
        switch (event.key) {
            case 'ArrowUp': if (direction !== "DOWN") { x = 0; y = -snakeSpeed; direction = "UP"; } break;
            case 'ArrowDown': if (direction !== "UP") { x = 0; y = snakeSpeed; direction = "DOWN"; } break;
            case 'ArrowLeft': if (direction !== "RIGHT") { x = -snakeSpeed; y = 0; direction = "LEFT"; } break;
            case 'ArrowRight': if (direction !== "LEFT") { x = snakeSpeed; y = 0; direction = "RIGHT"; } break;
        }
    });
});
