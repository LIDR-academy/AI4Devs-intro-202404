document.addEventListener("DOMContentLoaded", function() {
    const stopwatchBtn = document.getElementById("stopwatch-btn");
    const countdownBtn = document.getElementById("countdown-btn");
    const optionsContainer = document.querySelector(".options-container");
    const timerContainer = document.getElementById("timer-container");
    const buttonsContainer = document.getElementById("buttons-container");
    const numberPadContainer = document.getElementById("number-pad-container");
    const startPauseBtn = document.getElementById("start-pause-btn");
    const clearBtn = document.getElementById("clear-btn");
    const setBtn = document.getElementById("set-btn");
    const clearPadBtn = document.getElementById("clear-pad-btn");
    const hoursSpan = document.getElementById("hours");
    const minutesSpan = document.getElementById("minutes");
    const secondsSpan = document.getElementById("seconds");
    const millisecondsSpan = document.getElementById("milliseconds");
    
    let timerInterval;
    let countdownValue = 0;
    let countdownInterval; 
    let countdownMode = false;
    let countdownRunning;
    
    stopwatchBtn.addEventListener("click", function() {
        optionsContainer.classList.add("hidden");
        timerContainer.classList.remove("hidden");
        buttonsContainer.classList.remove("hidden");
        numberPadContainer.classList.add("hidden");
        backContainer.classList.remove("hidden");
        startPauseBtn.innerText = "Start";
        countdownMode = false;
        clearInterval(countdownInterval);
        clearInterval(timerInterval);
        resetTimer();
    });
    
    countdownBtn.addEventListener("click", function() {
        optionsContainer.classList.add("hidden");
        timerContainer.classList.remove("hidden");
        buttonsContainer.classList.add("hidden");
        numberPadContainer.classList.remove("hidden");
        backContainer.classList.remove("hidden");
        countdownMode = true;
        clearInterval(countdownInterval);
        clearInterval(timerInterval);
        resetTimer();
    });
    
    startPauseBtn.addEventListener("click", function() {
        if (startPauseBtn.innerText === "Start") {
            startPauseBtn.innerText = "Pause";
            if (countdownMode) {
                startCountdown();
            } else {
                startTimer();
            }
        } else {
            startPauseBtn.innerText = "Start";
            if (countdownMode) {
                pauseCountdown();
            } else {
                pauseTimer();
            }
        }
    });
    
    clearBtn.addEventListener("click", function() {
        timerNumbers.forEach(element => {
            element.innerText = "00";
        });
        document.getElementById("milliseconds").innerText = "000";
    });
    setBtn.addEventListener("click", function() {
        let [hours, minutes, seconds] = timerNumbers.map(element => parseInt(element.innerText));
        seconds = seconds % 60; // Normalize seconds
        minutes += Math.floor(parseInt(timerNumbers[2].innerText) / 60); // Add extra minutes from seconds
        minutes = minutes % 60; // Normalize minutes
        hours += Math.floor(parseInt(timerNumbers[1].innerText) / 60); // Add extra hours from minutes
        hours = hours % 100; // Normalize hours
        timerNumbers[0].innerText = padZero(hours);
        timerNumbers[1].innerText = padZero(minutes);
        timerNumbers[2].innerText = padZero(seconds);
        
        // Ocultar el contenedor del teclado numérico y mostrar el contenedor de los controles del temporizador
        numberPadContainer.classList.add("hidden");
        buttonsContainer.classList.remove("hidden");
    });

    function padZero(num) {
        return String(num).padStart(2, '0');
    }
    
    clearPadBtn.addEventListener("click", function() {
        resetTimer();
    });
    
    function startTimer() {
        const startTime = Date.now() - countdownValue;
        timerInterval = setInterval(updateTimer, 10, startTime);
    }
    
    function pauseTimer() {
        clearInterval(timerInterval);
    }
    
    function updateTimer(startTime) {
        const elapsedTime = Date.now() - startTime;
        const hours = Math.floor(elapsedTime / 3600000);
        const minutes = Math.floor((elapsedTime % 3600000) / 60000);
        const seconds = Math.floor((elapsedTime % 60000) / 1000);
        const milliseconds = elapsedTime % 1000;
        
        hoursSpan.innerText = padZero(hours);
        minutesSpan.innerText = padZero(minutes);
        secondsSpan.innerText = padZero(seconds);
        millisecondsSpan.innerText = padZero(milliseconds, 3);
    }
    
    function resetTimer() {
        hoursSpan.innerText = "00";
        minutesSpan.innerText = "00";
        secondsSpan.innerText = "00";
        millisecondsSpan.innerText = "000";
    }
    function startCountdown() {
        let [hours, minutes, seconds] = timerNumbers.map(element => parseInt(element.innerText));
        let milliseconds = parseInt(document.getElementById("milliseconds").innerText);
        let totalMilliseconds = hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds;
        countdownRunning = true;
        countdownInterval = setInterval(function() {
            totalMilliseconds -= 1; // Decrement by 10 milliseconds
            if (totalMilliseconds < 0) {
                clearInterval(countdownInterval);
                timerNumbers.forEach(element => {
                    element.innerText = "00";
                });
                countdownRunning = false;
            } else {
                hours = Math.floor(totalMilliseconds / 3600000);
                minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
                seconds = Math.floor((totalMilliseconds % 60000) / 1000);
                milliseconds = totalMilliseconds % 1000;
                timerNumbers[0].innerText = padZero(hours);
                timerNumbers[1].innerText = padZero(minutes);
                timerNumbers[2].innerText = padZero(seconds);
                document.getElementById("milliseconds").innerText = padZero(milliseconds);
                if (hours === 0 && minutes === 0 && seconds === 0 && milliseconds === 0) {
                    clearInterval(countdownInterval);
                    countdownRunning = false;
                }
            }
        }, 1);
    }

    function pauseCountdown() {
        clearInterval(countdownInterval);
        countdownRunning = false;
    }

    const numberButtons = document.querySelectorAll(".number-btn");
    const timerNumbers = [document.getElementById("hours"), document.getElementById("minutes"), document.getElementById("seconds")];
    numberButtons.forEach(button => {
        button.addEventListener("click", function() {
            const number = button.innerText;
            let timerText = timerNumbers.map(element => element.innerText).join("");
            timerText = timerText.substring(1) + number;
            timerNumbers.forEach((element, index) => {
                element.innerText = timerText.slice(index * 2, index * 2 + 2);
            });
        });
    });

    // Resto de tu código

    // function padZero(num) {
    //     return num.padStart(2, '0');
    // }

    const backBtn = document.getElementById("back-btn");
    const backContainer = document.getElementById("back-container");

    backBtn.addEventListener("click", function() {
        // Ocultar todos los contenedores excepto el Contenedor 1
        timerContainer.classList.add("hidden");
        buttonsContainer.classList.add("hidden");
        numberPadContainer.classList.add("hidden");
        backContainer.classList.add("hidden");
        optionsContainer.classList.remove("hidden");
        resetTimer(); // Resetear el temporizador
    });
});

