var questions = [
    {
        question: "What is the output of typeof null in JavaScript?",
        options: ["null", "undefined", "object", "boolean"],
        answer: "object",
        explanation: "typeof null returns 'object'. This is a well-known bug in JavaScript since its first version."
    },
    {
        question: "What does '2' + 2 return in JavaScript?",
        options: ["4", "22", "'22'", "NaN"],
        answer: "'22'",
        explanation: "The + operator with a string converts the number to a string and concatenates them, resulting in '22'."
    },
    {
        question: "What does === check in JavaScript?",
        options: ["Only value", "Only type", "Value and type", "Reference"],
        answer: "Value and type",
        explanation: "=== is the strict equality operator. It checks both the value and the data type without type conversion."
    },
    {
        question: "What is the result of NaN === NaN?",
        options: ["true", "false", "undefined", "Error"],
        answer: "false",
        explanation: "NaN is not equal to anything, including itself. Use Number.isNaN() to check for NaN."
    },
    {
        question: "Which keyword declares a block-scoped variable?",
        options: ["var", "let", "function", "global"],
        answer: "let",
        explanation: "let declares a block-scoped variable. var is function-scoped, which can cause unexpected behavior."
    },
    {
        question: "What does Array.isArray([]) return?",
        options: ["false", "undefined", "true", "'array'"],
        answer: "true",
        explanation: "Array.isArray() checks if the value is an array and returns true or false."
    },
    {
        question: "Which method removes the last element from an array?",
        options: ["shift()", "pop()", "splice()", "slice()"],
        answer: "pop()",
        explanation: "pop() removes and returns the last element. shift() removes the first element."
    },
    {
        question: "What is a closure in JavaScript?",
        options: ["A loop structure", "A function with access to outer scope", "A class method", "An error handler"],
        answer: "A function with access to outer scope",
        explanation: "A closure is a function that remembers the variables from its outer scope even after the outer function has finished."
    },
    {
        question: "What does JSON.stringify() do?",
        options: ["Parses a JSON string", "Converts object to JSON string", "Creates a new object", "Validates JSON"],
        answer: "Converts object to JSON string",
        explanation: "JSON.stringify() converts a JavaScript object or value into a JSON string."
    },
    {
        question: "What is the output of Boolean('')?",
        options: ["true", "false", "'false'", "undefined"],
        answer: "false",
        explanation: "Empty string is a falsy value in JavaScript. Boolean('') returns false."
    }
];

var currentQuestion = 0;
var score = 0;
var wrongList = [];
var timerInterval = null;
var timeLeft = 30;
var locked = false;

var questionEl = document.getElementById("question");
var optionA = document.getElementById("a");
var optionB = document.getElementById("b");
var optionC = document.getElementById("c");
var optionD = document.getElementById("d");
var explanationEl = document.getElementById("explanation");
var nextBtn = document.getElementById("next");
var restartBtn = document.getElementById("restart");
var timerEl = document.getElementById("timer");
var progressLine = document.getElementById("progress-line");
var progressText = document.getElementById("progress-text");
var liveScore = document.getElementById("live-score");
var scoreEl = document.getElementById("score");
var ratingEl = document.getElementById("rating");
var contentEl = document.querySelector(".content");
var resultsEl = document.querySelector(".results");
var headerEl = document.querySelector(".header");
var reviewSection = document.querySelector(".review-section");
var reviewList = document.getElementById("review-list");
var reviewBtn = document.getElementById("review-btn");
var backBtn = document.getElementById("back-to-results");

function loadQuestion(){
    locked = false;
    var q = questions[currentQuestion];
    questionEl.textContent = q.question;
    optionA.textContent = q.options[0];
    optionB.textContent = q.options[1];
    optionC.textContent = q.options[2];
    optionD.textContent = q.options[3];

    var options = document.querySelectorAll(".option");
    for(var i = 0; i < options.length; i++){
        options[i].classList.remove("correct", "wrong-pick", "locked");
    }

    explanationEl.style.display = "none";
    explanationEl.textContent = "";

    progressText.textContent = "Q" + (currentQuestion + 1) + "/" + questions.length;
    progressLine.style.width = ((currentQuestion + 1) / questions.length * 100) + "%";

    startTimer();
}

function startTimer(){
    timeLeft = 30;
    timerEl.textContent = timeLeft;
    timerEl.classList.remove("warning");

    clearInterval(timerInterval);
    timerInterval = setInterval(function(){
        timeLeft--;
        timerEl.textContent = timeLeft;

        if(timeLeft <= 10){
            timerEl.classList.add("warning");
        }

        if(timeLeft <= 0){
            clearInterval(timerInterval);
            autoLock();
        }
    }, 1000);
}

function autoLock(){
    locked = true;
    var q = questions[currentQuestion];
    var options = document.querySelectorAll(".option");

    for(var i = 0; i < options.length; i++){
        options[i].classList.add("locked");
        if(options[i].textContent === q.answer){
            options[i].classList.add("correct");
        }
    }

    wrongList.push({
        question: q.question,
        yourAnswer: "Time's up!",
        correctAnswer: q.answer
    });

    explanationEl.textContent = q.explanation;
    explanationEl.style.display = "block";
}

function checkAnswer(selected){
    if(locked) return;
    locked = true;
    clearInterval(timerInterval);

    var q = questions[currentQuestion];
    var options = document.querySelectorAll(".option");

    for(var i = 0; i < options.length; i++){
        options[i].classList.add("locked");
        if(options[i].textContent === q.answer){
            options[i].classList.add("correct");
        }
    }

    if(selected.textContent === q.answer){
        score++;
        liveScore.textContent = "Score: " + score;
    } else {
        selected.classList.add("wrong-pick");
        wrongList.push({
            question: q.question,
            yourAnswer: selected.textContent,
            correctAnswer: q.answer
        });
    }

    explanationEl.textContent = q.explanation;
    explanationEl.style.display = "block";
}

function showResults(){
    contentEl.style.display = "none";
    headerEl.style.display = "none";
    resultsEl.style.display = "flex";
    clearInterval(timerInterval);

    scoreEl.textContent = "You scored " + score + " out of " + questions.length;

    var percent = (score / questions.length) * 100;
    if(percent === 100){
        ratingEl.textContent = "Perfect! You're a JavaScript master!";
    } else if(percent >= 80){
        ratingEl.textContent = "Excellent! Almost perfect!";
    } else if(percent >= 60){
        ratingEl.textContent = "Good job! Keep learning!";
    } else if(percent >= 40){
        ratingEl.textContent = "Not bad, but room to improve!";
    } else {
        ratingEl.textContent = "Keep practicing, you'll get there!";
    }

    if(wrongList.length === 0){
        reviewBtn.style.display = "none";
    }
}

function showReview(){
    resultsEl.style.display = "none";
    reviewSection.style.display = "flex";
    reviewList.innerHTML = "";

    for(var i = 0; i < wrongList.length; i++){
        var card = document.createElement("div");
        card.className = "review-card";
        card.innerHTML =
            "<p class='review-question'>" + (i + 1) + ". " + wrongList[i].question + "</p>" +
            "<p class='your-answer'>Your answer: " + wrongList[i].yourAnswer + "</p>" +
            "<p class='correct-answer'>Correct answer: " + wrongList[i].correctAnswer + "</p>";
        reviewList.appendChild(card);
    }
}

function restartQuiz(){
    currentQuestion = 0;
    score = 0;
    wrongList = [];
    locked = false;
    liveScore.textContent = "Score: 0";

    resultsEl.style.display = "none";
    reviewSection.style.display = "none";
    contentEl.style.display = "flex";
    headerEl.style.display = "flex";
    reviewBtn.style.display = "flex";

    loadQuestion();
}

optionA.addEventListener("click", function(){ checkAnswer(optionA); });
optionB.addEventListener("click", function(){ checkAnswer(optionB); });
optionC.addEventListener("click", function(){ checkAnswer(optionC); });
optionD.addEventListener("click", function(){ checkAnswer(optionD); });

nextBtn.addEventListener("click", function(){
    currentQuestion++;
    if(currentQuestion < questions.length){
        loadQuestion();
    } else {
        showResults();
    }
});

restartBtn.addEventListener("click", function(){
    restartQuiz();
});

reviewBtn.addEventListener("click", function(){
    showReview();
});

backBtn.addEventListener("click", function(){
    reviewSection.style.display = "none";
    resultsEl.style.display = "flex";
});

loadQuestion();