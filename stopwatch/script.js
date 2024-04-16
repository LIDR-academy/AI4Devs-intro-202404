// script.js
document.getElementById('btnCronometro').addEventListener('click', function() {
    document.getElementById('cronometro').style.display = 'block';
    document.getElementById('cuentaAtras').style.display = 'none';
});

document.getElementById('btnCuentaAtras').addEventListener('click', function() {
    document.getElementById('cronometro').style.display = 'none';
    document.getElementById('cuentaAtras').style.display = 'block';
});


// Variables para el cronómetro
let cronometroTime = 0;
let cronometroRunning = false;

function startCronometro() {
    if (!cronometroRunning) {
        cronometroRunning = true;
        cronometroInterval = setInterval(function() {
            cronometroTime += 10;  // Incrementar en 10 milisegundos
            let milliseconds = cronometroTime % 1000;
            let seconds = Math.floor(cronometroTime / 1000) % 60;
            let minutes = Math.floor((cronometroTime / (1000 * 60)) % 60);
            let hours = Math.floor((cronometroTime / (1000 * 60 * 60)) % 24);
            document.querySelector('#cronometro h1').textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
            document.querySelector('#cronometro p').textContent = milliseconds;
        }, 10);
        document.getElementById('startStop').textContent = 'Pausar';
    } else {
        clearInterval(cronometroInterval);
        cronometroRunning = false;
        document.getElementById('startStop').textContent = 'Continuar';
    }
}

function resetCronometro() {
    clearInterval(cronometroInterval);
    cronometroTime = 0;
    document.querySelector('#cronometro h1').textContent = '00:00:00';
    document.querySelector('#cronometro p').textContent = '0';
    document.getElementById('startStop').textContent = 'Comenzar';
    cronometroRunning = false;
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}

document.getElementById('startStop').addEventListener('click', startCronometro);
document.getElementById('reset').addEventListener('click', resetCronometro);


// JavaScript para la Cuenta Atrás

let cuentaAtrasInterval;
let cuentaAtrasTime = 0; // Tiempo en milisegundos
let cuentaAtrasRunning = false;

document.querySelectorAll('#numPad button').forEach(button => {
    button.addEventListener('click', function() {
        if (cuentaAtrasTime.toString().length < 6) {
            cuentaAtrasTime = cuentaAtrasTime * 10 + parseInt(button.textContent, 10);
            updateCuentaAtrasDisplayRaw();
        }
    });
});

// Función para iniciar o pausar la cuenta atrás
function startCountdown() {
    if (!cuentaAtrasRunning) {
        cuentaAtrasRunning = true;
        document.getElementById('startStopCountdown').textContent = 'Pausar';
        cuentaAtrasInterval = setInterval(() => {
            cuentaAtrasTime -= 10; // Decrementa 10 ms en cada intervalo
            if (cuentaAtrasTime <= 0) {
                clearInterval(cuentaAtrasInterval);
                cuentaAtrasTime = 0;
                cuentaAtrasRunning = false;
                document.getElementById('startStopCountdown').textContent = 'Comenzar';
            }
            updateCuentaAtrasDisplay(); // Actualiza la visualización cada 10 ms
        }, 10);
    } else {
        clearInterval(cuentaAtrasInterval);
        cuentaAtrasRunning = false;
        document.getElementById('startStopCountdown').textContent = 'Comenzar';
    }
}

// Función para resetear el timer
function resetTimer() {
    clearInterval(cuentaAtrasInterval);
    cuentaAtrasTime = 0;
    updateCuentaAtrasDisplay();
    cuentaAtrasRunning = false;
    document.getElementById('startStopCountdown').textContent = 'Comenzar';
}

function updateCuentaAtrasDisplayRaw() {
    let formattedTime = cuentaAtrasTime.toString().padStart(6, '0');
    document.querySelector('#cuentaAtras h1').textContent = formattedTime.slice(0,2) + ':' + formattedTime.slice(2,4) + ':' + formattedTime.slice(4,6);
}

// Función para actualizar la visualización del tiempo
function updateCuentaAtrasDisplay() {
    let totalMilliseconds = cuentaAtrasTime;
    let hours = Math.floor(totalMilliseconds / 3600000);
    let minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
    let seconds = Math.floor((totalMilliseconds % 60000) / 1000);
    let milliseconds = totalMilliseconds % 1000;

    document.querySelector('#cuentaAtras h1').textContent = `${numberPad(hours)}:${numberPad(minutes)}:${numberPad(seconds)}`;
    document.querySelector('#cuentaAtras p').textContent = numberPadMillis(milliseconds);
}

function numberPad(number) {
    return number.toString().padStart(2, '0');
}

function numberPadMillis(number) {
    return number.toString().padStart(3, '0');
}

function setTimer() {
    // Procesar la entrada numérica y ajustar las horas, minutos y segundos
    let rawTime = cuentaAtrasTime.toString().padStart(6, '0');
    let hours = parseInt(rawTime.slice(0,2), 10);
    let minutes = parseInt(rawTime.slice(2,4), 10);
    let seconds = parseInt(rawTime.slice(4,6), 10);

    // Ajustar minutos y segundos según las reglas descritas
    minutes += Math.floor(seconds / 60);
    seconds %= 60;
    hours += Math.floor(minutes / 60);
    minutes %= 60;

    // Actualizar la visualización con el formato correcto
    document.querySelector('#cuentaAtras h1').textContent = `${numberPad(hours)}:${numberPad(minutes)}:${numberPad(seconds)}`;

    // Ocultar numPad y botón Settear
    document.getElementById('numPad').style.display = 'none';
    document.getElementById('setTimer').style.display = 'none';

    // Mostrar botones de Comenzar y Limpiar
    document.getElementById('startStopCountdown').style.display = 'inline';
    document.getElementById('resetTimer').style.display = 'inline';

    // Guardar los valores ajustados como segundos totales para la cuenta regresiva
    cuentaAtrasTime = hours * 3600 + minutes * 60 + seconds;
}

document.getElementById('setTimer').addEventListener('click', setTimer);
document.getElementById('resetTimer').addEventListener('click', resetTimer);
document.getElementById('startStopCountdown').addEventListener('click', startCountdown);