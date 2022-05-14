const cardsArray = [
  { name: "cat", src: "images/cat.png" },
  { name: "cow", src: "images/cow.png" },
  { name: "dog", src: "images/dog.jpg" },
  { name: "fox", src: "images/fox.png" },
  { name: "lion", src: "images/lion.png" },
  { name: "rabbit", src: "images/rabbit.png" },
  { name: "cat", src: "images/cat.png" },
  { name: "cow", src: "images/cow.png" },
  { name: "dog", src: "images/dog.jpg" },
  { name: "fox", src: "images/fox.png" },
  { name: "lion", src: "images/lion.png" },
  { name: "rabbit", src: "images/rabbit.png" },
];

const totalCards = 12;
let flippedCards = [];
let flippedId = [];
let foundCards = [];
let foundCardsId = [];
const scoreHolder = document.querySelector(".score");
let attempts = 0;
const attemptsHolder = document.querySelector(".attempts");

//reset button
const restartButton = document.querySelector(".reset");
restartButton.addEventListener("click", restart);



function restart() {
  //changing all flipped and found cards to blank jpg, and all saved arrays to blank arrays
  const cards = document.querySelectorAll(".grid img");
  for (const id of flippedId) {
    cards[id].setAttribute("src", "images/blank.jpg");
  }
  
  for (const id of foundCardsId) {
    cards[id].setAttribute("src", "images/blank.jpg");
  }
  
  for (const card of cards) {
    card.addEventListener("click", flipCard);
  }

  flippedCards = [];
  flippedId = [];
  foundCards = [];
  foundCardsId = [];
  attempts = 0;
  scoreHolder.textContent = 0;
  attemptsHolder.textContent = 0;

  //randomize
  cardsArray.sort(() => 0.5 - Math.random());

}

//initialize game board
function initializeGame() {
  //randomize array order
  cardsArray.sort(() => 0.5 - Math.random());

  //create each card
  cardsArray.forEach((i) => {
    const gridContainer = document.querySelector(".grid-container");
    const grid = document.createElement("div");
    grid.setAttribute("class", "grid");
    const card = document.createElement("img");
    card.setAttribute("src", "images/blank.jpg");
    card.setAttribute("data-id", cardsArray.indexOf(i));
    grid.appendChild(card);
    gridContainer.appendChild(grid);
    card.addEventListener("click", flipCard);
  });
}

//flipping card
function flipCard() {
  const cardId = this.getAttribute("data-id");
  flippedCards.push(cardsArray[cardId].name);
  flippedId.push(cardId);
  this.setAttribute("src", cardsArray[cardId].src);
  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 300);
  }
}

//check for match
function checkMatch() {
  const cards = document.querySelectorAll(".grid img");

  if (flippedId[0] === flippedId[1]) {
    alert("you clicked the same card");
    cards[flippedId[0]].setAttribute("src", "images/blank.jpg");
  } else if (flippedCards[0] === flippedCards[1]) {
    foundCards.push(flippedCards);
    foundCardsId.push(...flippedId);
    scoreHolder.textContent = foundCards.length;
    cards[flippedId[0]].removeEventListener("click", flipCard);
    cards[flippedId[1]].removeEventListener("click", flipCard);
    attempts++;
  } else {
    cards[flippedId[0]].setAttribute("src", "images/blank.jpg");
    cards[flippedId[1]].setAttribute("src", "images/blank.jpg");
    attempts++;
  }
 
  flippedCards = [];
  flippedId = [];
  scoreHolder.textContent = foundCards.length;
  attemptsHolder.textContent = attempts;
  if (foundCards.length === totalCards / 2) {
    alert("You have found all cards");
    restart();
  }
}

initializeGame();
