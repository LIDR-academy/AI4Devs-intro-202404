const game = document.getElementById('game');
const paddle1 = document.getElementById('paddle1');
const paddle2 = document.getElementById('paddle2');
const ball = document.getElementById('ball');
const score1 = document.getElementById('score1');
const score2 = document.getElementById('score2');

let paddle1Y = 250;
let paddle2Y = 250;
let ballX = 390;
let ballY = 290;
let ballSpeedX = 5;
let ballSpeedY = 5;
let player1Score = 0;
let player2Score = 0;
let gameLoop;

function movePaddle1(event) {
	const gameRect = game.getBoundingClientRect();
	paddle1Y = event.clientY - gameRect.top - 50;
	paddle1.style.top = paddle1Y + 'px';
}

function movePaddle2() {
	const paddle2YCenter = paddle2Y + 50;
	const ballYCenter = ballY + 10;

	if (paddle2YCenter < ballYCenter && paddle2Y < 500) {
		paddle2Y += 7;
	} else if (paddle2YCenter > ballYCenter && paddle2Y > 0) {
		paddle2Y -= 7;
	}

	paddle2.style.top = paddle2Y + 'px';
}

function moveBall() {
	ballX += ballSpeedX;
	ballY += ballSpeedY;

	ball.style.left = ballX + 'px';
	ball.style.top = ballY + 'px';

	if (ballY <= 0 || ballY >= 580) {
		ballSpeedY = -ballSpeedY;
	}

	if (ballX <= 30) {
		if (ballY > paddle1Y && ballY < paddle1Y + 100) {
			ballSpeedX = -ballSpeedX;
			ballSpeedX *= 1.05;
			ballSpeedY *= 1.05;
		} else {
			player2Score++;
			score2.textContent = player2Score;
			resetBall();
		}
	}

	if (ballX >= 750) {
		if (ballY > paddle2Y && ballY < paddle2Y + 100) {
			ballSpeedX = -ballSpeedX;
			ballSpeedX *= 1.05;
			ballSpeedY *= 1.05;
		} else {
			player1Score++;
			score1.textContent = player1Score;
			resetBall();
		}
	}

	if (player1Score === 11 && player1Score >= player2Score + 2) {
		alert("Player 1 wins!");
		resetGame();
	} else if (player2Score === 11 && player2Score >= player1Score + 2) {
		alert("Player 2 wins!");
		resetGame();
	}
}

function resetBall() {
	ballX = 390;
	ballY = 290;
	ballSpeedX = 5;
	ballSpeedY = 5;
	ball.style.left = ballX + 'px';
	ball.style.top = ballY + 'px';
}

function resetGame() {
	player1Score = 0;
	player2Score = 0;
	score1.textContent = player1Score;
	score2.textContent = player2Score;
	resetBall();
}

game.addEventListener('mousemove', movePaddle1);

gameLoop = setInterval(() => {
	movePaddle2();
	moveBall();
}, 1000/60);
