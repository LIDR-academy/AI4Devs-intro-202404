// Ensure this is loaded as a module if using ES6 features or imports
document.addEventListener('DOMContentLoaded', function () {
    const app = new PIXI.Application({
        width: 800, // Width of the canvas
        height: 600, // Height of the canvas
        backgroundColor: 0x1099bb // Background color
    });

    // Append the view (canvas) to the HTML document body
    document.body.appendChild(app.view);

    // Additional setup or game code here
    PIXI.Loader.shared
        .add("boy", "/assets/boy.webp")
        .add("girl", "/assets/girl.webp")
        .load(setup);

    let currentQuestionIndex = 0;
    let questions = [];

    async function loadQuestions() {
        try {
            const response = await fetch('/data/question.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            questions = await response.json();
            setupQuestions();
        } catch (error) {
            console.error("Failed to load questions:", error);
        }
    }

    function setup() {
        let boy = new PIXI.Sprite(PIXI.Loader.shared.resources.boy.texture);
        let girl = new PIXI.Sprite(PIXI.Loader.shared.resources.girl.texture);

        // Position your sprites and add them to the stage
        boy.x = 100;
        boy.y = 100;
        girl.x = 300;
        girl.y = 100;

        app.stage.addChild(boy);
        app.stage.addChild(girl);

        loadQuestions(); // Load questions after setting up characters
    }

    function setupQuestions() {
        // Display the first question
        if (questions.math.length > 0) {
            displayQuestion(questions.math[currentQuestionIndex]);
        }
    }

    function displayQuestion(questionData) {
        const questionText = new PIXI.Text(questionData.question, { fontFamily: 'Arial', fontSize: 24, fill: 0xffffff, align: 'center' });
        questionText.x = 50;
        questionText.y = 500;
        app.stage.addChild(questionText);

        questionData.options.forEach((option, index) => {
            let optionText = new PIXI.Text(option, { fontFamily: 'Arial', fontSize: 18, fill: 0xffffff, align: 'center' });
            optionText.x = 50;
            optionText.y = 530 + 30 * index;
            optionText.interactive = true;
            optionText.buttonMode = true;
            optionText.on('pointerdown', () => checkAnswer(index, questionData.answer, questionText, optionText));
            app.stage.addChild(optionText);
        });
    }

    function checkAnswer(selectedIndex, correctAnswer, questionText, optionText) {
        const isCorrect = "ABCD"[selectedIndex] === correctAnswer;
        if (isCorrect) {
            console.log("Correct Answer!");
            // Increment score
        } else {
            console.log("Wrong Answer!");
            // Optionally decrement lives or handle game over logic
        }
        app.stage.removeChild(questionText);
        app.stage.removeChild(optionText);
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.math.length) {
            displayQuestion(questions.math[currentQuestionIndex]);
        } else {
            console.log("No more questions!");
        }
    }
});



