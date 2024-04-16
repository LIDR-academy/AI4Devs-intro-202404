https://chat.openai.com/share/fef47ce7-67e2-4921-8100-2bab0f199e15

User
Para el siguiente html:

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

Crear un **cronómetro y cuenta atrás**.  Referencia: [https://www.online-stopwatch.com/](https://www.online-stopwatch.com/)

Tengo 2 opciones "Stopwatch" y "Countdown"
Ambas opciones tienen el timeDisplay en donde el valor inicial es "00:00:00" el cual se refiere al tiempo en horas:minutos:segundos
Al dar "Stopwatch" se tienen los botones "Start/Continue/Pause" y "Clear"
Al dar Start se inicia el Stopwatch y se aumenta el timeDisplay un segundo por cada segundo que pase
Al dar "Countdown" se muestran botones numéricos del 0 al 9, y los botones "Set" y "Clear" en donde al darle a un numero se va a actualizar el timeDisplay de la siguiente forma: se elimina el primer digito del timeDisplay y se añade el nuevo numero al final del timeDisplay al final se mantiene el fomato "HH:MM:SS"
Cuando se da al boton "Set" se desaparecen los botones numericos y quedan los botones "Start/Continue/Pause" y "Clear"
Al dar Start se inicia el Countdown disminuyendo el timeDisplay un segundo por cada segundo que pase

Dame el html actualizado y todo el js necesario en un archivo .js que será el script.js
ChatGPT
Claro, aquí tienes el HTML actualizado y el archivo script.js con todo el código necesario para implementar un cronómetro y cuenta atrás según las especificaciones que has dado:

HTML (index.html):

html
Copy code
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
<div id="options">
  <button id="stopwatch-btn">Stopwatch</button>
  <button id="countdown-btn">Countdown</button>
</div>
<div id="time-display">00:00:00</div>
<div id="control-buttons">
  <button id="start-btn">Start</button>
  <button id="continue-btn">Continue</button>
  <button id="pause-btn">Pause</button>
  <button id="set-btn">Set</button>
  <button id="clear-btn">Clear</button>
</div>
<script src="script.js"></script>
</body>
</html>
JavaScript (script.js):

javascript
Copy code
document.addEventListener("DOMContentLoaded", function () {
  const timeDisplay = document.getElementById("time-display");
  const stopwatchBtn = document.getElementById("stopwatch-btn");
  const countdownBtn = document.getElementById("countdown-btn");
  const startBtn = document.getElementById("start-btn");
  const continueBtn = document.getElementById("continue-btn");
  const pauseBtn = document.getElementById("pause-btn");
  const setBtn = document.getElementById("set-btn");
  const clearBtn = document.getElementById("clear-btn");

  let timerInterval;
  let currentTime = 0;
  let countdownTime = 0;
  let countdownSet = false;

  function formatTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  function updateDisplay() {
    timeDisplay.textContent = formatTime(currentTime);
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      currentTime++;
      updateDisplay();
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
  }

  function resetTimer() {
    clearInterval(timerInterval);
    currentTime = 0;
    updateDisplay();
  }

  stopwatchBtn.addEventListener("click", function () {
    countdownSet = false;
    clearInterval(timerInterval);
    resetTimer();
    setBtn.style.display = "none";
    startBtn.style.display = "inline-block";
    continueBtn.style.display = "none";
    pauseBtn.style.display = "none";
  });

  countdownBtn.addEventListener("click", function () {
    countdownSet = true;
    clearInterval(timerInterval);
    resetTimer();
    setBtn.style.display = "inline-block";
    startBtn.style.display = "none";
    continueBtn.style.display = "none";
    pauseBtn.style.display = "none";
  });

  startBtn.addEventListener("click", function () {
    startTimer();
    startBtn.style.display = "none";
    continueBtn.style.display = "inline-block";
    pauseBtn.style.display = "inline-block";
  });

  continueBtn.addEventListener("click", function () {
    startTimer();
    continueBtn.style.display = "none";
    pauseBtn.style.display = "inline-block";
  });

  pauseBtn.addEventListener("click", function () {
    stopTimer();
    continueBtn.style.display = "inline-block";
    pauseBtn.style.display = "none";
  });

  setBtn.addEventListener("click", function () {
    countdownSet = false;
    startBtn.style.display = "inline-block";
    continueBtn.style.display = "none";
    pauseBtn.style.display = "none";
    setBtn.style.display = "none";
    const hours = parseInt(timeDisplay.textContent.slice(0, 2));
    const minutes = parseInt(timeDisplay.textContent.slice(3, 5));
    const seconds = parseInt(timeDisplay.textContent.slice(6, 8));
    countdownTime = hours * 3600 + minutes * 60 + seconds;
    startTimer();
  });

  clearBtn.addEventListener("click", function () {
    clearInterval(timerInterval);
    currentTime = 0;
    updateDisplay();
  });

  document.querySelectorAll("#options button").forEach((button) => {
    button.addEventListener("click", () => {
      document.getElementById("control-buttons").style.display = "block";
      if (button.id === "stopwatch-btn") {
        countdownSet = false;
        clearInterval(timerInterval);
        resetTimer();
        setBtn.style.display = "none";
        startBtn.style.display = "inline-block";
        continueBtn.style.display = "none";
        pauseBtn.style.display = "none";
      } else if (button.id === "countdown-btn") {
        countdownSet = true;
        clearInterval(timerInterval);
        resetTimer();
        setBtn.style.display = "inline-block";
        startBtn.style.display = "none";
        continueBtn.style.display = "none";
        pauseBtn.style.display = "none";
      }
    });
  });

  document.querySelectorAll("#numbers button").forEach((button) => {
    button.addEventListener("click", () => {
      const currentText = timeDisplay.textContent;
      const buttonText = button.textContent;
      timeDisplay.textContent = currentText.slice(1) + buttonText;
    });
  });

  updateDisplay();
});
En este código, he creado funciones para iniciar, detener y restablecer el temporizador, y también para formatear el tiempo en formato "HH:MM:SS". Además, he manejado las interacciones con los botones según las especificaciones que proporcionaste. Si necesitas algún ajuste o explicación adicional, ¡házmelo saber!

User
Si, cuando esté en "Stopwatch" se deben ver solo 2 botones "Start/Stop/Continue" y "Clear"
El botón "Start/Stop/Continue" es un solo boton y cambia dependiendo de las acciones
Stop debe parar el stopwatch y continue lo debe reanudar.
Dame el html y el script.js nuevamente
ChatGPT
Aquí te dejo el HTML y el JavaScript actualizados según tus especificaciones:

HTML (index.html):

html
Copy code
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
<div id="options">
  <button id="stopwatch-btn">Stopwatch</button>
  <button id="countdown-btn">Countdown</button>
</div>
<div id="time-display">00:00:00</div>
<div id="control-buttons">
  <button id="start-stop-continue-btn">Start</button>
  <button id="clear-btn">Clear</button>
</div>
<script src="script.js"></script>
</body>
</html>
JavaScript (script.js):

javascript
Copy code
document.addEventListener("DOMContentLoaded", function () {
  const timeDisplay = document.getElementById("time-display");
  const stopwatchBtn = document.getElementById("stopwatch-btn");
  const countdownBtn = document.getElementById("countdown-btn");
  const startStopContinueBtn = document.getElementById("start-stop-continue-btn");
  const clearBtn = document.getElementById("clear-btn");

  let timerInterval;
  let currentTime = 0;
  let isRunning = false;

  function formatTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  function updateDisplay() {
    timeDisplay.textContent = formatTime(currentTime);
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      currentTime++;
      updateDisplay();
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
  }

  function toggleTimer() {
    if (isRunning) {
      stopTimer();
      startStopContinueBtn.textContent = "Start";
    } else {
      startTimer();
      startStopContinueBtn.textContent = "Stop";
    }
    isRunning = !isRunning;
  }

  function resetTimer() {
    clearInterval(timerInterval);
    currentTime = 0;
    updateDisplay();
    isRunning = false;
    startStopContinueBtn.textContent = "Start";
  }

  stopwatchBtn.addEventListener("click", function () {
    clearInterval(timerInterval);
    resetTimer();
    startStopContinueBtn.style.display = "inline-block";
    startStopContinueBtn.textContent = "Start";
    clearBtn.style.display = "inline-block";
  });

  countdownBtn.addEventListener("click", function () {
    clearInterval(timerInterval);
    resetTimer();
    startStopContinueBtn.style.display = "none";
    clearBtn.style.display = "inline-block";
  });

  startStopContinueBtn.addEventListener("click", toggleTimer);

  clearBtn.addEventListener("click", function () {
    resetTimer();
  });

  updateDisplay();
});
Ahora el botón "Start/Stop/Continue" cambia su texto según el estado del cronómetro y cuando estás en la opción "Stopwatch", solo se ven los botones "Start/Stop/Continue" y "Clear". Si necesitas más ajustes, ¡déjame saber!

User
Despues del Stop el boton debe decir continue.
Ademas, NO hay los botones numeriocs del 0 al 9 para setear el Countdown 
ChatGPT
Entendido, aquí está el código actualizado para que el botón diga "Continue" después de hacer clic en "Stop" y para eliminar los botones numéricos del 0 al 9 en la opción de "Countdown":

HTML (index.html):

html
Copy code
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
<div id="options">
  <button id="stopwatch-btn">Stopwatch</button>
  <button id="countdown-btn">Countdown</button>
</div>
<div id="time-display">00:00:00</div>
<div id="control-buttons">
  <button id="start-stop-continue-btn">Start</button>
  <button id="clear-btn">Clear</button>
</div>
<script src="script.js"></script>
</body>
</html>
JavaScript (script.js):

javascript
Copy code
document.addEventListener("DOMContentLoaded", function () {
  const timeDisplay = document.getElementById("time-display");
  const stopwatchBtn = document.getElementById("stopwatch-btn");
  const countdownBtn = document.getElementById("countdown-btn");
  const startStopContinueBtn = document.getElementById("start-stop-continue-btn");
  const clearBtn = document.getElementById("clear-btn");

  let timerInterval;
  let currentTime = 0;
  let isRunning = false;
  let isStopwatch = true;

  function formatTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  function updateDisplay() {
    timeDisplay.textContent = formatTime(currentTime);
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      currentTime++;
      updateDisplay();
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
  }

  function toggleTimer() {
    if (isRunning) {
      stopTimer();
      startStopContinueBtn.textContent = "Continue";
    } else {
      startTimer();
      startStopContinueBtn.textContent = "Stop";
    }
    isRunning = !isRunning;
  }

  function resetTimer() {
    clearInterval(timerInterval);
    currentTime = 0;
    updateDisplay();
    isRunning = false;
    startStopContinueBtn.textContent = "Start";
  }

  stopwatchBtn.addEventListener("click", function () {
    isStopwatch = true;
    clearInterval(timerInterval);
    resetTimer();
    startStopContinueBtn.style.display = "inline-block";
    startStopContinueBtn.textContent = "Start";
    clearBtn.style.display = "inline-block";
  });

  countdownBtn.addEventListener("click", function () {
    isStopwatch = false;
    clearInterval(timerInterval);
    resetTimer();
    startStopContinueBtn.style.display = "none";
    clearBtn.style.display = "inline-block";
  });

  startStopContinueBtn.addEventListener("click", function () {
    if (isStopwatch) {
      toggleTimer();
    } else {
      if (!isRunning) {
        startTimer();
        startStopContinueBtn.style.display = "none";
      }
    }
  });

  clearBtn.addEventListener("click", function () {
    resetTimer();
  });

  updateDisplay();
});
En este código, al hacer clic en "Stop" durante el cronómetro, el botón cambiará a "Continue". Además, se han eliminado los botones numéricos del 0 al 9 en la opción de "Countdown". Si necesitas más ajustes, házmelo saber.

User
Los botones del 0 al 9 deben aparecer al selecionar la opcion Countdown
Estos sirven para configurar el timeDisplay inicial para el Countdown
ChatGPT
Entiendo, aquí tienes el código actualizado para mostrar los botones del 0 al 9 al seleccionar la opción Countdown, y estos botones se utilizarán para configurar el tiempo inicial del Countdown:

HTML (index.html):

html
Copy code
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
<div id="options">
  <button id="stopwatch-btn">Stopwatch</button>
  <button id="countdown-btn">Countdown</button>
</div>
<div id="time-display">00:00:00</div>
<div id="numbers" style="display: none;">
  <button>0</button>
  <button>1</button>
  <button>2</button>
  <button>3</button>
  <button>4</button>
  <button>5</button>
  <button>6</button>
  <button>7</button>
  <button>8</button>
  <button>9</button>
  <button id="set-btn">Set</button>
</div>
<div id="control-buttons">
  <button id="start-stop-continue-btn">Start</button>
  <button id="clear-btn">Clear</button>
</div>
<script src="script.js"></script>
</body>
</html>
JavaScript (script.js):

javascript
Copy code
document.addEventListener("DOMContentLoaded", function () {
  const timeDisplay = document.getElementById("time-display");
  const stopwatchBtn = document.getElementById("stopwatch-btn");
  const countdownBtn = document.getElementById("countdown-btn");
  const numbersDiv = document.getElementById("numbers");
  const startStopContinueBtn = document.getElementById("start-stop-continue-btn");
  const clearBtn = document.getElementById("clear-btn");
  const setBtn = document.getElementById("set-btn");

  let timerInterval;
  let currentTime = 0;
  let countdownTime = 0;
  let isRunning = false;
  let isStopwatch = true;

  function formatTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  function updateDisplay() {
    timeDisplay.textContent = formatTime(currentTime);
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      if (isStopwatch) {
        currentTime++;
      } else {
        countdownTime--;
        if (countdownTime <= 0) {
          stopTimer();
          updateDisplay();
          return;
        }
      }
      updateDisplay();
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
  }

  function toggleTimer() {
    if (isRunning) {
      stopTimer();
      startStopContinueBtn.textContent = "Continue";
    } else {
      startTimer();
      startStopContinueBtn.textContent = "Stop";
    }
    isRunning = !isRunning;
  }

  function resetTimer() {
    clearInterval(timerInterval);
    currentTime = 0;
    countdownTime = 0;
    updateDisplay();
    isRunning = false;
    startStopContinueBtn.textContent = "Start";
  }

  stopwatchBtn.addEventListener("click", function () {
    isStopwatch = true;
    clearInterval(timerInterval);
    resetTimer();
    startStopContinueBtn.style.display = "inline-block";
    startStopContinueBtn.textContent = "Start";
    clearBtn.style.display = "inline-block";
    numbersDiv.style.display = "none";
  });

  countdownBtn.addEventListener("click", function () {
    isStopwatch = false;
    clearInterval(timerInterval);
    resetTimer();
    startStopContinueBtn.style.display = "none";
    clearBtn.style.display = "inline-block";
    numbersDiv.style.display = "block";
  });

  startStopContinueBtn.addEventListener("click", function () {
    if (isStopwatch) {
      toggleTimer();
    } else {
      if (!isRunning) {
        startTimer();
        startStopContinueBtn.style.display = "none";
      }
    }
  });

  clearBtn.addEventListener("click", function () {
    resetTimer();
  });

  setBtn.addEventListener("click", function () {
    const inputHours = parseInt(timeDisplay.textContent.slice(0, 2));
    const inputMinutes = parseInt(timeDisplay.textContent.slice(3, 5));
    const inputSeconds = parseInt(timeDisplay.textContent.slice(6, 8));
    countdownTime = inputHours * 3600 + inputMinutes * 60 + inputSeconds;
    startTimer();
    startStopContinueBtn.style.display = "none";
    numbersDiv.style.display = "none";
  });

  numbersDiv.addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
      const buttonText = event.target.textContent;
      timeDisplay.textContent = timeDisplay.textContent.slice(1) + buttonText;
    }
  });

  updateDisplay();
});
En este código, he agregado los botones numéricos del 0 al 9 para configurar el tiempo inicial del Countdown al seleccionar la opción "Countdown". Cuando se hace clic en "Set", se configura el tiempo y se ocultan los botones numéricos. Si necesitas más ajustes, házmelo saber.

User
Ok, despues de dar click a un numero el time-display se debe mantener de la forma 00:00:00 
si se da a un umero ejemplo 5 debe quedar 00:00:05

2 / 2

ChatGPT
Entiendo, para lograr eso, podemos ajustar la función que maneja los clics en los botones numéricos para actualizar el tiempo de manera adecuada. Aquí te dejo el código actualizado para lograrlo:

HTML (index.html):

html
Copy code
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
<div id="options">
  <button id="stopwatch-btn">Stopwatch</button>
  <button id="countdown-btn">Countdown</button>
</div>
<div id="time-display">00:00:00</div>
<div id="numbers" style="display: none;">
  <button>0</button>
  <button>1</button>
  <button>2</button>
  <button>3</button>
  <button>4</button>
  <button>5</button>
  <button>6</button>
  <button>7</button>
  <button>8</button>
  <button>9</button>
  <button id="set-btn">Set</button>
</div>
<div id="control-buttons">
  <button id="start-stop-continue-btn">Start</button>
  <button id="clear-btn">Clear</button>
</div>
<script src="script.js"></script>
</body>
</html>
JavaScript (script.js):

javascript
Copy code
document.addEventListener("DOMContentLoaded", function () {
  const timeDisplay = document.getElementById("time-display");
  const stopwatchBtn = document.getElementById("stopwatch-btn");
  const countdownBtn = document.getElementById("countdown-btn");
  const numbersDiv = document.getElementById("numbers");
  const startStopContinueBtn = document.getElementById("start-stop-continue-btn");
  const clearBtn = document.getElementById("clear-btn");
  const setBtn = document.getElementById("set-btn");

  let timerInterval;
  let currentTime = 0;
  let countdownTime = 0;
  let isRunning = false;
  let isStopwatch = true;

  function formatTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  function updateDisplay() {
    timeDisplay.textContent = formatTime(currentTime);
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      if (isStopwatch) {
        currentTime++;
      } else {
        countdownTime--;
        if (countdownTime <= 0) {
          stopTimer();
          updateDisplay();
          return;
        }
      }
      updateDisplay();
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
  }

  function toggleTimer() {
    if (isRunning) {
      stopTimer();
      startStopContinueBtn.textContent = "Continue";
    } else {
      startTimer();
      startStopContinueBtn.textContent = "Stop";
    }
    isRunning = !isRunning;
  }

  function resetTimer() {
    clearInterval(timerInterval);
    currentTime = 0;
    countdownTime = 0;
    updateDisplay();
    isRunning = false;
    startStopContinueBtn.textContent = "Start";
  }

  stopwatchBtn.addEventListener("click", function () {
    isStopwatch = true;
    clearInterval(timerInterval);
    resetTimer();
    startStopContinueBtn.style.display = "inline-block";
    startStopContinueBtn.textContent = "Start";
    clearBtn.style.display = "inline-block";
    numbersDiv.style.display = "none";
  });

  countdownBtn.addEventListener("click", function () {
    isStopwatch = false;
    clearInterval(timerInterval);
    resetTimer();
    startStopContinueBtn.style.display = "none";
    clearBtn.style.display = "inline-block";
    numbersDiv.style.display = "block";
  });

  startStopContinueBtn.addEventListener("click", function () {
    if (isStopwatch) {
      toggleTimer();
    } else {
      if (!isRunning) {
        startTimer();
        startStopContinueBtn.style.display = "none";
      }
    }
  });

  clearBtn.addEventListener("click", function () {
    resetTimer();
  });

  setBtn.addEventListener("click", function () {
    const inputSeconds = parseInt(timeDisplay.textContent.slice(6, 8));
    countdownTime = inputSeconds;
    startTimer();
    startStopContinueBtn.style.display = "none";
    numbersDiv.style.display = "none";
  });

  numbersDiv.addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
      const buttonText = event.target.textContent;
      timeDisplay.textContent = `00:00:${buttonText.padStart(2, "0")}`;
    }
  });

  updateDisplay();
});
Ahora, al hacer clic en un número en la opción Countdown, el timeDisplay se actualizará adecuadamente manteniendo el formato "00:00:00" para el tiempo restante del Countdown. Si necesitas más ajustes o alguna otra funcionalidad, házmelo saber.

User
No esta funcionando
Uiliza esta funcion para ajustar la funcion que maneja los clics de los botones numericos:   function updateCountdownDisplay(btnValue) {
    let currentDisplay = countdownDisplay.textContent.replace(/:/g, '');
  
    currentDisplay = currentDisplay.substring(1);
    currentDisplay += btnValue;
  
    const formattedDisplay = currentDisplay.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3');
  
    countdownDisplay.textContent = formattedDisplay;
  }  
ChatGPT
Entendido, voy a integrar la función updateCountdownDisplay que has proporcionado para ajustar la función que maneja los clics de los botones numéricos en la opción Countdown. Aquí tienes el código actualizado:

HTML (index.html):

html
Copy code
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
<div id="options">
  <button id="stopwatch-btn">Stopwatch</button>
  <button id="countdown-btn">Countdown</button>
</div>
<div id="time-display">00:00:00</div>
<div id="numbers" style="display: none;">
  <button>0</button>
  <button>1</button>
  <button>2</button>
  <button>3</button>
  <button>4</button>
  <button>5</button>
  <button>6</button>
  <button>7</button>
  <button>8</button>
  <button>9</button>
  <button id="set-btn">Set</button>
</div>
<div id="control-buttons">
  <button id="start-stop-continue-btn">Start</button>
  <button id="clear-btn">Clear</button>
</div>
<script src="script.js"></script>
</body>
</html>
JavaScript (script.js):

javascript
Copy code
document.addEventListener("DOMContentLoaded", function () {
  const timeDisplay = document.getElementById("time-display");
  const stopwatchBtn = document.getElementById("stopwatch-btn");
  const countdownBtn = document.getElementById("countdown-btn");
  const numbersDiv = document.getElementById("numbers");
  const startStopContinueBtn = document.getElementById("start-stop-continue-btn");
  const clearBtn = document.getElementById("clear-btn");
  const setBtn = document.getElementById("set-btn");

  let timerInterval;
  let currentTime = 0;
  let countdownTime = 0;
  let isRunning = false;
  let isStopwatch = true;

  function formatTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  function updateDisplay() {
    timeDisplay.textContent = formatTime(currentTime);
  }

  function updateCountdownDisplay(btnValue) {
    let currentDisplay = timeDisplay.textContent.replace(/:/g, '');
    currentDisplay = currentDisplay.substring(1);
    currentDisplay += btnValue;
    const formattedDisplay = currentDisplay.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3');
    timeDisplay.textContent = formattedDisplay;
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      if (isStopwatch) {
        currentTime++;
      } else {
        countdownTime--;
        if (countdownTime <= 0) {
          stopTimer();
          updateDisplay();
          return;
        }
      }
      updateDisplay();
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
  }

  function toggleTimer() {
    if (isRunning) {
      stopTimer();
      startStopContinueBtn.textContent = "Continue";
    } else {
      startTimer();
      startStopContinueBtn.textContent = "Stop";
    }
    isRunning = !isRunning;
  }

  function resetTimer() {
    clearInterval(timerInterval);
    currentTime = 0;
    countdownTime = 0;
    updateDisplay();
    isRunning = false;
    startStopContinueBtn.textContent = "Start";
  }

  stopwatchBtn.addEventListener("click", function () {
    isStopwatch = true;
    clearInterval(timerInterval);
    resetTimer();
    startStopContinueBtn.style.display = "inline-block";
    startStopContinueBtn.textContent = "Start";
    clearBtn.style.display = "inline-block";
    numbersDiv.style.display = "none";
  });

  countdownBtn.addEventListener("click", function () {
    isStopwatch = false;
    clearInterval(timerInterval);
    resetTimer();
    startStopContinueBtn.style.display = "none";
    clearBtn.style.display = "inline-block";
    numbersDiv.style.display = "block";
  });

  startStopContinueBtn.addEventListener("click", function () {
    if (isStopwatch) {
      toggleTimer();
    } else {
      if (!isRunning) {
        startTimer();
        startStopContinueBtn.style.display = "none";
      }
    }
  });

  clearBtn.addEventListener("click", function () {
    resetTimer();
  });

  setBtn.addEventListener("click", function () {
    const inputSeconds = parseInt(timeDisplay.textContent.slice(6, 8));
    countdownTime = inputSeconds;
    startTimer();
    startStopContinueBtn.style.display = "none";
    numbersDiv.style.display = "none";
  });

  numbersDiv.addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
      const buttonText = event.target.textContent;
      updateCountdownDisplay(buttonText);
    }
  });

  updateDisplay();
});
Ahora, al hacer clic en un número en la opción Countdown, el timeDisplay se actualizará adecuadamente manteniendo el formato "00:00:00" para el tiempo restante del Countdown. Si necesitas más ajustes o alguna otra funcionalidad, házmelo saber.





