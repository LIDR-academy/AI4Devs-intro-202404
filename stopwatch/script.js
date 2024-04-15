// DOM elements
const mainView = document.getElementById("main-view");
const stopwatchBtn = document.getElementById("stopwatch-btn");
const countdownBtn = document.getElementById("countdown-btn");
const stopwatchView = document.getElementById("stopwatch-view");
const countdownSetupView = document.getElementById("countdown-setup-view");
const countdownView = document.getElementById("countdown-view");
const stopwatchTimeDisplay = document.getElementById("stopwatch-time");
const countdownInputDisplay = document.getElementById("countdown-time-setup");
const startStopBtn = document.getElementById("start-stop-btn");
const resetStopwatchBtn = document.getElementById("reset-btn");
const numButtons = document.querySelectorAll(".num-btn");
const setCountdownBtn = document.getElementById("set-btn");
const clearSetupBtn = document.getElementById("clear-setup");
const startCountdownBtn = document.getElementById("start-countdown");
const resetCountdownBtn = document.getElementById("reset-countdown");
const backStopwatchBtn = document.getElementById("back-stopwatch");
const backCountdownSetupBtn = document.getElementById("back-countdown-setup");
const backCountdownBtn = document.getElementById("back-countdown");
const countdownDisplay = document.getElementById("countdown-display");

// Stopwatch Variables
let stopwatchInterval;
let stopwatchRunning = false;
let elapsedTime = 0;
let startTime;

// Countdown Variables
let countdownInterval;
let countdownTime = "";
let originalCountdown;
let isCountdownRunning = false;
let countdownRemainingTime; // Aquí almacenamos el tiempo restante en segundos.
let initialCountdownTime; // Tiempo inicial configurado para la cuenta atrás.
let isCountdownPaused = false;

// Stopwatch Functions
function updateTime() {
  const now = new Date(Date.now() - startTime + elapsedTime);
  const hours = now.getUTCHours().toString().padStart(2, "0");
  const minutes = now.getUTCMinutes().toString().padStart(2, "0");
  const seconds = now.getUTCSeconds().toString().padStart(2, "0");
  const milliseconds = now.getUTCMilliseconds().toString().padStart(3, "0");
  stopwatchTimeDisplay.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function initializeCountdown(totalSeconds) {
  initialCountdownTime = totalSeconds;
  countdownRemainingTime = totalSeconds; // Restablecer el tiempo restante al inicial
  updateCountdownDisplay(); // Actualiza el display con el nuevo tiempo
}

function toggleStopwatch() {
  if (!stopwatchRunning) {
    startTime = new Date(Date.now() - elapsedTime);
    stopwatchInterval = setInterval(updateTime, 1);
    startStopBtn.textContent = "Pause";
    resetStopwatchBtn.disabled = true;
  } else {
    elapsedTime = Date.now() - startTime + elapsedTime;
    clearInterval(stopwatchInterval);
    startStopBtn.textContent = "Start";
    resetStopwatchBtn.disabled = false;
  }
  stopwatchRunning = !stopwatchRunning;
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
  elapsedTime = 0;
  stopwatchTimeDisplay.textContent = "00:00:00.000";
  startStopBtn.textContent = "Start";
  resetStopwatchBtn.disabled = true;
}

// Countdown Functions
function updateCountdownInputDisplay() {
  let displayTime = countdownTime.padStart(4, "0");
  displayTime = displayTime.slice(0, 2) + ":" + displayTime.slice(2, 4);
  countdownInputDisplay.textContent = displayTime;
}

function startCountdown() {
  if (!isCountdownRunning) {
    countdownInterval = setInterval(() => {
      countdownRemainingTime--;
      if (countdownRemainingTime < 0) {
        clearInterval(countdownInterval);
        alert("Countdown finished!");
        resetCountdown(true);
        return;
      }
      updateCountdownDisplay();
    }, 1000);
    isCountdownRunning = true;
    resetCountdownBtn.disabled = true; // Deshabilitar cuando la cuenta atrás está activa
    startCountdownBtn.textContent = "Pause";
  } else {
    toggleCountdownPause();
  }
}

function toggleCountdownPause() {
  if (isCountdownRunning) {
    clearInterval(countdownInterval);
    startCountdownBtn.textContent = "Continue";
    isCountdownRunning = false;
    resetCountdownBtn.disabled = false; // Habilitar cuando la cuenta atrás está pausada
  } else {
    startCountdown(); // Continuar desde el tiempo restante.
  }
}

function updateCountdownDisplay() {
  if (countdownRemainingTime >= 0) {
    let hours = Math.floor(countdownRemainingTime / 3600);
    let minutes = Math.floor((countdownRemainingTime % 3600) / 60);
    let seconds = countdownRemainingTime % 60;

    countdownDisplay.textContent = `${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  } else {
    countdownDisplay.textContent = "00:00:00"; // Mostrar esto si el tiempo restante es negativo.
  }
}

function resetCountdown(finished = false) {
  clearInterval(countdownInterval);
  countdownRemainingTime = initialCountdownTime; // Restaurar el tiempo inicial siempre.
  countdownTime = ""; // Limpiar la entrada de usuario.
  updateCountdownInputDisplay();
  updateCountdownDisplay();
  startCountdownBtn.textContent = "Start";
  resetCountdownBtn.disabled = true; // Deshabilitar "Clear" hasta que inicie de nuevo.
  isCountdownRunning = false;
}

// Event Listeners
stopwatchBtn.addEventListener("click", () =>
  switchView(mainView, stopwatchView)
);
countdownBtn.addEventListener("click", () => {
  switchView(mainView, countdownSetupView);
  resetCountdown();
});
backStopwatchBtn.addEventListener("click", () => {
  switchView(stopwatchView, mainView);
  resetStopwatch();
});
backCountdownSetupBtn.addEventListener("click", () =>
  switchView(countdownSetupView, mainView)
);
backCountdownBtn.addEventListener("click", () => {
  switchView(countdownView, mainView);
  resetCountdown();
});
startStopBtn.addEventListener("click", toggleStopwatch);
resetStopwatchBtn.addEventListener("click", resetStopwatch);
numButtons.forEach((button) =>
  button.addEventListener("click", () => {
    if (countdownTime.length < 4) {
      countdownTime += button.textContent;
      updateCountdownInputDisplay();
    }
  })
);
setCountdownBtn.addEventListener("click", () => {
  if (countdownTime.length) {
    // Asegurarse de que hay suficiente entrada
    const inputArray = countdownTime.split("").reverse();
    const seconds =
      parseInt(inputArray.slice(0, 2).reverse().join(""), 10) || 0;
    const minutes =
      parseInt(inputArray.slice(2, 4).reverse().join(""), 10) || 0;
    const hours = parseInt(inputArray.slice(4, 6).reverse().join(""), 10) || 0;

    // Calcular el total de segundos para la cuenta atrás
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    initializeCountdown(totalSeconds); // Llamar a la función para inicializar la cuenta atrás

    // Mostrar la configuración del tiempo en el formato HH:MM:SS
    countdownInputDisplay.textContent = new Date(totalSeconds * 1000)
      .toISOString()
      .substr(11, 8);

    // Ocultar vista de configuración y mostrar la vista de cuenta atrás con el tiempo establecido
    switchView(countdownSetupView, countdownView);
    countdownDisplay.textContent = countdownInputDisplay.textContent;
  }
});

clearSetupBtn.addEventListener("click", () => {
  countdownTime = "";
  updateCountdownInputDisplay();
});

startCountdownBtn.addEventListener("click", startCountdown);

resetCountdownBtn.addEventListener("click", resetCountdown);

// Helper Functions
function switchView(hide, show) {
  hide.style.display = "none";
  show.style.display = "block";
}
