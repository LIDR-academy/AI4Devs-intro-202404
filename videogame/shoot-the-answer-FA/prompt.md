Como desarrollador de juegos, se requiere realizar el desarrollo de un juego de preguntas y respuestas llamado Shoot n' Study, en el cual un niño o niña deberá escoger los temas que más le interese aprender entre Matematicas, Ciencias e Historia. El juego debe actuar como un juego de disparos usando el mouse para mover el cursor que será una imagen de mira de apuntar donde se debe disparar a la respuesta correcta que será representada por un disco que tendrá A, B, C, D segun sea el caso, deben presentarse flotando por la pantalla sin salir de un espacio definido para el juego y moviendose de forma aleatoria con una velocidad de minimo 250 milisegundos. Deberás crear los archivos necesarios.

Path: /videogame/shoot-the-answer-FA

## **Especificaciones**

Todas las pantallas deben tener un tamaño de 800 px de ancho y 600 px de alto centradas en el centro de la pantalla. La pantalla debe tener colores alegres que puedan ser representados en un juego de preguntas y respuestas.

### Pantalla de Inicio

* Seleccionar el tema para aprender
* Seleccionar si es un niño o una niña 
* Los temas a seleccionar deben ser **Matematicas, Ciencias e Historia** en un select centrado
* Al seleccionar niño o niña debe mostrar una imagen de niño o niña y al dar clic setear el valor seleccionado en una variable
* Debe mostrar el titulo del Juego **Shoot n' Study**

### Pantalla de Juego

* Debe tener un background asociado al tema seleccionado.
* Debe mostrar al niño o niña a un lado de la pantalla
* La parte superior deberá mostrar el tema que se esta jugando.
* la parte inferior deberá mostrar la pregunta y las multiples respuestas, solo hay una respuesta correcta
* Cada respuesta es representada por un disco flotando en la pantalla
* En la parte superior derecha se mostrar el puntaje obtenido

### Reglas del Juego

* El niño o niña tiene 3 dardos máximos
* Si acierta en el primer intento, se le suman 100 puntos
* Si acierta en el segundo intento, se le suman 50 puntos
* Si acierta en el tercer intento, se le suman 25 puntos
* Si no acierta el niño o niña no obtiene puntos
* Si acierta tres preguntas seguidas en el primer intento se le dará un bonus de 100 puntos adicionales

## Stack

* HTML
* CSS
* JavaScript

Ya tendrás disponibles para tu uso los siguientes recursos:

* /index.html 
* /style.css
* /assets/boy.png   
* /assets/girl.png
* /assets/backgrounds/math.png
* /assets/backgrounds/science.png
* /assets/backgrounds/history.png
* /assets/disks/A.png
* /assets/disks/B.png
* /assets/disks/C.png
* /assets/disks/D.png
* /data/questions.json
* /game.js





