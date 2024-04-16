// Variables globales
let currentQuestion = 0;
let questions = [];
let score = 0;
let attempts = 0;
let consecutiveHits = 0;

document.getElementById('startButton').addEventListener('click', startGame);

// Función para iniciar el juego
function startGame() {
    let topic = document.getElementById('topicSelect').value;
    let gender = document.getElementById('genderSelect').value;
    loadQuestions(topic);
    setupGameScreen(topic, gender);
}

// Cargar preguntas según el tema seleccionado desde un archivo único
function loadQuestions(topic) {
    fetch(`/videogame/shoot-the-answer-FA/data/questions.json`)
        .then(response => response.json())
        .then(data => {
            questions = data[topic];
            displayQuestion(); // Asegúrate de llamar a esta función una vez que las preguntas estén cargadas
        })
        .catch(error => {
            console.error('Error loading the questions:', error);
            alert('Failed to load questions.');
        });
}

// Configurar la pantalla de juego
function setupGameScreen(topic, gender) {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
    document.getElementById('gameScreen').style.backgroundImage = `url('/videogame/shoot-the-answer-FA/assets/backgrounds/${topic}.webp')`;
    document.getElementById('topicHeader').textContent = topic.charAt(0).toUpperCase() + topic.slice(1);
}

// Mostrar la pregunta actual y las respuestas
function displayQuestion() {
    if (questions.length === 0) {
        endGame();
        return;
    }
    let question = questions[currentQuestion];
    document.getElementById('questionText').textContent = question.question;
    const answersContainer = document.getElementById('answers');
    answersContainer.innerHTML = '';  // Limpiar respuestas anteriores

    question.options.forEach((option, index) => {
        let answerDisk = document.createElement('div');
        answerDisk.className = 'answerDisk';
        answerDisk.style.backgroundImage = `url('/videogame/shoot-the-answer-FA/assets/disks/${String.fromCharCode(65 + index)}.webp')`;
        answerDisk.dataset.correct = question.answer === String.fromCharCode(65 + index);
        answersContainer.appendChild(answerDisk);

        // Agrega el movimiento aleatorio de los discos
        moveDiskRandomly(answerDisk);
        answerDisk.addEventListener('click', () => checkAnswer(answerDisk, answerDisk.dataset.correct === 'true'));
    });
}

// Mover los discos de forma aleatoria dentro del área de respuestas
function moveDiskRandomly(disk) {
    let area = document.getElementById('answers');
    let maxX = area.clientWidth - 50;  // Anchura del disco
    let maxY = 100;  // Altura limitada para que los discos floten
    setInterval(() => {
        let newX = Math.random() * maxX;
        let newY = Math.random() * maxY;
        disk.style.left = `${newX}px`;
        disk.style.top = `${newY}px`;
    }, 250);  // Mover cada 250 milisegundos
}

// Comprobar la respuesta seleccionada
function checkAnswer(disk, isCorrect) {
    attempts++;
    if (isCorrect) {
        score += attempts === 1 ? 100 : attempts === 2 ? 50 : 25;
        consecutiveHits += 1;
        if (consecutiveHits === 3) {
            score += 100;
            consecutiveHits = 0;
        }
        alert('¡Correcto!');
        nextQuestion();
    } else {
        if (attempts >= 3) {
            consecutiveHits = 0;
            alert('Incorrecto. Intentos agotados.');
            nextQuestion();
        } else {
            alert('Incorrecto. Intenta de nuevo.');
        }
    }
    updateScore();
}

// Actualizar el puntaje en la pantalla
function updateScore() {
    document.getElementById('score').textContent = `Puntaje: ${score}`;
}

// Pasar a la siguiente pregunta
function nextQuestion() {
    currentQuestion++;
    attempts = 0;
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        endGame();
    }
}

// Finalizar el juego
function endGame() {
    alert('Juego terminado. Tu puntaje final es: ' + score);
    document.getElementById('startScreen').style.display = 'block';
    document.getElementById('gameScreen').style.display = 'none';
    score = 0;
    currentQuestion = 0;
    consecutiveHits = 0;
}
