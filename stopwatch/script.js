// Get DOM elements
const homeView = document.getElementById('home');
const timerView = document.getElementById('timer');
const countdownView = document.getElementById('countdown');

const timerBtn = document.getElementById('timerBtn');
const countdownBtn = document.getElementById('countdownBtn');
const timerBackBtn = document.getElementById('timerBackBtn');
const countdownBackBtn = document.getElementById('countdownBackBtn');

const timerTime = document.getElementById('timerTime');
const timerMillis = document.getElementById('timerMillis');
const timerStartBtn = document.getElementById('timerStartBtn');
const timerResetBtn = document.getElementById('timerResetBtn');

const countdownTime = document.getElementById('countdownTime');
const hoursInput = document.getElementById('hoursInput');
const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');
const countdownMillis = document.getElementById('countdownMillis');
const countdownStartBtn = document.getElementById('countdownStartBtn');
const countdownResetBtn = document.getElementById('countdownResetBtn');

let timerInterval;
let countdownInterval;
let timerStartTime;
let timerElapsedTime = 0;
let countdownStartTime;
let countdownRemainingSeconds;

// Event listeners
timerBtn.addEventListener('click', showTimerView);
countdownBtn.addEventListener('click', showCountdownView);
timerBackBtn.addEventListener('click', showHomeView);
countdownBackBtn.addEventListener('click', showHomeView);

timerStartBtn.addEventListener('click', startTimer);
timerResetBtn.addEventListener('click', resetTimer);

hoursInput.addEventListener('input', validateCountdownInput);
minutesInput.addEventListener('input', validateCountdownInput);
secondsInput.addEventListener('input', validateCountdownInput);

hoursInput.addEventListener('blur', formatCountdownInput);
minutesInput.addEventListener('blur', formatCountdownInput);
secondsInput.addEventListener('blur', formatCountdownInput);

countdownStartBtn.addEventListener('click', startCountdown);
countdownResetBtn.addEventListener('click', resetCountdown);

// Functions
function showHomeView() {
	hideAllViews();
	homeView.style.display = 'block';
}

function showTimerView() {
	hideAllViews();
	timerView.style.display = 'block';
}

function showCountdownView() {
	hideAllViews();
	countdownView.style.display = 'block';
}

function hideAllViews() {
	homeView.style.display = 'none';
	timerView.style.display = 'none';
	countdownView.style.display = 'none';
}

function startTimer() {
	if (timerStartTime === undefined) {
		timerStartTime = Date.now();
	}

	timerStartBtn.removeEventListener('click', startTimer);
	timerStartBtn.addEventListener('click', pauseTimer);
	timerStartBtn.textContent = '⏸️';

	timerInterval = setInterval(() => {
		timerElapsedTime = Date.now() - timerStartTime;
		updateTimerDisplay(timerElapsedTime);
	}, 10);
}

function pauseTimer() {
	clearInterval(timerInterval);
	timerStartBtn.removeEventListener('click', pauseTimer);
	timerStartBtn.addEventListener('click', startTimer);
	timerStartBtn.textContent = '▶️';
}

function resetTimer() {
	clearInterval(timerInterval);
	timerStartTime = undefined;
	timerElapsedTime = 0;
	timerStartBtn.removeEventListener('click', pauseTimer);
	timerStartBtn.addEventListener('click', startTimer);
	timerStartBtn.textContent = '▶️';
	updateTimerDisplay(0);
}

function updateTimerDisplay(elapsedTime) {
	let hours = Math.floor(elapsedTime / 3600000);
	let minutes = Math.floor((elapsedTime % 3600000) / 60000);
	let seconds = Math.floor((elapsedTime % 60000) / 1000);
	let millis = elapsedTime % 1000;

	hours = padZero(hours);
	minutes = padZero(minutes);
	seconds = padZero(seconds);
	millis = padZero(millis, 3);

	timerTime.textContent = `${hours}:${minutes}:${seconds}`;
	timerMillis.textContent = millis;
}

function validateCountdownInput(event) {
	const input = event.target;
	const value = input.value;

	if (input === hoursInput && value > 23) {
		input.value = '23';
	} else if ((input === minutesInput || input === secondsInput) && value > 59) {
		input.value = '59';
	}

	if (input.value.length === 2 && input.nextElementSibling && input.nextElementSibling.tagName === 'INPUT') {
		input.nextElementSibling.focus();
	}

	countdownStartBtn.disabled = !(hoursInput.value || minutesInput.value || secondsInput.value);
}

function formatCountdownInput(event) {
	const input = event.target;
	const value = input.value;

	if (value.length === 1) {
		input.value = padZero(value);
	}
}

function startCountdown() {
	if (countdownStartTime === undefined) {
		let hours = parseInt(hoursInput.value) || 0;
		let minutes = parseInt(minutesInput.value) || 0;
		let seconds = parseInt(secondsInput.value) || 0;
		countdownRemainingSeconds = hours * 3600 + minutes * 60 + seconds;
		countdownStartTime = Date.now();
	}

	countdownStartBtn.removeEventListener('click', startCountdown);
	countdownStartBtn.addEventListener('click', pauseCountdown);
	countdownStartBtn.textContent = '⏸️';

	hoursInput.disabled = true;
	minutesInput.disabled = true;
	secondsInput.disabled = true;

	countdownInterval = setInterval(() => {
		let elapsedTime = Date.now() - countdownStartTime;
		let remainingSeconds = Math.max(0, countdownRemainingSeconds - Math.floor(elapsedTime / 1000));

		if (remainingSeconds <= 0) {
			clearInterval(countdownInterval);
			alert('Countdown finished!');
			resetCountdown();
			updateCountdownDisplay(0, 0);
			return;
		}

		updateCountdownDisplay(remainingSeconds, elapsedTime);
	}, 10);
}

function pauseCountdown() {
	clearInterval(countdownInterval);
	countdownStartBtn.removeEventListener('click', pauseCountdown);
	countdownStartBtn.addEventListener('click', startCountdown);
	countdownStartBtn.textContent = '▶️';
}

function resetCountdown() {
	clearInterval(countdownInterval);
	countdownStartTime = undefined;
	countdownRemainingSeconds = undefined;
	countdownStartBtn.removeEventListener('click', pauseCountdown);
	countdownStartBtn.addEventListener('click', startCountdown);
	countdownStartBtn.textContent = '▶️';
	countdownStartBtn.disabled = true;

	hoursInput.value = '00';
	minutesInput.value = '00';
	secondsInput.value = '00';
	hoursInput.disabled = false;
	minutesInput.disabled = false;
	secondsInput.disabled = false;

	updateCountdownDisplay(0, 0);
}

function updateCountdownDisplay(remainingSeconds, elapsedTime) {
	let hours = Math.floor(remainingSeconds / 3600);
	let minutes = Math.floor((remainingSeconds % 3600) / 60);
	let seconds = remainingSeconds % 60;
	let millis = elapsedTime % 1000;

	hours = padZero(hours);
	minutes = padZero(minutes);
	seconds = padZero(seconds);
	millis = padZero(millis, 3);

	hoursInput.value = hours;
	minutesInput.value = minutes;
	secondsInput.value = seconds;
	countdownMillis.textContent = millis;
}

function padZero(num, size = 2) {
	let s = num.toString();
	while (s.length < size) {
		s = '0' + s;
	}
	return s;
}

// Set default values for countdown inputs
hoursInput.value = '00';
minutesInput.value = '00';
secondsInput.value = '00';

// Initial view
showHomeView();