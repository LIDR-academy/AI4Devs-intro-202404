document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const scale = 20;
    let rows, columns; // Removemos la inicialización temprana
    let snake, food; // Se agregó la definición de snake y food


    (function setup() {
        canvas.width = 600;
        canvas.height = 400;
        rows = canvas.height / scale; // Ahora se calcula después de definir el tamaño del canvas
        columns = canvas.width / scale; // Lo mismo aquí
        document.getElementById('game-container').appendChild(canvas);
        snake = new Snake();
        food = new Food();
        food.pickLocation();

        window.setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            snake.update();
            snake.draw();
            food.draw();

            if (snake.eat(food)) {
                food.pickLocation();
            }

            snake.checkCollision();
            document.querySelector('.score').innerText = snake.total;
        }, 250);
    })();

    window.addEventListener('keydown', (e) => {
        const direction = e.key.replace('Arrow', '');
        snake.changeDirection(direction);
    });

    function Snake() {
        this.x = 0;
        this.y = 0;
        this.xSpeed = scale * 1;
        this.ySpeed = 0;
        this.total = 0;
        this.tail = [];

        this.draw = function() {
            ctx.fillStyle = "#fff";
            for (let i = 0; i < this.tail.length; i++) {
                ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
            }
            ctx.fillRect(this.x, this.y, scale, scale);
        };

        this.update = function() {
            // Guardar la posición anterior de la cabeza de la serpiente
            const prevX = this.x;
            const prevY = this.y;
        
            // Actualizar la posición de la cabeza de la serpiente
            this.x += this.xSpeed;
            this.y += this.ySpeed;
        
            // Verificar colisión con las paredes del área de juego
            if (this.x >= canvas.width || this.x < 0 || this.y >= canvas.height || this.y < 0) {
                resetGame();
                return;
            }
        
            // Verificar colisión con el cuerpo de la serpiente
            for (let i = 0; i < this.tail.length; i++) {
                if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
                    resetGame();
                    return;
                }
            }
        
            // Mover el cuerpo de la serpiente
            for (let i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1];
            }
            // Actualizar la posición de la cola de la serpiente con la posición anterior de la cabeza
            if (this.total > 0) {
                this.tail[this.total - 1] = { x: prevX, y: prevY };
            }
        };
        
        this.changeDirection = function(direction) {
            switch(direction) {
                case 'Up':
                    if (this.ySpeed !== scale * 1) {
                        this.xSpeed = 0;
                        this.ySpeed = -scale * 1;
                    }
                    break;
                case 'Down':
                    if (this.ySpeed !== -scale * 1) {
                        this.xSpeed = 0;
                        this.ySpeed = scale * 1;
                    }
                    break;
                case 'Left':
                    if (this.xSpeed !== scale * 1) {
                        this.xSpeed = -scale * 1;
                        this.ySpeed = 0;
                    }
                    break;
                case 'Right':
                    if (this.xSpeed !== -scale * 1) {
                        this.xSpeed = scale * 1;
                        this.ySpeed = 0;
                    }
                    break;
            }
        };

        this.eat = function(food) {
            if (this.x === food.x && this.y === food.y) {
                this.total++;
                return true;
            }
            return false;
        };

        this.checkCollision = function() {
            // Verificar colisión con las paredes del área de juego
            if (this.x >= canvas.width || this.x < 0 || this.y >= canvas.height || this.y < 0) {
                resetGame();
                return;
            }
        
            // Verificar colisión con el cuerpo de la serpiente
            for (let i = 0; i < this.tail.length; i++) {
                if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
                    resetGame();
                    return;
                }
            }
        };
        
        function resetGame() {
            alert("Game Over! Your score: " + snake.total);
            snake.x = 0;
            snake.y = 0;
            snake.xSpeed = scale * 1;
            snake.ySpeed = 0;
            snake.tail = [];
            snake.total = 0;
            food.pickLocation();
        }
        
    }

    function Food() {
        this.x = 0;
        this.y = 0;
    
        this.pickLocation = function() {
            this.x = Math.floor(Math.random() * columns) * scale;
            this.y = Math.floor(Math.random() * rows) * scale;
        };
    
        this.draw = function() {
            ctx.fillStyle = "#f00";
            ctx.fillRect(this.x, this.y, scale, scale);
        };
    }
});
