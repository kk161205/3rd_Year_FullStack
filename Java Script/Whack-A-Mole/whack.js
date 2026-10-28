let currentSquare = null;
let timerId = null;
let score = 0;
let timeLeft = 10;
let countDownTimerId = null;

const boxes = document.querySelectorAll(".box");
const scoreDisplay = document.getElementById("score");
const timeLeftDisplay = document.getElementById("time-left");
function randomSquare() {
    if (currentSquare) {
        currentSquare.classList.remove("mole");
    }

    let randomNumber = Math.floor(Math.random() * boxes.length);
    currentSquare = boxes[randomNumber];

    currentSquare.classList.add("mole");

    timerId = setTimeout(randomSquare, 800);
}
function countDown() {
    timeLeft--;
    timeLeftDisplay.textContent = `Time Left: ${timeLeft}`;
    if (timeLeft === 0) {
        clearInterval(countDownTimerId);
        clearTimeout(timerId);
        alert("Game Over! Your score is " + score);
    }
}

countDownTimerId = setInterval(countDown, 1000);

boxes.forEach(function(box) {
    box.addEventListener("click", function() {
        if (box === currentSquare) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;

            clearTimeout(timerId);
            randomSquare();
        }
    });
});

randomSquare();
