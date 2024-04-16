// Variables para almacenar referencias de los intervalos
let countdownInterval;
let stopwatchInterval;

// Función para iniciar el cronómetro
function startStopwatch() {
    const startTime = Date.now();
    stopwatchInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        document.getElementById('timer').textContent = formatTime(elapsedTime);
    }, 1000);
}

// Función para iniciar la cuenta atrás
function startCountdown(duration = 300) { // 5 minutes by default
    const endTime = Date.now() + duration * 1000;
    countdownInterval = setInterval(() => {
        const remainingTime = endTime - Date.now();
        document.getElementById('timer').textContent = formatTime(remainingTime);
        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            document.getElementById('timer').textContent = '00:00:00';
        }
    }, 1000);
}

// Función para detener el cronómetro/cuenta atrás
function stopTimer() {
    clearInterval(stopwatchInterval);
    clearInterval(countdownInterval);
}

// Función para formatear el tiempo en hh:mm:ss
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

// Función para limpiar el cronómetro/cuenta atrás
function clearTimer() {
    stopTimer();
    document.getElementById('timer').textContent = '00:00:00';
}

