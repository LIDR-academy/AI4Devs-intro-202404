# 1
    Quiero que sepas que soy un desarrollador web, sin embargo se que tu también lo eres y por eso quiero que me ayudes a generar el código para un juego que quiero inventar.

    El juego debe cumplir algunos requisitos:

    - Debe ser completamente funcional en los navegadores web modernos.
    - Todas las dependencias deben estar disponibles para que el jugador no requiera descargar ni instalar ningún componentes adicional.
    - Vamos a presentar al usuario una apntalla inicial con las opciones: Jugar, Los más veloces y Créditos.
    - Quiero que dividamos los archivos así: la estructura en index.html, los estilos en styles.css y la lógica en script.js.
    - Por favor iniciemos definiendo la estructura para ya luego enfocarnos en la lógica únicanemte.
    - Quiero que usemos un modelo incremental.
    - El juego lo he llamado Queen Hunter-


# 2 
    Vamos a corregir la pantalla de créditos, en esta quiero mostrar un mensaje muy llamativo que indique que este juego lo hemos construido juntos. Por favor genera un nombre para nuestro equipo, por ejemplo el dúo dinámico Miguel Casallas y GPT +


# 3
    Además en cada pantalla por favor agrega un botón con el emoticón de la flecha atrás para regresar al menú principal

# 4
    Vamos a enfocarnos en la pantalla del juego, para esto quiero que tengas en cuenta los siguientes lineamientos:

# 5
    Debemos hacer algunas correcciones:

    - El tablero de ajedrez NO es como lo construiste, sino que alterna las casillas, una blanca y una negra, aún así los colores que usaste me gustan , por favor mantenlos.
    - Debemos centrar el tablero en la pantalla.
    - Debemos hacer un poco más grandes los emojis para que se distingan mejor en la pantalla.

# 6
    Vamos a adicionar en esta pantalla un contador de tiempo que nos mostrará los minutos, segundos y milisegundos transcurridos desde que se inicia la partida,


# 7 
    Está perfecto, ahora debemos agregar una interacción al juego para poder hacer que al darle clic al caballo, se coloree el fondo de la casilla en donde está con el color #7A9CC6, además también debe mostrar las posibles casillas donde se puede mover el caballo con el color bde4a7

# 8
    Todo ha ido perfecto, ahora vamos hacer que al hacer clic sobre una de las casillas que es posible movimiento del caballo, este se mueva a dicha casilla, me gustaría que este movimiento se aplique con una animación y recuerda restablecer el estado, lo que implica resaltar la casilla donde el caballo queda con el color #7A9CC6 y las nuevas casillas a donde se podrá mover con el color #bde4a7, así como quitar el resaltado de la casilla donde estaba el caballo y los anteriores posibles movimientos

# 9
    Tenemos un error porque no definimos las variables knightPosition y knightSquare, por favor ajústalo

# 10
    veo otro error en que la función moveKnight recibe un índice pero cuando se invoca, no se le pasa un índice sino un elemento html

# 11
    está perfecto, vamos agregar un par de reglas más:

    - Al iniciar una nueva partida, la posición de la reina no podrá ser uno de los posibles movimientos del caballo.
    - El juego termina cuando el caballo logra llegar a la casilla en donde está la reina. En este momento mostraremos un mensaje indicando que haz ganado y que lo hiciste en cuanto tiempo y cuantos movimientos.

# 12 
    En la función isValidQueenPosition usaste una variable newIndex que no existe

# 13
    Que felicidad, ya tenemos nuestro juego funcional, ahora quiero que calculemos el puntaje del jugador cuando alcanza la victoria de la siguiente forma:

    - Para calcular el puntaje del jugador vamos a dividir el tiempo en milisegundos por la cantidad de movimientos.
    - Este puntaje debemos mostrarlo en el mensaje de victoria.
    - Adicionalmente debemos revisar en el localStorage si ya existen puntajes almacenados, si existen vamos a revisar en que posición quedará este jugador y le solicitaremos su nombre para poder guardar todos sus datos: Nombre, puntaje, movimientos y tiempo.
    - Solo almacenaremos los primeros 5 puntajes.
    - Un puntaje es mejor que otro en la medida que es menor, dado que el objetivo del juego es minimizar el número de movimientos y tiempo.

# 14
    No quiero considerar el tiempo de la animación, para el cálculo del puntaje lo que quiero que hagamos es tomcat el número de minutos multiplicado por 60000, el número de segundos por 1000 y luego sumar estos 2 valores con el número de milisegundos. Finalmente este valor lo dividimos entre el número de movimientos y este sería nuestro puntaje

# 15 
    Estoy muy contento con el resultado, finalmente vamos a implementar la pantalla de los más veloces, para esto revisaremos el localStorage para poder construirla, así:

    - Si no hay registros, mostraremos el mensaje: Aún no existen registros, ve a jugar para imponer tu récord.
    - Si hay registros, mostraremos una tabla con las columnas: nombre, puntaje, tiempo y cantidad de movimientos. Ordenados de menor a mayor.

# 16
    Por favor apliquemos algo de estilos en esta tabla, se me ocurre algo así:

    - Centrar la tabla.
    - Dar un color de fondo a lo encabezados, por ejemplo #7A9CC6.
    - Dar color de texto blanco a los encabezados.


# 17
    Hemos finalizado nuestro juego, tal vez el único error que veo es que el tablero no nos quedó centrado