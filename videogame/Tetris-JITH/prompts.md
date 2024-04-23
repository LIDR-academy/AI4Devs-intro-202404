Vamos a construir en conjunto un juego de tetris, el cual se que conoces sus reglas y funcionamiento. Para hacerlo quiero que además de lo básico, utilicemos las siguientes condiciones o validaciones:
El desarrollo debe realizarse en JavaScript, HTML y CSS
Debemos utilizar buenas prácticas al momento de codificar, entre esas comentar los métodos y separar el desarrollo en diferentes archivos que faciliten su comprensión
El tablero debes ser de 20 de alto por 10 de ancho
La velocidad inicial del juego debe ser de 0,5 espacios por segundo
La velocidad deberá aumentar en 0,2 espacios por segundo cada vez que el usuario complete una línea
El usuario moverá las fichas para acomodarlas a la izquierda o a la derecha con las flechas correspondientes del teclado
Si el usuario deja oprimida por más de un segundo la fecha inferior, la ficha debe aumentar su velocidad a 10 espacios por segundo 
Cada vez que el usuario complete una línea, se le deberán sumar 10 puntos.
El juego debe guardar los cinco puntajes máximos, para esto una vez el usuario pierda si su puntaje está dentro del top 5, deberá mostrarse un pop-up en donde se le informe que ha realizado un nuevo récord y se solicite en sus iniciales
El top 5 de puntajes debe mostrarse al usuario
Para iniciar el juego el usuario debe oprimir alguna de las flechas del teclado
El diseño del juego debe ser llamativo, incluyendo colores diferentes para cada clase de ficha 
Teniendo en cuenta lo descrito anteriormente, iniciemos el proceso de desarrollo generando un plan paso a paso de lo que vas a realizar, en donde yo te iré indicando cuándo continuar una vez haya validado tu solución.
ChatGPT
Para crear un juego de Tetris con las características y funcionalidades que has descrito, seguiremos un plan de desarrollo estructurado y ordenado. Aquí tienes un plan paso a paso que podemos seguir:

Paso 1: Estructura del Proyecto
Primero, vamos a definir la estructura de los archivos del proyecto:

index.html - Página principal que carga el juego.
styles.css - Archivo de estilos para dar formato visual al juego.
script.js - Contiene la lógica principal del juego.
tetris.js - Contiene funciones específicas para manejar las piezas y el tablero de Tetris.
Paso 2: Configuración Inicial
Configuraremos los archivos básicos:

HTML: estructura del tablero y elementos UI (puntuación, top de puntuaciones, botones).
CSS: estilos para el tablero, piezas, y elementos UI.
JavaScript: configuración inicial, como la creación del tablero y las piezas.
Paso 3: Lógica del Juego
Implementaremos la lógica del juego en múltiples partes:

Motor del Juego (tetris.js): Gestión de piezas, colisiones, y líneas completas.
Control de Usuario (script.js): Manejo de eventos del teclado para mover y rotar las piezas.
Velocidad del Juego: Incremento de velocidad conforme el juego avanza.
Puntuación y Records: Sistema de puntuación y almacenamiento de los top 5 puntajes.
Paso 4: Interfaz de Usuario
Desarrollaremos la interfaz:

Diseño de elementos visuales y estilos.
Visualización de puntajes y top 5 puntajes.
Mensajes pop-up para nuevos records.
Paso 5: Pruebas y Ajustes
Realizaremos pruebas para asegurar que el juego funciona correctamente:

Pruebas de funcionalidad: asegurarse de que todas las piezas se comporten como se espera.
Pruebas de interfaz: comprobar la visualización correcta en diferentes dispositivos.
Paso 6: Documentación y Comentarios
Añadiremos comentarios detallados en el código y escribiremos documentación donde sea necesario para explicar las funciones y la estructura del código.

Paso 7: Despliegue
Prepararemos el juego para ser accesible desde un servidor o localmente en un navegador web.

¿Te parece bien este plan? Si estás de acuerdo o tienes alguna modificación que sugerir, podemos proceder con el primer paso.

User
estoy de acuerdo, iniciemos con el primer paso
ChatGPT
Perfecto, vamos a comenzar con el primer paso: establecer la estructura del proyecto y configurar los archivos básicos. Aquí te detallo cómo organizar y empezar cada uno de estos archivos:

1. Creación de archivos
Crea una carpeta para tu proyecto y dentro de ella, crea los siguientes archivos:

index.html
styles.css
script.js
tetris.js
2. Estructura del archivo index.html
En el archivo index.html, incluiremos la estructura básica del HTML junto con las referencias a los archivos CSS y JavaScript. El HTML contendrá el tablero de Tetris, la área para mostrar la puntuación y el top de puntajes. Aquí tienes un ejemplo de cómo podría verse:

html
Copy code
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tetris</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="game-container">
        <canvas id="tetris-board" width="300" height="600"></canvas>
        <div id="sidebar">
            <div id="score">Puntuación: 0</div>
            <div id="top-scores">Top Puntuaciones:</div>
        </div>
    </div>
    <script src="script.js"></script>
    <script src="tetris.js"></script>
</body>
</html>
3. Configuración inicial de styles.css
A continuación, configura los estilos básicos para el tablero y otros elementos. Puedes personalizar estos estilos más tarde según tus preferencias de diseño:

css
Copy code
body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
    font-family: Arial, sans-serif;
}

#game-container {
    display: flex;
    align-items: start;
    gap: 20px;
}

#tetris-board {
    border: 4px solid #333;
    background-color: #000;
}

#sidebar {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

#score, #top-scores {
    background-color: white;
    padding: 10px;
    border: 1px solid #ccc;
}
4. Inicio básico en script.js
Por último, asegúrate de que los archivos JavaScript están listos para trabajar. Por ahora, puedes dejarlos vacíos o solo inicializar el tablero de Tetris.

javascript
Copy code
document.addEventListener('DOMContentLoaded', function() {
    console.log('Tetris cargado correctamente');
});
Con esta estructura básica en su lugar, podrás comenzar a trabajar en la lógica y funcionalidades adicionales del juego en los siguientes pasos. ¿Todo listo para seguir al próximo paso?

User
Si continua con el siguiente paso
ChatGPT
Excelente, ahora que tenemos la estructura básica y los archivos listos, procederemos con el segundo paso: configurar el tablero de Tetris y la visualización inicial en HTML y JavaScript.

Configuración del Tablero de Tetris
Vamos a configurar el tablero de Tetris, que es una matriz de 20 filas por 10 columnas. Cada celda de la matriz representará un espacio en el tablero del juego. Además, necesitaremos inicializar las piezas y gestionar la creación y manipulación de estas en tetris.js.

1. Configuración del Tablero en tetris.js
Añadiremos funciones básicas en tetris.js para inicializar el tablero y dibujarlo usando el elemento <canvas>:

javascript
Copy code
const canvas = document.getElementById('tetris-board');
const context = canvas.getContext('2d');

const row = 20;
const col = 10;
const sq = 30; // Tamaño de cada cuadrado
const vacant = 'white'; // Color de cuadrado vacío

// Dibujar un cuadrado
function drawSquare(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * sq, y * sq, sq, sq);
    context.strokeStyle = 'black';
    context.strokeRect(x * sq, y * sq, sq, sq);
}

// Crear el tablero
let board = [];
for (let r = 0; r < row; r++) {
    board[r] = [];
    for (let c = 0; c < col; c++) {
        board[r][c] = vacant;
    }
}

// Dibujar el tablero
function drawBoard() {
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
            drawSquare(c, r, board[r][c]);
        }
    }
}

drawBoard();
2. Integración en script.js
Asegúrate de que el tablero se dibuja cuando la página se carga. Agrega el llamado a drawBoard() en script.js para asegurarte de que el tablero se inicializa correctamente al cargar la página.

javascript
Copy code
document.addEventListener('DOMContentLoaded', function() {
    drawBoard();
});
Con esto, tenemos un tablero de Tetris básico visible en la página, donde cada espacio del tablero se inicializa en blanco y se dibuja usando el elemento <canvas>.

Próximos Pasos
Antes de avanzar, asegúrate de que el tablero se visualiza correctamente en la página web. Puedes ajustar el tamaño de cada cuadrado y los colores según tus preferencias.

Si todo funciona según lo esperado, el siguiente paso será implementar la lógica para manejar las piezas de Tetris, incluyendo la creación de diferentes formas, la rotación de las piezas, y la detección de colisiones.

¿Todo está funcionando correctamente y estás listo para continuar con la gestión de las piezas y la lógica del juego?

User
El tablero se visualiza de forma correcta, continuemos con la gestión de las piezas y la lógica del juego.
ChatGPT
Perfecto, ahora que tenemos el tablero funcionando, vamos a avanzar con la gestión de las piezas y la lógica principal del juego en Tetris. Esto incluirá definir las diferentes piezas (formas y colores), manejar la rotación, movimiento y la caída de las piezas, y la detección de colisiones.

Paso 3: Piezas de Tetris
Definición de Piezas
En Tetris, cada pieza es un arreglo de cuadrados. Definiremos las formas de las piezas y sus colores correspondientes.

1. Definición de Formas y Colores en tetris.js
Vamos a definir las piezas como matrices y asignarles un color:

javascript
Copy code
const PIECES = [
    [Z, "red"],
    [S, "green"],
    [T, "yellow"],
    [O, "blue"],
    [L, "purple"],
    [I, "cyan"],
    [J, "orange"]
];

// Formas de las piezas
const Z = [
    [[1, 1, 0],
     [0, 1, 1],
     [0, 0, 0]],
    // otras rotaciones de Z
];

// Continúa definiendo S, T, O, L, I, J con sus matrices...

function randomPiece() {
    let r = Math.floor(Math.random() * PIECES.length);
    return new Piece(PIECES[r][0], PIECES[r][1]);
}

// Clase para manejar las piezas
class Piece {
    constructor(tetromino, color) {
        this.tetromino = tetromino;
        this.color = color;

        this.tetrominoN = 0; // Índice de la rotación actual
        this.activeTetromino = this.tetromino[this.tetrominoN];
        
        this.x = 3;
        this.y = -2;
    }

    draw() {
        for (let r = 0; r < this.activeTetromino.length; r++) {
            for (let c = 0; c < this.activeTetromino[r].length; c++) {
                if (this.activeTetromino[r][c]) {
                    drawSquare(this.x + c, this.y + r, this.color);
                }
            }
        }
    }
}
2. Movimiento y Rotación de las Piezas
Control del Movimiento
Implementaremos funciones para mover las piezas hacia abajo, a la izquierda, a la derecha y para rotarlas:

javascript
Copy code
Piece.prototype.moveDown = function() {
    if (!this.collision(0, 1, this.activeTetromino)) {
        this.unDraw();
        this.y++;
        this.draw();
    }
};

Piece.prototype.moveRight = function() {
    if (!this.collision(1, 0, this.activeTetromino)) {
        this.unDraw();
        this.x++;
        this.draw();
    }
};

Piece.prototype.moveLeft = function() {
    if (!this.collision(-1, 0, this.activeTetromino)) {
        this.unDraw();
        this.x--;
        this.draw();
    }
};

Piece.prototype.rotate = function() {
    let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
    if (!this.collision(0, 0, nextPattern)) {
        this.unDraw();
        this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.draw();
    }
};
3. Detección de Colisiones
Para manejar las colisiones, añadiremos una función que revise si la posición a la que se mueve o rota la pieza está ocupada o fuera de los límites del tablero:

javascript
Copy code
Piece.prototype.collision = function(x, y, piece) {
    for (let r = 0; r < piece.length; r++) {
        for (let c = 0; c < piece[r].length; c++) {
            if (!piece[r][c]) continue;

            let newX = this.x + c + x;
            let newY = this.y + r + y;

            if (newX < 0 || newX >= col || newY >= row) return true;
            if (newY < 0) continue; // ignora si está por encima del tablero
            if (board[newY][newX] != vacant) return true;
        }
    }
    return false;
};
Con estas definiciones y funciones, tenemos una buena base para la lógica de las piezas en Tetris. Podemos probar estas implementaciones agregando controles del teclado y un bucle de juego para mover automáticamente las piezas hacia abajo.

¿Listo para implementar el control de usuario y el ciclo de juego?

User
Si, continua
ChatGPT
Perfecto, ahora vamos a implementar el control del usuario y el ciclo de juego en Tetris. Esta parte del desarrollo se enfoca en permitir al usuario interactuar con el juego a través del teclado y gestionar la caída automática de las piezas.

Control del Usuario
Primero, implementaremos la capacidad para manejar eventos de teclado, permitiendo al usuario mover las piezas hacia la izquierda, derecha, abajo, y rotarlas. También gestionaremos el caso especial de la aceleración cuando la tecla de abajo se mantiene presionada.

Implementación en script.js
Agregaremos el manejo de eventos de teclado:

javascript
Copy code
document.addEventListener('keydown', function(event) {
    if(event.keyCode === 37) {
        // Flecha izquierda
        p.moveLeft();
        dropStart = Date.now();
    } else if(event.keyCode === 38) {
        // Flecha arriba, rotar
        p.rotate();
        dropStart = Date.now();
    } else if(event.keyCode === 39) {
        // Flecha derecha
        p.moveRight();
        dropStart = Date.now();
    } else if(event.keyCode === 40) {
        // Mantener presionado para acelerar la caída
        p.moveDown();
    }
});

// Evento para manejar la aceleración rápida
let dropStart = Date.now();
let defaultDropSpeed = 1000;  // 1 segundo por movimiento hacia abajo
let quickDropSpeed = 100;    // 0.1 segundos por movimiento hacia abajo cuando se mantiene presionado

document.addEventListener('keydown', function(event) {
    if(event.keyCode === 40) {
        defaultDropSpeed = quickDropSpeed;
    }
});

document.addEventListener('keyup', function(event) {
    if(event.keyCode === 40) {
        defaultDropSpeed = 1000; // Volver a la velocidad normal
    }
});
Ciclo del Juego
Para mantener el juego en movimiento, implementaremos un ciclo que actualice el estado del juego automáticamente. Este ciclo controlará la caída de las piezas y actualizará el juego a una velocidad que se incrementa como mencionaste en la especificación.

Implementación del Ciclo en script.js
javascript
Copy code
function drop() {
    let now = Date.now();
    let delta = now - dropStart;
    if(delta > defaultDropSpeed) {
        p.moveDown();
        dropStart = Date.now();
    }
    if (!gameOver) {
        requestAnimationFrame(drop);
    }
}

drop();  // Inicia el ciclo del juego
Inicializar el Juego
Finalmente, asegurémonos de que el juego inicia con una pieza en juego y el tablero dibujado:

javascript
Copy code
let p = randomPiece(); // Crea una pieza al azar al iniciar el juego
drawBoard(); // Dibuja el tablero inicial
drop(); // Inicia el ciclo de caída de las piezas
Con estos pasos, el juego debería permitir a los usuarios mover y rotar las piezas, y las piezas deberían caer automáticamente a un ritmo que se puede acelerar. Este es el núcleo de la jugabilidad de Tetris.

¿Está todo funcionando como se espera y estás listo para avanzar a la gestión de líneas completas y puntuación?

User
No esta funcionando de forma correcta, genera este error: Uncaught ReferenceError: gameOver is not defined
    at drop (script.js:52:5)
    at script.js:57:1 
Y
tetris.js:38 Uncaught ReferenceError: Cannot access 'Z' before initialization
    at tetris.js:38:6
ChatGPT
Vamos a resolver los problemas que mencionaste uno por uno para que el juego funcione correctamente.

Problema 1: Referencia a gameOver no definida
Este error ocurre porque estamos usando la variable gameOver en la función drop() pero no la hemos definido. Para solucionarlo, debemos inicializar gameOver al comienzo del script.

Solución:
En script.js, añade la siguiente línea al comienzo del archivo:

javascript
Copy code
let gameOver = false;
Esta variable controlará si el juego debe continuar o si ha terminado porque las piezas han alcanzado el tope del tablero.

Problema 2: Error con la variable Z no inicializada
El error ocurre porque estamos intentando usar la constante Z antes de que esté completamente definida. Esto puede ser solucionado asegurando que todas las formas de las piezas estén definidas antes de ser usadas en la lista de piezas PIECES.

Solución:
En tetris.js, asegúrate de definir completamente todas las formas de las piezas antes de usarlas en el arreglo PIECES. Aquí te muestro cómo puedes hacerlo para la pieza Z y deberás hacer algo similar para las demás (S, T, O, L, I, J):

javascript
Copy code
// Formas de la pieza Z
const Z = [
    [[1, 1, 0],
     [0, 1, 1],
     [0, 0, 0]],
    // Otras rotaciones de Z
    [[0, 0, 1],
     [0, 1, 1],
     [0, 1, 0]]
];

// Formas de la pieza S, y así sucesivamente...
const S = [
    [[0, 1, 1],
     [1, 1, 0],
     [0, 0, 0]],
    // Otras rotaciones de S
    [[0, 1, 0],
     [0, 1, 1],
     [0, 0, 1]]
];

// Asegúrate de definir todas las formas antes de usar esta línea:
const PIECES = [
    [Z, "red"],
    [S, "green"],
    [T, "yellow"],
    [O, "blue"],
    [L, "purple"],
    [I, "cyan"],
    [J, "orange"]
];
Una vez que hayas definido todas las piezas correctamente y hayas inicializado la variable gameOver, el juego debería comenzar a funcionar sin estos errores. Asegúrate de cargar nuevamente la página y probar el juego.

¿Están ahora resueltos los problemas y el juego se ejecuta correctamente?

User
Por favor genera todas las piezas, sus formas y rotaciones
ChatGPT
Claro, vamos a definir todas las piezas de Tetris junto con sus diferentes rotaciones. Cada pieza tendrá varias matrices que representan sus posibles rotaciones. A continuación, defino cada una de las siete piezas típicas de Tetris (I, J, L, O, S, T, Z) con sus rotaciones:

Pieza I
javascript
Copy code
const I = [
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
    ]
];
Pieza J
javascript
Copy code
const J = [
    [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0]
    ]
];
Pieza L
javascript
Copy code
const L = [
    [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0]
    ],
    [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
    ]
];
Pieza O
javascript
Copy code
const O = [
    [
        [1, 1],
        [1, 1]
    ]
];
Pieza S
javascript
Copy code
const S = [
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1]
    ]
];
Pieza T
javascript
Copy code
const T = [
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
    ],
    [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0]
    ]
];
Pieza Z
javascript
Copy code
const Z = [
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0]
    ]
];
Estas son las matrices para cada tipo de pieza en Tetris con sus rotaciones. Ahora puedes usarlas para inicializar y manipular las piezas dentro del juego, como se muestra en las secciones anteriores sobre la creación y manejo de piezas. Estas definiciones te permitirán crear una nueva pieza aleatoria y manejar su comportamiento dentro del tablero.

User
Se ha generado el error script.js:61 Uncaught ReferenceError: randomPiece is not defined
ChatGPT
El error que mencionas indica que la función randomPiece no está definida en el momento en que se intenta usar en script.js. Esto generalmente ocurre porque la función no ha sido correctamente declarada o no está disponible debido al orden en que se cargan los scripts.

Para solucionar este problema, debemos asegurarnos de dos cosas:

Declaración de randomPiece: Verificar que la función randomPiece esté correctamente definida en tetris.js y que esté accesible globalmente.
Orden de carga de scripts: Asegurarse de que tetris.js se carga antes de script.js en index.html para que todas las definiciones y funciones estén disponibles cuando script.js las necesite.
Paso 1: Verificar la declaración de randomPiece
Primero, asegúrate de que la función randomPiece está definida en el archivo tetris.js. La función debería verse algo como esto, usando las definiciones de piezas que hemos establecido:

javascript
Copy code
// Asumiendo que las piezas están definidas como constantes en el mismo archivo o importadas correctamente
const PIECES = [
    [I, "cyan"],
    [J, "blue"],
    [L, "orange"],
    [O, "yellow"],
    [S, "green"],
    [T, "purple"],
    [Z, "red"]
];

function randomPiece() {
    let r = Math.floor(Math.random() * PIECES.length);
    return new Piece(PIECES[r][0], PIECES[r][1]);
}
Paso 2: Verificar el orden de carga en index.html
Luego, revisa index.html para asegurarte de que tetris.js está cargado antes de script.js. Esto garantiza que todas las definiciones y funciones del primero estén disponibles en el segundo. El orden en el HTML debería ser:

html
Copy code
<script src="tetris.js"></script>
<script src="script.js"></script>
Paso 3: Crear una nueva instancia de la pieza
En script.js, deberás crear una nueva pieza al cargar la página y cada vez que una pieza se fije en el tablero. Asegúrate de hacer esto dentro de un evento DOMContentLoaded o después de que la página se haya cargado completamente:

javascript
Copy code
let p;

document.addEventListener('DOMContentLoaded', function() {
    p = randomPiece(); // Crea una nueva pieza al cargar la página
    drawBoard();
    drop(); // Inicia el ciclo de caída de las piezas
});
Verifica que estos cambios estén implementados y que no haya errores de sintaxis o de referencia cruzada en tus scripts. Una vez hecho esto, recarga la página para ver si el error ha sido resuelto. ¿Funciona ahora correctamente el juego?

User
No, se generó este error tetris.js:190 Uncaught TypeError: this.unDraw is not a function
    at Piece.moveDown (tetris.js:190:14)
    at drop (script.js:51:11)
ChatGPT
El error que estás experimentando indica que se está intentando llamar a una función unDraw() que no ha sido definida en la clase Piece. La función unDraw() es necesaria para borrar la representación visual de una pieza en el tablero antes de moverla o rotarla. Esto evita dejar trazas de la pieza en su posición anterior.

Para corregir este error, necesitas definir la función unDraw() dentro de la clase Piece. La función debería hacer lo contrario de lo que hace draw(), es decir, pintar los cuadrados correspondientes al color de fondo o "vacío".

Paso 1: Definir la función unDraw
Añade el método unDraw a la clase Piece en tetris.js. Este método limpiará el área que la pieza ocupaba antes de ser movida o rotada:

javascript
Copy code
Piece.prototype.unDraw = function() {
    for (let r = 0; r < this.activeTetromino.length; r++) {
        for (let c = 0; c < this.activeTetromino[r].length; c++) {
            if (this.activeTetromino[r][c]) {
                // Dibuja el cuadrado como 'vacant' en la posición actual antes de moverse
                drawSquare(this.x + c, this.y + r, vacant);
            }
        }
    }
};
Paso 2: Asegurarte de que draw() y unDraw() son utilizados correctamente
Verifica que las funciones moveDown(), moveRight(), moveLeft() y rotate() usen unDraw() antes de cambiar la posición de la pieza y luego usen draw() para redibujarla en su nueva posición. Aquí hay un ejemplo de cómo podría implementarse moveDown():

javascript
Copy code
Piece.prototype.moveDown = function() {
    if (!this.collision(0, 1, this.activeTetromino)) {
        this.unDraw();
        this.y++;
        this.draw();
    } else {
        // Aquí se manejaría el bloqueo de la pieza y la creación de una nueva pieza si es necesario
        lockPiece();
        p = randomPiece();
    }
};
Asegúrate de que las funciones collision(), lockPiece(), y la lógica de juego relacionada estén implementadas adecuadamente para manejar cuando una pieza llega al fondo del tablero o toca otra pieza.

Paso 3: Probar el juego nuevamente
Con estos cambios, deberías ser capaz de mover las piezas sin errores relacionados con funciones no definidas. Reinicia tu juego y verifica que las piezas se muevan correctamente y que las funciones de borrado y dibujado estén funcionando como se espera.

Estos pasos deberían resolver el error de la función no definida y mejorar la funcionalidad del movimiento de las piezas. ¿Está funcionando ahora correctamente el juego?

User
El juego carga de forma correcta el tablero y genera una pieza inicial de forma aleatoria que se mueve y rota según lo establecido.  Sin embargo, al llegar esta pieza al final del tablero aún es posible moverla de forma horizontal y nos genera una nueva pieza.
ChatGPT
¡Eso suena como un progreso significativo! Para abordar el problema que describes, donde las piezas aún pueden moverse horizontalmente después de haber alcanzado el fondo del tablero, y para gestionar correctamente el bloqueo de una pieza y la generación de una nueva, necesitaremos revisar y ajustar la función que maneja la colisión y el bloqueo de las piezas. Vamos a establecer claramente estas funciones para que la pieza se bloquee en su lugar cuando llegue al fondo o toque otra pieza, y se genere una nueva pieza solo en ese momento.

Paso 1: Asegurar el bloqueo adecuado de la pieza
Primero, necesitamos asegurarnos de que, cuando la pieza no pueda moverse hacia abajo, esta se bloquea en su lugar y se genera una nueva pieza. Aquí es donde la función lockPiece() entra en juego. Asegúrate de que esta función está bien definida:

javascript
Copy code
Piece.prototype.lock = function() {
    for (let r = 0; r < this.activeTetromino.length; r++) {
        for (let c = 0; c < this.activeTetromino[r].length; c++) {
            // Saltamos los cuadrados vacíos
            if (!this.activeTetromino[r][c]) continue;

            // Piezas para bloquear en la parte superior = fin del juego
            if (this.y + r < 0) {
                alert("Game Over");
                // Detén el requestAnimationFrame
                gameOver = true;
                break;
            }
            // Bloqueamos la pieza
            board[this.y + r][this.x + c] = this.color;
        }
    }

    // Verificar si hemos llenado alguna fila
    for (let r = 0; r < ROW; r++) {
        let isRowFull = true;
        for (let c = 0; c < COL; c++) {
            isRowFull = isRowFull && (board[r][c] != vacant);
        }
        if (isRowFull) {
            // Si la fila está completa, la movemos abajo
            for (let y = r; y > 1; y--) {
                for (let c = 0; c < COL; c++) {
                    board[y][c] = board[y-1][c];
                }
            }
            // La fila superior no tiene fila arriba, entonces se pinta vacía
            for (let c = 0; c < COL; c++) board[0][c] = vacant;
        }
    }
    // Actualizar el tablero
    drawBoard();
};
Paso 2: Ajustar la función moveDown()
Asegúrate de que la función moveDown() incluye un llamado a lock() cuando la pieza colisiona y no puede moverse más hacia abajo:

javascript
Copy code
Piece.prototype.moveDown = function() {
    if (!this.collision(0, 1, this.activeTetromino)) {
        this.unDraw();
        this.y++;
        this.draw();
    } else {
        // Llama a lock cuando la pieza toca el fondo o otra pieza
        this.lock();
        p = randomPiece();
    }
};
Paso 3: Revisar la función collision()
Asegúrate de que la función collision() está correctamente definida para detectar colisiones tanto con el fondo del tablero como con otras piezas:

javascript
Copy code
Piece.prototype.collision = function(x, y, piece) {
    for (let r = 0; r < piece.length; r++) {
        for (let c = 0; c < piece[r].length; c++) {
            // Si el cuadrado está vacío, lo ignoramos
            if (!piece[r][c]) continue;

            // Coordenadas de la pieza después del movimiento
            let newX = this.x + c + x;
            let newY = this.y + r + y;

            // Condiciones de colisión
            if (newX < 0 || newX >= COL || newY >= ROW) return true;
            if (newY < 0) continue;  // Ignorar si está por encima del tablero
            if (board[newY][newX] != vacant) return true;
        }
    }
    return false;
};
Con estos ajustes, las piezas deberían bloquearse correctamente al alcanzar el fondo del tablero o al colisionar con otras piezas, y no deberías poder moverlas horizontalmente una vez bloqueadas. Pruébalo y verifica si el comportamiento ahora es el esperado. ¿Funciona todo correctamente ahora?

User
Esta funcionando de forma correcta, continuemos con la gestión de líneas completas y puntuación?
ChatGPT
Fantástico que el juego esté funcionando correctamente hasta ahora. Ahora, vamos a proceder con la gestión de líneas completas y la implementación del sistema de puntuación.

Paso 1: Gestión de Líneas Completas
Necesitaremos una función que revise cada línea del tablero para determinar si está completa (es decir, si no contiene ningún espacio vacío). Si una línea está completa, debemos eliminarla y desplazar todas las líneas superiores hacia abajo. Además, cada vez que una línea se completa, deberíamos incrementar la puntuación del jugador.

Añadir Gestión de Líneas en Piece.prototype.lock
Vamos a extender la función lock() para incluir la lógica de eliminación de líneas completas y el manejo de puntuación:

javascript
Copy code
Piece.prototype.lock = function() {
    for (let r = 0; r < this.activeTetromino.length; r++) {
        for (let c = 0; c < this.activeTetromino[r].length; c++) {
            // Ignoramos los cuadros vacíos
            if (!this.activeTetromino[r][c]) continue;

            // Si la pieza se bloquea fuera del tablero, es Game Over
            if (this.y + r < 0) {
                alert("Game Over");
                // Detener el juego
                gameOver = true;
                return;
            }
            board[this.y + r][this.x + c] = this.color;
        }
    }

    // Eliminar líneas completas y aumentar puntuación
    let linesCleared = 0;
    for (let r = 0; r < row; r++) {
        let isRowFull = true;
        for (let c = 0; c < col; c++) {
            isRowFull = isRowFull && (board[r][c] != vacant);
        }
        if (isRowFull) {
            // Si la fila está completa, eliminamos la fila y desplazamos hacia abajo
            for (let y = r; y > 1; y--) {
                for (let c = 0; c < col; c++) {
                    board[y][c] = board[y-1][c];
                }
            }
            // La fila más superior no tiene una fila arriba, entonces la pintamos de vacío
            for (let c = 0; c < col; c++) board[0][c] = vacant;

            // Cada línea completada incrementa la cuenta
            linesCleared++;
        }
    }

    // Actualizar puntuación
    if (linesCleared > 0) {
        updateScore(linesCleared);
    }

    // Redibujar el tablero
    drawBoard();
};
Paso 2: Implementación del Sistema de Puntuación
Necesitas una función para actualizar la puntuación basada en el número de líneas completadas. Puedes aumentar la puntuación en 10 puntos por cada línea, por ejemplo.

javascript
Copy code
let score = 0;

function updateScore(linesCleared) {
    score += linesCleared * 10;  // 10 puntos por línea
    document.getElementById('score').innerText = 'Puntuación: ' + score;

    // Aumentar la velocidad del juego por cada línea completada
    defaultDropSpeed = Math.max(100, defaultDropSpeed - 20 * linesCleared);
}
Paso 3: Visualización de la Puntuación
Asegúrate de que en tu index.html haya un elemento para mostrar la puntuación:

html
Copy code
<div id="score">Puntuación: 0</div>
Con estas modificaciones, el juego debería ahora poder gestionar correctamente las líneas completas, actualizar la puntuación, y aumentar la velocidad del juego como un factor adicional de dificultad por cada línea completada.

Estas modificaciones completan la gestión de líneas completas y el sistema de puntuación. ¿Todo está funcionando bien y estás listo para seguir con la implementación del almacenamiento de los puntajes altos?

User
Todo funciona de forma correcta, continuemos con el almacenamiento de los puntajes
ChatGPT
Estupendo, ahora vamos a implementar el almacenamiento y la visualización de los puntajes más altos en tu juego de Tetris. Para esto, usaremos el almacenamiento local del navegador, que permite guardar datos que permanecen incluso después de cerrar el navegador.

Paso 1: Guardar y Recuperar Puntajes Altos
Primero, necesitamos escribir funciones para guardar y recuperar los puntajes altos del almacenamiento local.

Funciones para manejar el almacenamiento local
javascript
Copy code
function getHighScores() {
    const scores = localStorage.getItem('highScores');
    return scores ? JSON.parse(scores) : [];
}

function saveHighScore(score) {
    const highScores = getHighScores();
    highScores.push(score);
    highScores.sort((a, b) => b - a);
    highScores.splice(5); // Mantener solo los top 5
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

function showHighScores() {
    const highScores = getHighScores();
    const highScoreList = document.getElementById('top-scores');
    highScoreList.innerHTML = 'Top Puntuaciones:<br>' + highScores.map(score => `${score}`).join('<br>');
}
Integración en el HTML
Asegúrate de que tienes un elemento en tu HTML para mostrar los puntajes altos:

html
Copy code
<div id="top-scores">Top Puntuaciones:</div>
Paso 2: Actualizar el Juego para Usar las Nuevas Funciones
Guardar un Nuevo Puntaje Alto
Cuando el juego termina y es un nuevo puntaje alto, debemos pedirle al usuario sus iniciales y guardar el puntaje. Modifica la parte del código donde el juego termina, por ejemplo en tu función de bloqueo de piezas o donde detectas que el juego debe terminar:

javascript
Copy code
if (gameOver) {
    const currentScore = score;
    const highScores = getHighScores();
    if (highScores.length < 5 || currentScore > highScores[4]) {
        const initials = prompt('Nuevo récord! Ingresa tus iniciales:');
        if (initials) {
            saveHighScore({ score: currentScore, initials });
            showHighScores();
        }
    }
    alert('Game Over. Tu puntuación fue: ' + currentScore);
    document.location.reload(); // Opcional: reiniciar el juego
}
Paso 3: Mostrar Puntajes Altos al Iniciar
Para que los puntajes altos se muestren cuando se carga la página, debemos asegurarnos de llamar a showHighScores() al cargar el documento:

javascript
Copy code
document.addEventListener('DOMContentLoaded', function() {
    showHighScores();
    // Inicialización del juego, etc.
});
Con estas adiciones, tu juego ahora debería ser capaz de almacenar y mostrar los puntajes más altos, dando a los jugadores un incentivo adicional para mejorar su juego. ¿Todo está claro y funcionando como esperabas?

User
El top de puntuaciones no se está mostrando bien, lo muestra como [object Object]
ChatGPT
El problema que estás experimentando ocurre porque estás tratando de mostrar un objeto directamente como texto, lo que en JavaScript resulta en la cadena "[object Object]". Esto sucede cuando intentas convertir un objeto a string sin especificar qué propiedad del objeto deseas mostrar. Para corregir esto, necesitamos asegurarnos de mostrar adecuadamente tanto las iniciales como el puntaje del jugador.

Modificar la función showHighScores
Vamos a ajustar la función showHighScores para que muestre tanto las iniciales del jugador como su puntaje, formateando correctamente cada entrada del array de puntajes altos:

javascript
Copy code
function showHighScores() {
    const highScores = getHighScores();
    const highScoreList = document.getElementById('top-scores');
    // Aseguramos que cada entrada sea mostrada como "Iniciales - Puntaje"
    highScoreList.innerHTML = 'Top Puntuaciones:<br>' + highScores.map(score => `${score.initials} - ${score.score}`).join('<br>');
}
Esta modificación asegura que cada objeto de puntajes altos sea convertido en una cadena de texto que contiene las iniciales del jugador y su puntaje, separados por un guion.

Verificar la estructura de los datos almacenados
Asegúrate también de que cuando guardas los puntajes altos, estés guardando efectivamente un objeto con las propiedades initials y score. Si no lo has hecho así, aquí te muestro cómo debería ser la función saveHighScore:

javascript
Copy code
function saveHighScore(newScore) {
    const highScores = getHighScores();
    highScores.push(newScore); // Asegúrate de que newScore es un objeto { initials, score }
    highScores.sort((a, b) => b.score - a.score); // Ordenar basado en la propiedad 'score'
    highScores.splice(5); // Mantener solo los top 5 puntajes
    localStorage.setItem('highScores', JSON.stringify(highScores));
}
Probar los cambios
Después de hacer estos cambios, deberías probar el juego para asegurarte de que cuando un nuevo puntaje alto es guardado y mostrado, se visualice correctamente en el formato "Iniciales - Puntaje". Esto debería resolver el problema de visualización que estabas experimentando.

¿Funciona ahora correctamente la visualización del top de puntajes?

User
No, sigue mostrandose de la misma forma
ChatGPT
Para abordar el problema de que los puntajes sigan mostrándose como [object Object], vamos a revisar dos cosas principales:

La estructura de los datos que se están guardando en el almacenamiento local. Necesitamos asegurarnos de que efectivamente se esté guardando un objeto con las propiedades initials y score.
La forma en que estos datos se recuperan y se muestran. Debemos verificar si realmente estamos accediendo a las propiedades correctas al mostrar los puntajes.
Paso 1: Revisar la estructura de los datos al guardar
Primero, verifica cómo estás llamando a saveHighScore() cuando se registra un nuevo récord. Asegúrate de que estás pasando un objeto con las propiedades adecuadas. Aquí te muestro cómo debería verse cuando obtienes las iniciales y guardas el puntaje:

javascript
Copy code
if (gameOver) {
    const currentScore = score;
    const highScores = getHighScores();
    if (highScores.length < 5 || currentScore > (highScores[4].score || 0)) {
        const initials = prompt('Nuevo récord! Ingresa tus iniciales:');
        if (initials) {
            const newScore = { initials: initials, score: currentScore };
            saveHighScore(newScore);
            showHighScores();
        }
    }
    alert('Game Over. Tu puntuación fue: ' + currentScore);
    document.location.reload(); // Opcional: reiniciar el juego
}
Paso 2: Verificar la estructura del objeto al recuperar y mostrar los puntajes
Verifica cómo estás implementando getHighScores() y asegúrate de que la función showHighScores() esté usando correctamente las propiedades del objeto almacenado. Aquí te repito cómo debería implementarse showHighScores() para asegurarte de que esté accediendo correctamente a las propiedades initials y score:

javascript
Copy code
function showHighScores() {
    const highScores = getHighScores();
    const highScoreList = document.getElementById('top-scores');
    // Verificamos que se muestre "Iniciales - Puntaje"
    highScoreList.innerHTML = 'Top Puntuaciones:<br>' + highScores.map(score => `${score.initials} - ${score.score}`).join('<br>');
}
Paso 3: Limpiar y reinicializar los datos de prueba
Si has estado probando con datos que no estaban correctamente estructurados (p. ej., si inicialmente los puntajes se guardaron de una forma diferente), podrías necesitar limpiar el almacenamiento local para eliminar datos corruptos o mal formateados:

javascript
Copy code
localStorage.removeItem('highScores'); // Ejecutar esto en la consola del navegador
Luego, reinicia el juego y prueba obtener nuevos puntajes para ver si ahora se muestran correctamente.

Aplica estos pasos y verifica si los puntajes ahora se muestran correctamente como "Iniciales - Puntaje". ¿Los cambios han resuelto el problema?

User
No aun se sigue mostrando [object Object]
ChatGPT
Lamento que sigas teniendo problemas. Vamos a realizar una revisión completa de las funciones para asegurarnos de que estén correctamente configuradas y que los datos se estén manejando adecuadamente. Voy a proporcionarte un ejemplo detallado de cómo deberían definirse y utilizarse todas las funciones relacionadas con el almacenamiento y la visualización de los puntajes altos.

1. Definir las funciones para manejar los puntajes altos:
Primero, asegúrate de que la función saveHighScore esté estructurada de tal manera que guarde correctamente los objetos con las propiedades initials y score, y que getHighScores recupere y devuelva estos objetos adecuadamente:

javascript
Copy code
function getHighScores() {
    const scores = localStorage.getItem('highScores');
    return scores ? JSON.parse(scores) : [];
}

function saveHighScore(newScore) {
    const highScores = getHighScores();
    highScores.push(newScore); // Asegurarse de que newScore es un objeto { initials, score }
    highScores.sort((a, b) => b.score - a.score); // Ordenar basado en la propiedad 'score'
    highScores.splice(5); // Mantener solo los top 5 puntajes
    localStorage.setItem('highScores', JSON.stringify(highScores));
}
2. Modificar la visualización de los puntajes:
Aquí, asegurémonos de que la función showHighScores utilice correctamente las propiedades initials y score al mostrar los puntajes. Esta es una clave importante, ya que el error de visualización sugiere que los objetos no se están accediendo correctamente:

javascript
Copy code
function showHighScores() {
    const highScores = getHighScores();
    const highScoreList = document.getElementById('top-scores');
    highScoreList.innerHTML = 'Top Puntuaciones:<br>' + highScores.map(score => `${score.initials} - ${score.score}`).join('<br>');
}
3. Comprobar la integración en el flujo del juego:
Asegúrate de que cuando guardas un nuevo puntaje alto, estás pasando correctamente un objeto con las propiedades initials y score. Por ejemplo:

javascript
Copy code
if (gameOver) {
    const currentScore = score;
    const highScores = getHighScores();
    if (highScores.length < 5 || currentScore > (highScores[4]?.score || 0)) {
        const initials = prompt('Nuevo récord! Ingresa tus iniciales:');
        if (initials) {
            saveHighScore({ initials: initials, score: currentScore });
            showHighScores();
        }
    }
    alert('Game Over. Tu puntuación fue: ' + currentScore);
    // Reiniciar el juego o manejar el fin del juego
}
4. Probar todo junto:
Después de implementar estos cambios, es vital probar el flujo completo desde el inicio hasta el final del juego para asegurarse de que los puntajes se manejan y muestran correctamente.

5. Limpieza de Datos:
Si aún encuentras problemas, puede ser útil limpiar tus datos de prueba del almacenamiento local para evitar conflictos con datos mal formados:

javascript
Copy code
localStorage.removeItem('highScores'); // Ejecutar esto en la consola del navegador
Luego, realiza pruebas adicionales para asegurarte de que todo funciona como se espera.

Siguiendo estos pasos, espero que puedas resolver el problema. ¿Se muestra ahora correctamente la información de los puntajes?

User
Uploaded image
No, se sigue mostrando de esta manera
ChatGPT
La imagen que has subido muestra que los puntajes altos se están mostrando incorrectamente como [object Object]. Esto suele ocurrir cuando se intenta convertir un objeto JavaScript a cadena sin serializar sus propiedades de forma adecuada. Parece que el problema está en cómo se están convirtiendo los objetos de puntajes altos a texto en la función showHighScores.

Para solucionarlo, aquí tienes un fragmento de código que puedes usar para asegurarte de que los objetos se conviertan correctamente en una cadena legible. Esto debería mostrar las iniciales y el puntaje como texto, en lugar de [object Object].

javascript
Copy code
function showHighScores() {
    const highScores = getHighScores();
    const highScoreList = document.getElementById('top-scores');
    
    // Vaciamos la lista actual para asegurarnos de que no hayan entradas previas mostradas incorrectamente.
    highScoreList.innerHTML = 'Top Puntuaciones:';

    // Verificamos que cada objeto de puntaje alto tenga las propiedades 'initials' y 'score'.
    // Luego construimos una cadena de texto adecuada para cada uno y lo agregamos al DOM.
    highScores.forEach((highScore) => {
        const scoreEntry = document.createElement('div');
        scoreEntry.textContent = `${highScore.initials} - ${highScore.score}`;
        highScoreList.appendChild(scoreEntry);
    });
}
Si después de implementar este código el problema persiste, entonces deberíamos inspeccionar el lugar donde se llama a showHighScores() y cómo se están almacenando y recuperando los puntajes del almacenamiento local. Es posible que los datos no se estén guardando correctamente como objetos con las propiedades initials y score.

Asegúrate de que en todas partes donde modificas los puntajes, ya sea al guardarlos o al recuperarlos, estás tratando con objetos que tienen esta estructura:

json
Copy code
{
  "initials": "ABC",
  "score": 12345
}
Si esto no resuelve el problema, por favor, comparte el código correspondiente a la gestión de puntajes altos y cómo se llama a showHighScores(), para poder ayudarte de manera más específica.

User
Sigo teniendo el mismo problema y adiconal a esto el pop-up para ingresar el puntaje esta apareciendo dos veces
ChatGPT
Vamos a resolver esto paso a paso. Primero, para asegurarnos de que los datos se guardan y recuperan correctamente, revisemos la estructura de los datos y el código que se encarga de manejarlos.

Paso 1: Asegurarse de que los datos se guarden correctamente
Para guardar correctamente un nuevo puntaje alto, necesitas un objeto con las propiedades initials y score. Aquí tienes un ejemplo de cómo debería hacerse:

javascript
Copy code
function saveHighScore(score, initials) {
    const highScores = getHighScores();
    const newScoreEntry = { score, initials };
    highScores.push(newScoreEntry);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5); // Mantener solo los top 5
    localStorage.setItem('highScores', JSON.stringify(highScores));
}
Paso 2: Asegurarse de que los datos se recuperen correctamente
Al recuperar los puntajes, debes obtener una lista de objetos. Cada objeto debe tener las propiedades initials y score. Para mostrarlos, debes acceder a estas propiedades:

javascript
Copy code
function showHighScores() {
    const highScores = getHighScores();
    const highScoreList = document.getElementById('top-scores');
    highScoreList.innerHTML = 'Top Puntuaciones:<br>' +
        highScores.map(scoreEntry => `${scoreEntry.initials} - ${scoreEntry.score}`).join('<br>');
}
Paso 3: Prevenir que el pop-up aparezca dos veces
Para asegurarse de que el prompt no aparezca dos veces, necesitas revisar el flujo del juego y dónde se llama a saveHighScore y showHighScores. Es posible que tengas un ciclo de juego o un evento que está llamando dos veces a estas funciones cuando el juego termina.

Aquí tienes un esquema de cómo debería ser manejado al final del juego:

javascript
Copy code
if (gameOver) {
    setTimeout(() => { // Esto puede prevenir algunos problemas de sincronización
        const currentScore = score;
        const highScores = getHighScores();
        if (highScores.length < 5 || currentScore > (highScores[highScores.length - 1]?.score || 0)) {
            const initials = prompt('Nuevo récord! Ingresa tus iniciales:');
            if (initials) {
                saveHighScore(currentScore, initials);
                showHighScores();
            }
        }
    }, 0);
}
Este fragmento asume que tienes una variable global gameOver que se establece en true cuando el juego termina, y score contiene la puntuación actual del jugador.

Paso 4: Limpiar y reinicializar los datos
Si los datos en el almacenamiento local están mal formateados debido a pruebas anteriores, considera limpiarlos:

javascript
Copy code
localStorage.removeItem('highScores'); // Ejecuta esto en la consola del navegador para reiniciar los puntajes
Prueba estos pasos y verifica si el problema del pop-up doble se resuelve y si los puntajes se muestran correctamente. Si no es así, necesitaría ver más del código, especialmente alrededor de donde se maneja el fin del juego, para ofrecer una ayuda más específica.

User
Sigue apareciendo dos veces el pop-up de ingreso de iniciales y se registra doble los puntajes
ChatGPT
Para abordar el problema del pop-up que aparece dos veces y los puntajes que se registran doble, debemos asegurarnos de que la lógica que maneja el fin del juego y el registro de nuevos puntajes se ejecute solo una vez. Esto puede suceder si el código se llama en varios lugares o si hay varios eventos que desencadenan el fin del juego.

Voy a darte una estrategia para resolver ambos problemas:

Estrategia de solución para el pop-up y la doble entrada de puntajes
Asegúrate de que el fin del juego se maneje en un solo lugar: Debe haber un único punto en tu código que detecte el fin del juego y ejecute la lógica de manejo correspondiente.
Utiliza una bandera para evitar ejecuciones múltiples: Establece una variable que indique si la lógica de fin de juego ya se ha procesado.
Aquí hay un ejemplo de cómo podrías implementar estas estrategias:

javascript
Copy code
let isGameOverHandled = false;

function endGame() {
    if (isGameOverHandled) return;
    isGameOverHandled = true;

    // Tu lógica para el fin del juego, incluyendo el pop-up de puntaje alto
    const currentScore = score;
    const highScores = getHighScores();
    
    if (highScores.length < 5 || currentScore > (highScores[4]?.score || 0)) {
        const initials = prompt('Nuevo récord! Ingresa tus iniciales:');
        if (initials) {
            saveHighScore(currentScore, initials);
            showHighScores();
        }
    }
    alert('Game Over. Tu puntuación fue: ' + currentScore);
    // Reiniciar el juego o manejar el fin del juego
}

// Lugar en tu código donde detectas el fin del juego
if (gameOver) {
    endGame();
}
Con este código, cuando la función endGame se llama por primera vez, la bandera isGameOverHandled se establece en true, lo que evita que la lógica se ejecute una segunda vez en llamadas subsecuentes.

Paso de depuración adicional
Si sigues teniendo el problema después de implementar la solución anterior, te sugiero que agregues algunos console.log en los lugares donde crees que podría terminar el juego o donde se llama a la función de fin del juego para ver cuántas veces y desde dónde se llama:

javascript
Copy code
function endGame() {
    console.log("endGame llamado");
    // Resto del código...
}
Esto te ayudará a identificar si hay múltiples puntos en tu código que llaman a la lógica del fin del juego y te permitirá ajustar adecuadamente.

Prueba estas sugerencias y verifica si el problema del pop-up doble y el registro duplicado de puntajes se ha resuelto. Si después de esto el problema persiste, necesitaría ver el código relevante, especialmente donde manejas el gameOver, para darte una solución más precisa.