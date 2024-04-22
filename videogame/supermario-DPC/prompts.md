## 0 Prompt de preparación del ejercicio 
User
¿Que viduejuegos conoces? Puede ser cualquier tipo de juego que te interese desarrollar, desde un juego de plataformas hasta un puzzle o un juego de estrategia.

ChatGPT
¡Conozco muchos videojuegos de diferentes géneros! Algunos de los más populares y variados son:

Super Mario Bros. (plataformas)
The Legend of Zelda: Breath of the Wild (aventura)
Tetris (puzzle)
Minecraft (sandbox)
Overwatch (shooter en primera persona)
Civilization VI (estrategia por turnos)
The Witcher 3: Wild Hunt (juego de rol)
Fortnite (battle royale)
Stardew Valley (simulación de granja)
League of Legends (MOBA)
¿Hay algún género en particular que te interese más o algún tipo de juego que te gustaría saber más sobre su desarrollo?

User
Como describirias funcionalmente y graficamente el videojuego de super mario bros. a un ingeniero de software que tiene que replicarlo usando html, css y js  

ChatGPT
¡Claro! Describiría funcionalmente y gráficamente el juego Super Mario Bros. de la siguiente manera para un ingeniero de software que necesita replicarlo utilizando HTML, CSS y JavaScript:

Funcionalidad:

Movimiento del personaje: El jugador puede mover al personaje principal (Mario) hacia la izquierda, derecha y saltar. Mario debe poder interactuar con el entorno, como saltar sobre enemigos o recolectar monedas.
Enemigos y obstáculos: El juego incluye varios tipos de enemigos como Goombas y Koopa Troopas, así como obstáculos como pozos, bloques de ladrillos y plataformas móviles. Mario debe evitar o derrotar a los enemigos y superar los obstáculos para avanzar en el nivel.
Niveles y progresión: El juego consta de varios niveles con diferentes diseños y desafíos. Cada nivel tiene un objetivo final, como llegar a la bandera al final del nivel o derrotar a un jefe.
Puntos y vidas: Mario puede ganar puntos al recolectar monedas, derrotar enemigos y completar niveles. También tiene un número limitado de vidas, que disminuyen al entrar en contacto con enemigos o caer en pozos.
Power-ups y habilidades: El juego incluye power-ups como la flor de fuego y la seta que hacen que Mario obtenga habilidades especiales, como lanzar bolas de fuego o crecer en tamaño para resistir un golpe adicional.
Gráficos:

Personajes: Mario y otros personajes como Goombas, Koopas, Princesa Peach y Bowser deben estar representados con imágenes en 2D con animaciones básicas (caminar, saltar, etc.).
Entorno: Los niveles incluyen fondos y elementos como árboles, nubes, tuberías, bloques de ladrillos, monedas y plataformas. Estos elementos deben ser dibujados y posicionados adecuadamente para crear la estética de Super Mario Bros.
Interfaz de usuario: Se necesita una interfaz para mostrar información como puntaje, vidas restantes, tiempo transcurrido y cualquier mensaje importante para el jugador (por ejemplo, "Game Over" o "Nivel Completado").
Animaciones: El juego requiere animaciones para acciones como saltar, aplastar enemigos, recoger monedas, activar power-ups, etc.
Sonido: Aunque no es parte de HTML, CSS o JavaScript directamente, se pueden integrar efectos de sonido y música para mejorar la experiencia del juego.
Estos elementos combinados recrearían la experiencia básica de Super Mario Bros. en un entorno web utilizando tecnologías web estándar como HTML para la estructura, CSS para el diseño y estilo, y JavaScript para la lógica y la interactividad del juego.

## 1 Prompt Versión inicial con el Entorno del juego
User
Eres un ingeniero de software y tienes la tarea de desarrollar el videojuego de Super Mario bros. usando html, css y js. 
Empiezas con el desarrollo de la Interfaz del Usuario y el Entorno del videojuego. 

Requerimientos funcionales iniciales:
Interfaz de usuario: Se necesita una interfaz para mostrar información como puntaje, vidas restantes, tiempo transcurrido y cualquier mensaje importante para el jugador (por ejemplo, "Game Over" o "Nivel Completado").
Entorno: Los niveles incluyen fondos y elementos como nubes, tuberías, bloques de ladrillos, monedas y plataformas. Estos elementos deben ser dibujados y posicionados adecuadamente para crear la estética de Super Mario Bros.

Requerimientos no funcionales:
Haz una estrategia para generar un mapa de nivel del juego de super Mario bros a partir de una matriz de js, los valores que puede tener la matriz serian identificadores de los posibles elementos del entorno como pipe, brick, coin o platform. De esta manera es mas sencillo generar nuevos niveles y realizar cambios en un nivel.

Dame una version inicial completamente funcional incluyendo el mapa del nivel inicial, esto en archivos html, css y javascript.

## 2 - Nuevo prompt con iteraciones para refinar el Movimiento del personaje
Link chat: https://chat.openai.com/share/49b3b046-5c5a-4955-9db3-9f7bc66029a7

User
Eres un ingeniero de software, tienes la tarea de hacer una web con el videojuego de Super mario. 
Ya tienes una version inicial donde cuentas con el entorno del juego

Este es tu código de avance:
``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Super Mario Bros</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div id="game-container" class="grid-container">
    <!-- Aquí se mostrará el juego -->
  </div>
  <script src="game.js"></script>
</body>
</html>
```
```css
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #70c5ce;
}

.grid-container {
  width: 800px;
  height: 400px;
  border: 2px solid #000;
  background-color: #e0e0e0;
  display: grid;
  grid-template-columns: repeat(10, 40px); /* Ancho de cada columna */
  grid-template-rows: repeat(7, 40px); /* Alto de cada fila */
}

.tile {
  width: 40px;
  height: 40px;
}

.type-0 {
  background-color: transparent; /* Espacio vacío */
}

.type-1 {
  background-color: #b97a57; /* Ladrillo */
}

.type-2 {
  background-color: #b97a57; /* Plataforma */
}

/* Otros estilos para diferentes tipos de tiles */
```
```javascript
/* 0: vacio, 1: ladrillo, 2: plataforma */
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

generateLevel();
```

Ahora tienes que agregar una nueva funcionalidad, es el movimiento del personaje

'Movimiento del personaje': El jugador puede mover al personaje principal (Mario) hacia la izquierda, derecha y saltar. Mario debe poder interactuar con el entorno.


Hasta ahora tenemos 3 tipos de tiles: 0 es vacio, 1 es ladrillo y 2 es plataforma. 

Mario puede posicionarse sobre tiles del tipo plataforma o ladrillo. Genera un nuevo tipo de tile para Mario y añade toda la lógica del 'Movimiento del personaje' que será accionada con las flechas del teclado.

### 2.2
User
Ahora implementa la gravedad, esto es que el tile de Mario siempre esté "cayendo" a menos que haya otro tile de ladrillo o de plataforma.

### 2.3
User
Ok, ahora implementa el salto de Mario.

### 2.4
User
Mario siempre esta cayendo, por lo que la validacion en ArrouUp de !player.isFalling no aplicaría. Otra cosa, las colisiones no estpan funcionando correctamente

### 2.5
User
En la funcion renderPlayer() estás creando un nuevo elemento div en el dom lo que hace que los divs del entorno se modifiquen, este comportamiento no es correcto. Actualiza la forma en que se renderiza Mario para que no afecte el entorno

## 3 Nuevo Prompt para añadir Puntos y Vidas y la Interfaz del Usuario
Link chat: https://chat.openai.com/share/59edd57e-c545-4363-9aa9-4a2f4a575fec

User
Eres un ingeniero de software, tienes la tarea de hacer una web con el videojuego de Super mario. 
Ya tienes una version inicial funcional donde cuentas con el "Entorno" del juego, y el "Movimiento del personaje" 

El código es el siguiente
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Super Mario Bros</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div id="game-container" class="grid-container">
    <!-- Aquí se mostrará el juego -->
  </div>
  <script src="game.js"></script>
</body>
</html>
```
```css
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #70c5ce;
}

.grid-container {
  width: 800px;
  height: 400px;
  border: 2px solid #000;
  background-color: #e0e0e0;
  display: grid;
  grid-template-columns: repeat(20, 40px); /* Ancho de cada columna */
  grid-template-rows: repeat(10, 40px); /* Alto de cada fila */
}

.tile {
  width: 40px;
  height: 40px;
}

.type-0 {
  background-color: transparent; /* Espacio vacío */
}

.type-1 {
  background-color: #b97a57; /* Ladrillo */
}

.type-2 {
  background-color: #b97a57; /* Plataforma */
}

.type-3 {
  background-color: #f00; /* Color rojo para Mario */
}
.type-mario {
  background-color: #f00; /* Color para Mario */
}

/* Otros estilos para diferentes tipos de tiles */
```
```javascript
/* 0: vacio, 1: ladrillo, 2: plataforma, 3: Mario */
const levelMatrix = [
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const player = {
  x: 1,
  y: 5,
  isFalling: true, // Nuevo flag para indicar si Mario está cayendo
  isJumping: false, // Nuevo flag para indicar si Mario está saltando
  jumpHeight: 2, // Altura máxima del salto
  jumpCount: 0, // Contador para el salto
};

const gameContainer = document.getElementById('game-container');

function generateLevel() {
  for (let y = 0; y < levelMatrix.length; y++) {
    for (let x = 0; x < levelMatrix[y].length; x++) {
      const tileType = levelMatrix[y][x];
      const tile = document.createElement('div');
      tile.className = `tile type-${tileType}`;
      tile.style.gridColumnStart = x + 1; // Ajustar posición X
      tile.style.gridRowStart = y + 1; // Ajustar posición Y
      gameContainer.appendChild(tile);
    }
  }
}

function renderPlayer() {
  const playerTile = document.createElement('div');
  playerTile.className = 'tile type-3'; // Tipo 3 para Mario
  playerTile.style.gridColumnStart = player.x + 1; // Ajustar posición X
  playerTile.style.gridRowStart = player.y + 1; // Ajustar posición Y
  gameContainer.appendChild(playerTile);
}

function clearPlayer() {
  const playerTile = document.querySelector('.type-3'); // Encontrar el tile de Mario
  if (playerTile) {
    playerTile.remove(); // Eliminar el tile de Mario
  }
}

function movePlayer(direction) {
  clearPlayer(); // Limpiar la posición anterior de Mario

  // Aplicar gravedad si Mario no está sobre una plataforma o ladrillo
  if (!player.isJumping && player.isFalling && player.y < levelMatrix.length - 1 && levelMatrix[player.y + 1][player.x] !== 1 && levelMatrix[player.y + 1][player.x] !== 2) {
    player.y++;
  }

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
      if (!player.isJumping && /*!player.isFalling &&*/ (levelMatrix[player.y + 1][player.x] === 1 || levelMatrix[player.y + 1][player.x] === 2)) {
        player.isJumping = true;
        player.jumpCount = 0;
      }
      break;
  }

  // Manejar el salto de Mario
  if (player.isJumping) {
    if (player.jumpCount < player.jumpHeight) {
      player.y--;
      player.jumpCount++;
    } else {
      player.isJumping = false;
      player.isFalling = true;
    }
  }

  renderPlayer(); // Renderizar a Mario en la nueva posición
}

// Actualizar la posición de Mario continuamente para simular la gravedad
setInterval(() => {
  movePlayer('ArrowDown'); // Simular movimiento hacia abajo para aplicar gravedad
}, 200); // Intervalo de tiempo para la gravedad

document.addEventListener('keydown', (event) => {
  movePlayer(event.key); // Mover a Mario cuando se presiona una flecha
});

generateLevel(); // Generar el nivel inicial
```

Ahora tienes que añadir "Puntos y vidas"  y la "Interfaz de usuario".
"Puntos y vidas": Mario puede ganar puntos al recolectar monedas, derrotar enemigos y completar niveles. También tiene un número limitado de vidas, que disminuyen al entrar en contacto con enemigos o caer en pozos.
"Interfaz de usuario": Se necesita una interfaz para mostrar información como puntaje, vidas restantes, tiempo transcurrido y cualquier mensaje importante para el jugador (por ejemplo, "Game Over" o "Nivel Completado").

Para añadir puntuación se puede agregar nuevos tipos de tiles que serian 'Moneda': aumenta puntuación,  'Enemigo': Si Mario lo toca se acaba el juego, 'Meta': Si Mario lo toca completa el nivel.

Tienes que entregar los archivos html, css y javascript actualizados con las nuevas funcionalidades.

### 3.1 
User
Es funcional, actualicé el mapa para poder interactuar con lo elementos:
```javascript
const levelMatrix = [
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 4, 0, 0, 5, 0, 0, 0, 0, 0, 6, 0],
  [2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2],
];
// El resto de código
```

Ahora tienes que hacer un para de mejoras:
* Cuando se Elimina la moneda del nivel en la función 'handleCollisions', se tiene que actualizar el elemento div del dom para que sea de tipo "Espacio vacio"
* Cuando mario caiga de la plataforma, es decir cuando llegue al limite inferior del mapa, tambien se debe acabar el juego. 

### 3.2
User
Ahora haz que la interfaz de usuario se vea siempre dentro del recuadro del juego, no por fuera

### 3.3
User
Ahora tienes que agregar el aspecto visual real de mario bros. Yo proporcionaré la url de imagenes que tiene que tener cada uno de los tiles. Tu tienes que ajustar la imagen al tile por medio del css.
1 Ladrillo  = https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY90zcKL4t2a2qE0Fh2fh1xc6ZRtuGdC-Ki5wkmAfVyQ&s
2 Plataforma = https://art.pixilart.com/82f97e33624310f.png
3 Mario = ANd9GcRu7fWcUGausCvhAmmmto1himHdbd3UJgtoLUfY69SCMg
4 Moneda = https://www.seekpng.com/png/detail/323-3236305_mario-coin-png-circle.png
5 Enemigo = https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu5WWzFlX_56wucJ78EMUPt3RZbnjcZzL-fFWzKuJ_9w&s  