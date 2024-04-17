let genderSelected = false;
let themeSelected = false;
let selectedTheme = '';
let currentQuestionIndex = 0;  // Índice de la pregunta actual
let attemptsLeft = 3;          // Intentos restantes para la pregunta actual
let questions = [];            // Almacenar las preguntas cargadas
let score = 0;                  // Puntuación total
let firstTrySuccesses = 0;      // Contador de aciertos al primer intento consecutivos
let attemptsUsed = 0;           // Intentos usados en la pregunta actual

function initializeGameScreen() {
    document.getElementById('startScreen').style.display = 'none';  // Ocultar la pantalla de inicio
    document.getElementById('gameScreen').style.display = 'block';  // Mostrar la pantalla del juego
    updateScoreDisplay();  // Asegúrate de que el puntaje inicial se muestre correctamente
}


document.querySelectorAll('.gender-image').forEach(item => {
    item.addEventListener('click', function() {
        genderSelected = true;
        document.querySelectorAll('.gender-image').forEach(image => {
            image.classList.add('not-selected');
        });
        item.classList.remove('not-selected');
        checkSelections();
    });
});

document.querySelectorAll('.theme-button').forEach(button => {
    button.addEventListener('click', function() {
        themeSelected = true;
        selectedTheme = button.getAttribute('id').replace('-button', '');
        document.querySelectorAll('.theme-button').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        checkSelections();
    });
});

function checkSelections() {
    let startButton = document.getElementById('startButton');
    if (genderSelected && themeSelected) {
        startButton.disabled = false;
        startButton.classList.remove('btn-secondary');
        startButton.classList.add('btn-success');
    } else {
        startButton.disabled = true;
        startButton.classList.remove('btn-success');
        startButton.classList.add('btn-secondary');
    }
}

// Asegúrate de inicializar el estado al cargar la página
checkSelections();

function updateScoreDisplay() {
    document.getElementById('score').innerText = score;  // Actualizar el puntaje en el DOM
}



// Función para cargar preguntas desde el JSON
function loadQuestions(theme) {
    fetch('data/questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data[theme];
        displayQuestion(currentQuestionIndex);
    })
    .catch(error => {
        console.error('Error loading the questions:', error);
    });
}

function displayQuestion(index) {
    const question = questions[index];
    const questionContainer = document.getElementById('questionContainer');
    questionContainer.innerHTML = `<h4>${question.question}</h4>`; // Muestra la pregunta
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'options';

    question.options.forEach((option, idx) => {
        const optionButton = document.createElement('button');
        optionButton.className = 'btn btn-info m-2';
        optionButton.innerText = option;
        optionButton.onclick = () => handleAnswer(idx, question.answer);
        optionsDiv.appendChild(optionButton);
    });

    questionContainer.appendChild(optionsDiv);
    attemptsLeft = 3;  // Restablecer los intentos para la nueva pregunta
    attemptsUsed = 0;  // Restablecer los intentos usados
}



function handleAnswer(selectedOptionIndex, correctAnswer) {
    const correctIndex = correctAnswer.charCodeAt(0) - 'A'.charCodeAt(0);
    attemptsUsed++;
    attemptsLeft--;

    if (selectedOptionIndex === correctIndex) {
        // Asignar puntos según el número de intentos usados
        switch (attemptsUsed) {
            case 1:
                score += 100;
                firstTrySuccesses++;
                break;
            case 2:
                score += 50;
                firstTrySuccesses = 0;  // Resetear conteo de primeros intentos exitosos
                break;
            case 3:
                score += 20;
                firstTrySuccesses = 0;  // Resetear conteo de primeros intentos exitosos
                break;
        }

        // Verificar si hay un bonus por 3 aciertos consecutivos al primer intento
        if (firstTrySuccesses === 3) {
            score += 100;
            firstTrySuccesses = 0;  // Resetear después de aplicar el bonus
        }

        console.log(`Correct answer! Score: ${score}`);
        updateScoreDisplay();
        moveToNextQuestion();
    } else {
        if (attemptsLeft > 0) {
            console.log(`Wrong answer! Try again. Attempts left: ${attemptsLeft}`);
        } else {
            console.log('No more attempts!');
            score -= 15;
            firstTrySuccesses = 0;  // Resetear conteo de primeros intentos exitosos
            console.log(`Score: ${score}`);
            updateScoreDisplay();
            moveToNextQuestion();
        }
    }
}

function moveToNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        console.log('Game Over! Final Score:', score);
        // Aquí podrías mostrar un resumen del juego o redirigir a una pantalla de resultados
    }
}



// Función para verificar la respuesta
function checkAnswer(correctAnswer, selectedOptionIndex) {
    const correctIndex = correctAnswer.charCodeAt(0) - 'A'.charCodeAt(0);
    if (selectedOptionIndex === correctIndex) {
        console.log('Correct answer!');
        // Implementar lógica de puntuación aquí
    } else {
        console.log('Wrong answer!');
    }
}

document.getElementById('startButton').addEventListener('click', function() {
    if (selectedTheme) {
        document.getElementById('startScreen').style.display = 'none'; // Ocultar pantalla de inicio
        loadQuestions(selectedTheme);
        initializeGameScreen();
    }
});
