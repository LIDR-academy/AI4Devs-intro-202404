# Proyecto, cronómetro y cuenta atrás

## Rol necesario:
Experto desarrollador frontend.

## Tech Stack:
- HTML5
- CSS3
- JS ES2023

## Descripción:
se deberá crear una aplicación web que contenga una vista que me permita seleccionar entre cronómetro y una cuenta atrás, que sigan el diseño de la imagen de referencia.

Al pasar entre una vista y otra, se deberá mostrar una animación de transición.

## Requerimientos funcionales:

### Vista inicial:
- Deberá contener dos botones, uno para cronómetro y otro para cuenta atrás.
- Al hacer click en uno de los botones, se deberá mostrar la vista correspondiente.
- Al pasar de una vista a otra, se deberá mostrar una animación de transición.
- Para el botón de cronómetro, se puede usar un caracter unicode como reloj ⏱️.
- Para el botón de cuenta atrás, se puede usar un caracter unicode como reloj de arena ⏳.
- Inicialmente, la vista de cronómetro y cuenta atrás deberán estar ocultas.
- Al hacer click en el botón de cronómetro, se deberá mostrar la vista de cronómetro y ocultar la vista de cuenta atrás y la vista inicial.
- Al hacer click en el botón de cuenta atrás, se deberá mostrar la vista de cuenta atrás y ocultar la vista de cronómetro y la vista inicial.
- Ambas vistas deberán contener un botón de regreso con el caracter unicode de flecha hacia atrás ⬅️, el cual al hacer click, deberá regresar a la vista inicial.

### Vista de cronómetro:
- Deberá contener un botón de inicio con el caracter unicode de play ▶️, el cual al hacer click, deberá iniciar el cronómetro.
- Deberá contener un botón de reinicio con el caracter unicode de reinicio 🔄, el cual al hacer click, deberá reiniciar el cronómetro.
- El mismo botón de reinicio deberá servir para detener el cronómetro si este se encuentra en marcha.
- El mismo botón de inicio deberá servir para pausar el cronómetro si este se encuentra en marcha.
- Cuando se presione el botón de inicio, este deberá cambiar a pausa con el caracter unicode de pausa ⏸️ y pausar el cronómetro.
- El mismo botón de inicio deberá servir para continuar el cronómetro si este se encuentra pausado.
- Cuando el estado de pausa se encuentre activo, el botón debería mostrar el caracter unicode de play ▶️.
- Cuando el cronómetro esté en pausa y se presione el botón de inicio, este deberá cambiar a pausa con el caracter unicode de pausa ⏸️ y continuar el cronómetro.
- El tiempo del cronómetro deberá ser mostrado en formato HH:MM:SS. Ejemplo: 00:00:00.
- Debajo del tiempo deberán mostrarse los milisegundos. Ejemplo: 000.

### Vista de cuenta atrás:
- Deberá contener tres inputs para ingresar el tiempo en formato HH:MM:SS, estos inputs deberán estar separados por :.
- Deberá contener un botón de inicio con el caracter unicode de play ▶️, el cual al hacer click, deberá iniciar la cuenta atrás.
- Deberá contener un botón de reinicio con el caracter unicode de reinicio 🔄, el cual al hacer click, deberá reiniciar la cuenta atrás.
- El mismo botón de reinicio deberá servir para detener la cuenta atrás si esta se encuentra en marcha.
- El mismo botón de inicio deberá servir para pausar la cuenta atrás si esta se encuentra en marcha.
- Cuando se presione el botón de inicio, este deberá cambiar a pausa con el caracter unicode de pausa ⏸️ y pausar la cuenta atrás.
- El mismo botón de inicio deberá servir para continuar la cuenta atrás si esta se encuentra pausada.
- Cuando el estado de pausa se encuentre activo, el botón debería mostrar el caracter unicode de play ▶️.
- Cuando la cuenta atrás esté en pausa y se presione el botón de inicio, este deberá cambiar a pausa con el caracter unicode de pausa ⏸️ y continuar la cuenta atrás.
- El tiempo de la cuenta atrás deberá ser mostrado en formato HH:MM:SS. Ejemplo: 00:00:00.
- Debajo del tiempo deberán mostrarse los milisegundos. Ejemplo: 000.
- Al llegar a 00:00:00, deberá mostrarse un mensaje de alerta.
- Por defecto, el botón de inicio deberá estar deshabilitado hasta que se ingrese algún número diferente de 0 en los inputs.
- Cada input deberá aceptar solo números positivos hasta el 60 para minutos y segundos y hasta el 23 para las horas y no deberá aceptar letras ni caracteres especiales.
- Cada input deberá tener un máximo de 2 caracteres.
- Cada input deberá tener un placeholder con los textos HH, MM y SS.
- Cada input deberá emitir una alerta de error si el número ingresado es incorrecto.
- Cada input debería estar lleno por defecto 00, 00, 00.
- Al hacer click en el botón de reinicio, los inputs deberán limpiarse y el botón de inicio deberá estar deshabilitado.
- Al hacer click en el botón de inicio, los inputs deberán deshabilitarse.
- Al hacer click en el botón de reinicio, los inputs deberán habilitarse.
- Al hacer click en el botón de regreso, los inputs deberán limpiarse y el botón de inicio deberá estar deshabilitado.
- Cada vez que se complete el llenado de un input, el cursor deberá pasar al siguiente input solo si el número es mayor a 9.
- Cada vez que haya foco en un input, este deberá cambiar de color.
- Cada vez que haya foco en un input, si está en 0, este deberá limpiarse.
- Si se escribe un número mayor al permitido, este deberá limpiarse y mostrar una alerta de error.
- Si al cambiar de input, el número es mayor al permitido, este deberá limpiarse y mostrar una alerta de error.
- Si al cambiar de input, el número es menor a 10, este deberá completarse con un 0 al inicio.

## Requerimientos no funcionales:
- La aplicación deberá seguir el diseño de la imagen de referencia.
- La aplicación deberá ser responsive.
- Los colores deben estar basados en la imagen de referencia.

## Outputs:
- Un archivo HTML5 basado en el siguiente código base:
```html
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
```
- Un archivo CSS3 llamado styles.css.
- Un archivo JS ES2023 llamado script.js.

# Primer prompt:
```markdown
Podrías generar el output solicitado?
```

# Segundo prompt:
```markdown
Podrías revisar lo siguiente?

En cuanto al cronómetro, al darle pausa y luego iniciar se hace reset, lo cual no debería ser así, solo debería continuar el conteo

En cuanto al count down:

- Al cambiar de input o salirse de él, si el número es menor a 10 no se está poniendo el 0 al inicio del número.

- Los milisegundos no se están moviendo

En general, podrías poner el botón Back a la derecha de los otros dos, sin el texto Back, con el mismo color de los otros y solo el ícono?
```

# Tercer prompt:
```markdown
En el countdown no me está permitiendo ingresar números de 2 dígitos, es decir, si ingreso 1, no me deja ingresar el 12, solo autocompleta 01, la validación debería ejecutarse cuando cambio o salgo del input, no antes

En cuanto a los milisegundos, al finalizar el conteo qued aun texto de NaN en vez de 000

Podrías solucionar ambas cosas?
```

# Cuarto prompt:
```markdown
Por defecto los inputs del countdown deben estar llenos con 00

Aún, al dar click en el botón de reset aparece NaN en vez de 000
```

# Quinto prompt:
```markdown
En el countdown, al hacer clic en el botón de play empieza el conteo hacia abajo, pero si vuelvo a dar click se resetea, cuando lo que debería pasar es que al darle click en pausar y volverle a dar play debería continuar el conteo hacia abajo donde quedó
```
