let Light = document.body;
let message = document.getElementById("message");

let isGreen = false;
let startTime;

let switchTime = Math.random() * 6 + 1;

setTimeout(function () {
    Light.style.backgroundColor = "green";
    message.textContent = "CLICK NOW!";
    isGreen = true;
    startTime = Date.now();
}, switchTime * 1000);

Light.addEventListener("click", function () {
    if (!isGreen) {
        message.textContent = "TOO SOON! Wait for green.";
    } else {
        let reactionTime = Date.now() - startTime;
        message.textContent = "Reaction time: " + reactionTime + " ms";
    }
});