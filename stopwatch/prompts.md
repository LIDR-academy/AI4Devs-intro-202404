## Prompt usado en Claude para la aplicación de Cronómetro y Cuenta Atrás

Actuando como experto desarrollador web, se requiere crear una aplicación que permita ejecutar un cronómetro (stopwatch) o un cuenta atrás (countdown) que cumpla con los siguientes requisitos:

1. Presentar en pantalla dos posibles opciones al usuario: Stopwatch y Countdown.
2. Si el usuario toma la opción Stopwatch, entonces se le muestra una interfaz con el diseño de la imagen `stopwatch.png` con todas sus funciones.
3. Si el usuario toma la opción Countdown, entonces se le muestra una interfaz de configuración para definir la cantidad de tiempo inicial desde horas, minutos y segundos. La configuración debe ser similar a la imagen `setCountdown.png`. Una vez definido el tiempo inicial, podrá ejecutar la cuenta regresiva con una interfaz con diseño similar al cronómetro garantizando que se realice la cuenta regresiva a partir del tiempo inicial.
4. Tanto para la interfaz de stopwatch como countdown, nótese que ambas se muestran los milisegundos con un tamaño inferior a los dígitos de las horas, minutos y segundos.
5. Tome como plantilla para el código HTML el archivo `index.html`.

Utilice la librería Bootstrap de JS.

Tomar en cuenta las buenas prácticas de programación para asegurar que se tenga un código limpio y de fácil mantenimiento.

La salida debe ser en dos archivos: `index.html` y `scripts.js`.
