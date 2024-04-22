let genderSelected = false;
let themeSelected = false;
let selectedTheme = '';
let currentQuestionIndex = 0;  // Índice de la pregunta actual
let attemptsLeft = 3;          // Intentos restantes para la pregunta actual
let originalQuestions = window.questions;
let questions = [];            // Almacenar las preguntas cargadas
let score = 0;                  // Puntuación total
let firstTrySuccesses = 0;      // Contador de aciertos al primer intento consecutivos
let attemptsUsed = 0;           // Intentos usados en la pregunta actual

function initializeGameScreen() {
    document.getElementById('startScreen').style.display = 'none';  // Ocultar la pantalla de inicio
    document.getElementById('gameScreen').style.display = 'flex';  // Mostrar la pantalla del juego
    document.getElementById('gameScreen').style.backgroundImage = `url('assets/backgrounds/${selectedTheme}.png')`;
    document.getElementById('gameScreen').style.backgroundSize = 'cover';
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
   /* fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data[theme];
        displayQuestion(currentQuestionIndex);
    })
    .catch(error => {
        console.error('Error loading the questions:', error);
    });
    */
    questions = originalQuestions[theme];
    displayQuestion(currentQuestionIndex);
}

// Agregar a la función displayQuestion()
function displayQuestion(currentQuestionIndex) {
    let question = questions[currentQuestionIndex];
    document.getElementById('questionText').textContent = question.question;
    const floatingAnswersContainer = document.getElementById('floatingAnswers');
    const staticAnswersContainer = document.getElementById('answers');
    
    floatingAnswersContainer.innerHTML = ''; // Limpiar respuestas flotantes anteriores
    staticAnswersContainer.innerHTML = '';   // Limpiar respuestas estáticas anteriores

    question.options.forEach((option, index) => {
        let staticAnswer = document.createElement('div');
        staticAnswer.innerHTML = `<strong>${String.fromCharCode(65 + index)}:</strong> ${option}`;
        staticAnswersContainer.appendChild(staticAnswer);

        let floatingAnswer = document.createElement('button');
        let backgroundUrl = `assets/disks/${String.fromCharCode(65 + index)}.png`;
        floatingAnswer.style.backgroundImage = `url('${backgroundUrl}' ) `;
        floatingAnswer.style.backgroundSize = 'contain';
        floatingAnswer.style.backgroundPosition = 'center';
        floatingAnswer.className = `floating-answer btn btn-circle color-${index + 1}`;
        floatingAnswer.style.display = 'none';
        floatingAnswersContainer.appendChild(floatingAnswer);
        moveDiskRandomly(floatingAnswer);
        floatingAnswer.addEventListener('click', () => handleAnswer(index, question.answer));
    });
}

// Actualizar la función moveDiskRandomly() para ajustar los nuevos elementos flotantes
function moveDiskRandomly(answer) {
    const floatingAnswersContainer = document.getElementById('floatingAnswers');
    let { newX, newY } = calculatePositions(floatingAnswersContainer, answer);
    answer.style.left = `${newX}px`;
    answer.style.top = `${newY}px`;
    answer.style.display = 'block';
    setInterval(() => {
        let { newX, newY } = calculatePositions(floatingAnswersContainer, answer);
        answer.style.left = `${newX}px`;
        answer.style.top = `${newY}px`;
    }, 2000);
}

function calculatePositions(container, disk) {
    let maxX = container.clientWidth - disk.offsetWidth;
    let maxY = container.clientHeight - disk.offsetHeight;
    let newX, newY, valid;

    do {
        newX = Math.random() * maxX;
        newY = Math.random() * maxY;
        valid = true;

        // Revisar colisiones con otros discos
        Array.from(container.children).forEach(other => {
            if (other !== disk) {
                let distance = Math.sqrt(Math.pow(newX - parseFloat(other.style.left), 2) + Math.pow(newY - parseFloat(other.style.top), 2));
                if (distance < disk.offsetWidth) valid = false;  // Considerar ajustar esta lógica de colisión
            }
        });
    } while (!valid);

    return { newX, newY };
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
    attemptsLeft = 3;
    attemptsUsed = 0;
    if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        console.log('Game Over! Final Score:', score);
        endGame();
    }
}



// Función para verificar la respuesta
function checkAnswer(correctAnswer, selectedOptionIndex) {
    console.log('Selected option:', selectedOptionIndex);
    console.log('Correct answer:', correctAnswer);
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

function endGame() {
    document.getElementById('gameScreen').style.display = 'none'; // Ocultar pantalla de juego
    document.getElementById('endScreen').style.display = 'block'; // Mostrar pantalla de fin
    document.getElementById('finalScore').innerText = `Tu puntaje final es: ${score}`;
}

function restartGame() {
    document.getElementById('endScreen').style.display = 'none';
    document.getElementById('startScreen').style.display = 'block';
    currentQuestionIndex = 0;
    score = 0;
    updateScoreDisplay();
    checkSelections(); // Reactivar botón de inicio si ya se seleccionaron género y tema
}
