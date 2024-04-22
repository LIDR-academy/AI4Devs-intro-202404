const gameList = document.querySelector('.game-list');

// Obtener la lista de carpetas de juegos desde el servidor (ejemplo)
const gameFolders = [
	'bomberman-GHG',
	'brickBreaker-LGP',
	'minesweeper-ERR',
	'pong-JCSE',
	'snake-EHS',
	'space-invaders-gtc',
	// Agrega más carpetas de juegos según sea necesario
];

// Generar los elementos de la lista de juegos
gameFolders.forEach(folder => {
	const gameItem = document.createElement('div');
	gameItem.classList.add('game-item');

	const gameLogo = document.createElement('img');
	gameLogo.src = `${folder}/res/logo.png`;
	gameLogo.onerror = function() {
		gameLogo.src = 'res-index/default_logo.jpeg'; // Ruta de la imagen por defecto
	};
	gameItem.appendChild(gameLogo);

	const gameTitle = document.createElement('span');
	gameTitle.textContent = folder;
	gameItem.appendChild(gameTitle);

	gameList.appendChild(gameItem);
});

// Agregar evento de clic a los elementos de la lista de juegos
const gameItems = document.querySelectorAll('.game-item');
gameItems.forEach(item => {
	item.addEventListener('click', () => {
		const selectedGame = item.querySelector('span').textContent;
		window.location.href = `${selectedGame}/`; // Redireccionar a la carpeta del juego seleccionado
	});
});
