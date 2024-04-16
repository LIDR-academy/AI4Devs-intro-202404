// Variables para el cronómetro
let timerInterval;
let timerRunning = false;
let timerStartTime;
let timerElapsedTime = 0;

// Variables para la cuenta regresiva
let countdownInterval;
let countdownRunning = false;
let countdownStartTime;
let countdownDuration = 0;

// Función para actualizar el cronómetro
function updateTimer() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - timerStartTime + timerElapsedTime;
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000));

    document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
    document.getElementById('milliseconds').innerText = milliseconds.toString().padStart(3, '0');
}

// Función para iniciar el cronómetro
function startTimer() {
    if (!timerRunning) {
        timerStartTime = new Date().getTime();
        timerInterval = setInterval(updateTimer, 10);
        timerRunning = true;
        document.getElementById('startPauseTimerBtn').innerText = 'Pause';
    } else {
        clearInterval(timerInterval);
        timerElapsedTime += new Date().getTime() - timerStartTime;
        timerRunning = false;
        document.getElementById('startPauseTimerBtn').innerText = 'Continue';
    }
}

// Función para reiniciar el cronómetro
function clearTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    timerElapsedTime = 0;
    updateTimer();
    document.getElementById('startPauseTimerBtn').innerText = 'Start';
}

// Función para actualizar la cuenta regresiva
function updateCountdown() {
    const currentTime = new Date().getTime();
    const elapsedTime = countdownStartTime - currentTime;
    if (elapsedTime <= 0) {
        clearInterval(countdownInterval);
        countdownRunning = false;
        document.getElementById('startPauseCountdownBtn').innerText = 'Start';
        updateCountdownDisplay(0);
    } else {
        updateCountdownDisplay(elapsedTime);
    }
}

// Función para actualizar la visualización de la cuenta regresiva
function updateCountdownDisplay(time) {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    document.getElementById('countdownHours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('countdownMinutes').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('countdownSeconds').innerText = seconds.toString().padStart(2, '0');
}

// Función para iniciar la cuenta regresiva
function startCountdown() {
    if (!countdownRunning) {
        countdownStartTime = new Date().getTime() + countdownDuration;
        countdownInterval = setInterval(updateCountdown, 10);
        countdownRunning = true;
        document.getElementById('startPauseCountdownBtn').innerText = 'Pause';
    } else {
        clearInterval(countdownInterval);
        countdownRunning = false;
        document.getElementById('startPauseCountdownBtn').innerText = 'Continue';
    }
}

// Función para reiniciar la cuenta regresiva
function clearCountdown() {
    clearInterval(countdownInterval);
    countdownRunning = false;
    countdownDuration = 0;
    updateCountdownDisplay(0);
    document.getElementById('startPauseCountdownBtn').innerText = 'Start';
}

// Función para mostrar el teclado numérico
function showNumericKeyboard() {
    const numericKeyboard = document.getElementById('numericKeyboard');
    numericKeyboard.innerHTML = '';

    for (let i = 0; i <= 9; i++) {
        const button = document.createElement('button');
        button.textContent = i.toString();
        button.classList.add('button', 'bg-green-500', 'hover:bg-green-600', 'text-white', 'rounded-lg', 'p-4');
        button.addEventListener('click', () => {
            countdownDuration = countdownDuration * 10 + i;
            updateCountdownDisplay(countdownDuration);
        });
        numericKeyboard.appendChild(button);
    }

    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear';
    clearButton.classList.add('button', 'bg-red-500', 'hover:bg-red-600', 'text-white', 'rounded-lg', 'p-4');
    clearButton.addEventListener('click', () => {
        countdownDuration = 0;
        updateCountdownDisplay(countdownDuration);
    });
    numericKeyboard.appendChild(clearButton);

    const setButton = document.createElement('button');
    setButton.textContent = 'Set';
    setButton.classList.add('button', 'bg-green-500', 'hover:bg-green-600', 'text-white', 'rounded-lg', 'p-4');
    setButton.addEventListener('click', () => {
        numericKeyboard.style.display = 'none';
        document.getElementById('countdownControls').style.display = 'flex';
    });
    numericKeyboard.appendChild(setButton);

    numericKeyboard.style.display = 'flex';
}

// Función para volver a la pantalla principal
function backToMain() {
    document.getElementById('timerContainer').style.display = 'none';
    document.getElementById('countdownContainer').style.display = 'none';
    document.getElementById('main').style.display = 'flex';
    document.getElementById('backBtn').style.display = 'none'; // Ocultar el botón Back al regresar a la pantalla principal
}

// Event listeners
document.getElementById('timerBtn').addEventListener('click', () => {
    document.getElementById('main').style.display = 'none';
    document.getElementById('timerContainer').style.display = 'block';
    document.getElementById('backBtn').style.display = 'block'; // Mostrar el botón Back al entrar en la pantalla del cronómetro
});

document.getElementById('countdownBtn').addEventListener('click', () => {
    document.getElementById('main').style.display = 'none';
    document.getElementById('countdownContainer').style.display = 'block';
    document.getElementById('backBtn').style.display = 'block'; // Mostrar el botón Back al entrar en la pantalla de la cuenta regresiva
});

document.getElementById('startPauseTimerBtn').addEventListener('click', startTimer);
document.getElementById('clearTimerBtn').addEventListener('click', clearTimer);

document.getElementById('startPauseCountdownBtn').addEventListener('click', startCountdown);
document.getElementById('clearCountdownBtn').addEventListener('click', clearCountdown);

document.getElementById('backBtn').addEventListener('click', backToMain);

document.getElementById('countdownDisplay').addEventListener('click', showNumericKeyboard);
