Quiero que comportes como un experto desarrollador en Javascript y crees, por un lado un cronometro y por otro una cuenta atras. Para llegar a cualquiera de las dos opciones tienes una vista principal donde habrá dos botones, uno para ir al cronometro y otro para ir a la cuenta atrás, tal y como te muestro en la primera imagen adjunta.

1.- Cronometro

- Debe tener un contenedor donde se vea reflejado el paso de los segundos, minutos y horas, con 3 decimales.
- Contendrá un botón para empezar el cronometro con un texto de "Start" , que se modificará a "Pause" cuando el cronometro esté en marcha y podrá detener el tiempo en cualquier momento.
- Al lado del botón de "Start" debe contener otro botón que ponga el cronometro a 0 una vez se haya pausado la cuenta. Este boton no debe estar habilitado si el cronometro esta en marcha, solo cuando esté pausado.
- Para el diseño de esta vista puedes fijarte en la segunda imagen adjunta.

  2.- Cuenta atrás

- Esta debe tener una primera vista que sea donde le pasemos el tiempo para hacer la cuenta atrás. Recuerda que los segundos y los minutos no pueden ser mas 60, si el usuario indica 100, esto debe traducirse a 1 min y 40 segundos.
- Una vez el usuario haya seteado el tiempo para la cuenta atras podra aceptar ese tiempo clicando en el boton "Set" o podrá reiniciar a 0 el contador para volver a indicar el tiempo con el boton "Clear".
- Al clicar el boto de "Set" el usuario deber ver una vista como la anteriormente utilizada para el cronometro en la imagen 2 con el tiempo que seteó antes.
- Para este diseño puedes fijarte en la tercera imagen proporcionada.

Tanto la vista de cronometro debe tener un boton de "Back" para volver a la pagina principal donde puede elegir entre los dos botones de "Stopwatch" o "Countdown".

Se parte de este html:

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Timer and Countdown</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<h1>Timer and Countdown</h1>
<script src="script.js"></script>
</body>
</html>
