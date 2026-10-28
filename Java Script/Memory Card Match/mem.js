let cards = document.querySelectorAll(".card");

let emoji = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H"];

function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let shuff = shuffleArray(emoji);

cards.forEach((card) => {
    card.innerText = shuff.pop();
})

let flippedCards = [];
let lockBoard = false;

cards.forEach((card) => {
    card.addEventListener("click", () => {
        if (lockBoard) return;
        if (card === flippedCards[0]) return;
        if (card.classList.contains("matched")) return; 

        card.classList.add("flipped");
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    });
});

function checkForMatch() {
    let card1 = flippedCards[0];
    let card2 = flippedCards[1];

    let isMatch = card1.innerText === card2.innerText;

    if (isMatch) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        resetTurn();
    } else {
        lockBoard = true;
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            resetTurn();
        }, 1000);
    }
}

function resetTurn() {
    flippedCards = [];
    lockBoard = false;
}
