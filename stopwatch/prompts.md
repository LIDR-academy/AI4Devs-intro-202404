# Desarrollo de Aplicación con GPT-4

A continuación, se presenta un resumen de los prompts y las instrucciones proporcionadas a GPT-4 para desarrollar una aplicación que incluye un cronómetro y una cuenta atrás, junto con la creación de íconos de flechas para su interfaz.

## Creación de la Aplicación

### Prompt 1: Instrucciones para el Desarrollo de la Aplicación en Javascript

"Quiero que comportes como un experto desarrollador en Javascript y crees, por un lado un cronometro y por otro una cuenta atras. Para llegar a cualquiera de las dos opciones tienes una vista principal donde habrá dos botones, uno para ir al cronometro y otro para ir a la cuenta atrás, tal y como te muestro en la primera imagen adjunta.

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
</html>"

### Prompt 2: Continuación del Desarrollo en Javascript

"Podrías seguir con la implementación de estos puntos:

- Iniciar/Pausar el cronómetro.
- Resetear el cronómetro.
- Configurar y empezar la cuenta atrás.
- Actualizar los contenedores de tiempo en la interfaz."

### Prompt 3: Solicitud del HTML Actualizado con el Código JS Creado

"Podrías facilitarme el archivo javascript completo con las últimas correcciones?"

### Prompt 4: Solicitud de Buenas Prácticas en la Organización del Archivo Javascript

"Podrías utilizar buenas prácticas para organizar el archivo javascript?"

### Prompt 5: Resolución de Bugs en la Aplicación

"Bugs:

1. El botón de "Set" en la vista donde se setea el tiempo para ejecutar la cuenta atrás no tiene ninguna función asignada, por lo que no hace nada.
2. Quiero poder setear en la cuenta atrás incluso horas."

### Prompt 6: Resolución de Error 'NaN:NaN:NaN'

"Bug:
Con este último código proporcionado vuelvo a obtener NaN:NaN:NaN en el navegador cuando lo cliclo para empezar la cuenta atrás."

### Prompt 7: Solicitud de Corrección del Bug y Funcionamiento Incorrecto del Botón "Pause"

"Bug:

1. Cuando presiono el botón de "Pause" en la cuenta atrás, en vez de pausarla con el tiempo restante que aparece, lo que hace es resetearla al tiempo seteado por el usuario en la vista de seteo de la cuenta atrás.
2. El botón de "Clear" de la cuenta atrás está permanentemente deshabilitado. Debe estarlo cuando la cuenta atrás aún no está iniciada, pero al iniciarse y pausarse debe habilitarse por si el usuario quiere empezar la cuenta atrás desde el principio."

### Prompt 8: Solicitud de Nuevas Correcciones de Bugs

"Y este concepto aplicado al código existente, en qué función utilizarías initializeCountdown?"

### Prompt 9: Solicitud de Integración y Aplicación Correcta de la Función `initializeCountdown`

"Como lo aplicarías aquí"

### Prompt 10: Solicitud de Corrección y Ajustes de Diseño de Interfaz

"Genial! Ahora funciona la cuenta atrás. Pero sigo teniendo los siguientes bugs:

1. El botón de "Clear" en la cuenta atrás, está habilitado cuando la cuenta atrás está corriendo, necesito que solo esté habilitado cuando la cuenta atrás esté pausada.
2. Cuando me salgo de la cuenta atrás para ir al cronómetro y vuelvo, sigue guardado el valor que el usuario introdujo anteriormente en su cuenta atrás, necesito que se resetee."
