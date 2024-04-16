// script.js
let buttonText = 'Iniciar'; // Initially set to "Iniciar"

const principalDiv = document.getElementById('principal-div');
const stopwatchDiv = document.getElementById('stopwatch-div');
const countdownDiv = document.getElementById('countdown-div');

const volverStopwatchBtn = document.getElementById('volver-stopwatch');
const volverCountdownBtn = document.getElementById('volver-countdown');

// Función para mostrar el div principal y ocultar los demás
function mostrarPrincipal() {
    principalDiv.style.display = 'flex';
    stopwatchDiv.style.display = 'none';
    countdownDiv.style.display = 'none';
}

// Función para mostrar el stopwatch y ocultar los demás
function mostrarStopwatch() {
    principalDiv.style.display = 'none';
    stopwatchDiv.style.display = 'flex';
    countdownDiv.style.display = 'none';
}

// Función para mostrar el countdown y ocultar los demás
function mostrarCountdown() {
    principalDiv.style.display = 'none';
    stopwatchDiv.style.display = 'none';
    countdownDiv.style.display = 'flex';
}

// Eventos de click para los botones
principalDiv.addEventListener('click', (event) => {
    isRunning = false;
    if (event.target.classList.contains('stopwatch-btn')) {
        mostrarStopwatch();
    } else if (event.target.classList.contains('countdown-btn')) {
        mostrarCountdown();
    }
});

volverStopwatchBtn.addEventListener('click', mostrarPrincipal);
volverCountdownBtn.addEventListener('click', mostrarPrincipal);


const stopwatchDisplay = document.querySelector('.stopwatch-display');
const startStopwatchBtn = document.getElementById('start-stopwatch');
const resetStopwatchBtn = document.getElementById('reset-stopwatch');

let intervalId;
let elapsedTime = 0;
let isRunning = false;

// Función para actualizar el display del cronómetro
function updateDisplay() {
    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = elapsedTime % 1000;

    stopwatchDisplay.querySelector('.hours').textContent = hours.toString().padStart(2, '0');
    stopwatchDisplay.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
    stopwatchDisplay.querySelector('.seconds').textContent = seconds.toString().padStart(2, '0');
    stopwatchDisplay.querySelector('.milliseconds').textContent = milliseconds.toString().padStart(3, '0');
}

// Call updateDisplay initially to show "00:00:00.000"
updateDisplay();


// Función para iniciar el cronómetro
function startStopwatch() {
   //funcion para iniciar, pausar y reanudar el cronometro con el mismo boton startStopwatchBtn usando la variable buttonText
    if (buttonText === 'Iniciar') {
        if (isRunning) return; // If the stopwatch is already running, return
        intervalId = setInterval(() => {
            elapsedTime += 10; // Increment elapsed time by 10 milliseconds
            updateDisplay(); // Update display with new elapsed time
        }, 10);
        buttonText = 'Pausar'; // Change button text to "Pausar"
        startStopwatchBtn.textContent = buttonText; // Update button text
        isRunning = true;
    } else if (buttonText === 'Pausar') {
        clearInterval(intervalId); // Clear interval to stop the stopwatch
        buttonText = 'Reanudar'; // Change button text to "Reanudar"
        startStopwatchBtn.textContent = buttonText; // Update button text
        isRunning = false;
    } else if (buttonText === 'Reanudar') {
        intervalId = setInterval(() => {
            elapsedTime += 10; // Increment elapsed time by 10 milliseconds
            updateDisplay(); // Update display with new elapsed time
        }, 10);
        buttonText = 'Pausar'; // Change button text to "Pausar"
        startStopwatchBtn.textContent = buttonText; // Update button text
        isRunning = true;
    }
}


// Function to reset the stopwatch
function resetStopwatch() {
    elapsedTime = 0;
    updateDisplay(); // Update display to show "00:00:00.000"
    buttonText = 'Iniciar'; // Reset button text to "Iniciar"
    startStopwatchBtn.textContent = buttonText; // Update button text
    startStopwatchBtn.disabled = false; // Enable button
    isRunning = false;
    clearInterval(intervalId);
}

// Eventos de click para los botones
startStopwatchBtn.addEventListener('click', startStopwatch);
resetStopwatchBtn.addEventListener('click', resetStopwatch);

