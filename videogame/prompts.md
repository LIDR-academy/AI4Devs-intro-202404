#1
Eres un ingeniero de software y tienes la tarea de desarrollar el videojuego de Super Mario bros. usando html, css y js. 
Empiezas con el desarrollo de la Interfaz del Usuario y el Entorno del videojuego. 

Requerimientos funcionales iniciales:
Interfaz de usuario: Se necesita una interfaz para mostrar información como puntaje, vidas restantes, tiempo transcurrido y cualquier mensaje importante para el jugador (por ejemplo, "Game Over" o "Nivel Completado").
Entorno: Los niveles incluyen fondos y elementos como nubes, tuberías, bloques de ladrillos, monedas y plataformas. Estos elementos deben ser dibujados y posicionados adecuadamente para crear la estética de Super Mario Bros.

Requerimientos no funcionales:
Haz una estrategia para generar un mapa de nivel del juego de super Mario bros a partir de una matriz de js, los valores que puede tener la matriz serian identificadores de los posibles elementos del entorno como pipe, brick, coin o platform. De esta manera es mas sencillo generar nuevos niveles y realizar cambios en un nivel.

Dame una version inicial completamente funcional incluyendo el mapa del nivel inicial, esto en archivos html, css y javascript.

#2
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

"2.2"
