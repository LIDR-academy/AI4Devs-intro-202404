let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        document.getElementById("startStopButton").innerText = "Start";
        document.getElementById("startStopButton").classList.remove("stopButton");
        isRunning = false;
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 10);
        document.getElementById("startStopButton").innerText = "Stop";
        document.getElementById("startStopButton").classList.add("stopButton");
        isRunning = true;
    }
}

function clearTime() {
    clearInterval(timer);
    document.getElementById("time").innerText = "00:00:00";
    document.getElementById("milliseconds").innerText = "000";
    document.getElementById("startStopButton").innerText = "Start";
    document.getElementById("startStopButton").classList.remove("stopButton");
    isRunning = false;
    elapsedTime = 0;
}

function updateDisplay() {
    let currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    let formattedTime = new Date(elapsedTime).toISOString().substr(11, 8);
    let formattedMilliseconds = String(elapsedTime).slice(-3).padStart(3, "0");
    document.getElementById("time").innerText = formattedTime;
    document.getElementById("milliseconds").innerText = formattedMilliseconds;
}

document.getElementById("startStopButton").addEventListener("click", startStop);
document.getElementById("clearButton").addEventListener("click", clearTime);
