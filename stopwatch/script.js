document.addEventListener("DOMContentLoaded", function() {
  const timerBtn = document.getElementById("timer-btn");
  const countdownBtn = document.getElementById("countdown-btn");
  const timerSection = document.getElementById("timer-section");
  const countdownSection = document.getElementById("countdown-section");
  const startPauseBtn = document.getElementById("start-pause-btn");
  const clearTimerBtn = document.getElementById("clear-timer-btn");
  const countdownInput = document.getElementById("countdown-input");
  const startCountdownBtn = document.getElementById("start-countdown-btn");
  const clearCountdownBtn = document.getElementById("clear-countdown-btn");

  let timerInterval;
  let countdownInterval;
  let startTime;
  let elapsedTime = 0; // Variable para almacenar el tiempo transcurrido de la cuenta regresiva mientras está pausada
  let countdownTime;

  timerBtn.addEventListener("click", function() {
    timerSection.classList.remove("hidden");
    countdownSection.classList.add("hidden");
    clearInterval(countdownInterval);
    resetCountdownDisplay();
  });

  countdownBtn.addEventListener("click", function() {
    countdownSection.classList.remove("hidden");
    timerSection.classList.add("hidden");
    clearInterval(timerInterval);
    resetTimerDisplay();
  });

  startPauseBtn.addEventListener("click", function() {
    if (timerSection.classList.contains("hidden")) {
      handleCountdownButton();
    } else {
      handleTimerButton();
    }
  });

  clearTimerBtn.addEventListener("click", function() {
    clearInterval(timerInterval);
    resetTimerDisplay();
    startPauseBtn.textContent = "Iniciar";
  });

  startCountdownBtn.addEventListener("click", function() {
    handleCountdownButton();
  });

  clearCountdownBtn.addEventListener("click", function() {
    clearInterval(countdownInterval);
    resetCountdownDisplay();
    countdownInput.value = "";
    startCountdownBtn.textContent = "Iniciar";
  });

  function handleTimerButton() {
    if (startPauseBtn.textContent === "Iniciar") {
      startTimer();
    } else if (startPauseBtn.textContent === "Pausa") {
      pauseTimer();
    } else if (startPauseBtn.textContent === "Continuar") {
      resumeTimer();
    }
  }

  function handleCountdownButton() {
    if (startCountdownBtn.textContent === "Iniciar") {
      startCountdown();
    } else if (startCountdownBtn.textContent === "Pausa") {
      pauseCountdown();
    } else if (startCountdownBtn.textContent === "Continuar") {
      resumeCountdown();
    }
  }

  function startTimer() {
    if (elapsedTime === 0) {
      startTime = Date.now();
    } else {
      startTime = Date.now() - elapsedTime; // Se ajusta el tiempo inicial para reanudar desde el momento de la pausa
    }
    timerInterval = setInterval(function() {
      let currentTime = Date.now();
      elapsedTime = currentTime - startTime; // Se almacena el tiempo transcurrido
      updateTimerDisplay(elapsedTime);
    }, 10);
    startPauseBtn.textContent = "Pausa";
    startPauseBtn.classList.add("pause");
  }

  function pauseTimer() {
    clearInterval(timerInterval);
    startPauseBtn.textContent = "Continuar";
    startPauseBtn.classList.remove("pause");
  }

  function resumeTimer() {
    startTimer();
  }

  function resetTimerDisplay() {
    document.getElementById("timer-display").textContent = "00:00:00.000";
  }

  function updateTimerDisplay(elapsedTime) {
    let milliseconds = Math.floor(elapsedTime % 1000);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

    milliseconds = pad(milliseconds, 3);
    seconds = pad(seconds, 2);
    minutes = pad(minutes, 2);
    hours = pad(hours, 2);

    document.getElementById("timer-display").textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  function startCountdown() {
    if (startCountdownBtn.textContent === "Iniciar") {
      countdownTime = countdownInput.value * 1000;
      if (!countdownTime || countdownTime <= 0) {
        alert("Ingrese un tiempo válido para la cuenta regresiva.");
        return;
      }
      startTime = Date.now(); // Iniciar desde el tiempo actual
    } else if (startCountdownBtn.textContent === "Continuar") {
      startTime = Date.now() - elapsedTime; // Reanudar desde donde quedó pausado
    }
  
    countdownInterval = setInterval(function() {
      let currentTime = Date.now();
      elapsedTime = currentTime - startTime; // Se almacena el tiempo transcurrido
      countdownTime = countdownInput.value * 1000 - elapsedTime; // Se ajusta el tiempo restante
      if (countdownTime <= 0) {
        clearInterval(countdownInterval);
        resetCountdownDisplay();
        startCountdownBtn.textContent = "Iniciar";
        return;
      }
      updateCountdownDisplay(countdownTime);
    }, 10);
    startCountdownBtn.textContent = "Pausa";
  }   

  function pauseCountdown() {
    clearInterval(countdownInterval);
    startCountdownBtn.textContent = "Continuar";
  }

  function resumeCountdown() {
    startCountdown();
  }

  function resetCountdownDisplay() {
    document.getElementById("countdown-display").textContent = "00:00:00.000";
  }

  function updateCountdownDisplay(totalTime) {
    let milliseconds = Math.floor(totalTime % 1000);
    let seconds = Math.floor((totalTime / 1000) % 60);
    let minutes = Math.floor((totalTime / (1000 * 60)) % 60);
    let hours = Math.floor((totalTime / (1000 * 60 * 60)) % 24);

    milliseconds = pad(milliseconds, 3);
    seconds = pad(seconds, 2);
    minutes = pad(minutes, 2);
    hours = pad(hours, 2);

    document.getElementById("countdown-display").textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  function pad(num, size) {
    return ('000' + num).slice(-size);
  }
});
