/*----- constants -----*/
const cards = {
    'A' : 'spades', 'A' : 'diamonds', 'A' : 'clubs', 'A' : 'hearts',
    '1' : 'spades', '1' : 'diamonds', '1' : 'clubs', '1' : 'hearts',
    '2' : 'spades', '2' : 'diamonds', '2' : 'clubs', '2' : 'hearts',
    '3' : 'spades', '3' : 'diamonds', '3' : 'clubs', '3' : 'hearts',
    '4' : 'spades', '4' : 'diamonds', '4' : 'clubs', '4' : 'hearts',
    '5' : 'spades', '5' : 'diamonds', '5' : 'clubs', '5' : 'hearts',
    '6' : 'spades', '6' : 'diamonds', '6' : 'clubs', '6' : 'hearts',
    '7' : 'spades', '7' : 'diamonds', '7' : 'clubs', '7' : 'hearts',
    '8' : 'spades', '8' : 'diamonds', '8' : 'clubs', '8' : 'hearts',
    '9' : 'spades', '9' : 'diamonds', '9' : 'clubs', '9' : 'hearts',
    'J' : 'spades', 'J' : 'diamonds', 'J' : 'clubs', 'J' : 'hearts',
    'Q' : 'spades', 'Q' : 'diamonds', 'Q' : 'clubs', 'Q' : 'hearts',
    'K' : 'spades', 'K' : 'diamonds', 'K' : 'clubs', 'K' : 'hearts'
};
// Assign Value to Card
const cardValue = {
    'A' : [1, 11],
    '1' : 1,
    '2' : 2,
    '3' : 3,
    '4' : 4,
    '5' : 5,
    '6' : 6,
    '7' : 7,
    '8' : 8,
    '9' : 9,
    'J' : 10,
    'Q' : 10,
    'K' : 10
}

/*----- app's state (variables) -----*/
let playerCards;
let playerScore;
let dealerCards;
let dealerScore;
let wins, losses, ties;
let message;

/*----- cached element references -----*/
let playBtn = document.getElementById("play");
let resetBtn = document.getElementById("reset");
let standBtn = document.getElementById("stand");
let hitBtn = document.getElementById("hit");
let pCards = document.getElementById("player_hand"); // Use to add cards in player's hand
let dCards = document.getElementById("dealer_hand");
let pScore = document.getElementById("player_score");
let dScore = document.getElementById("dealer_score");
let h3 = document.querySelector("h3");
let winDisplay = document.querySelector("#display > #wins");
let lossDisplay = document.querySelector("#losses");
let tieDisplay = document.querySelector("#display > #ties");

/*----- event listeners -----*/
// playBtn.addEventListener("click", startGame);
// resetBtn.addEventListener("click", resetGame);
// standBtn.addEventListener("click", stand);
// hitBtn.addEventListener("click", hitBtn);

/*----- functions -----*/
init();

function init() {
    playerCards = [];
    dealerCards = [];
    playerScore = 0;
    dealerScore = 0;
    wins = 0;
    losses = 0;
    ties = 0;
    message = "Welcome To BlackJack, Start Your Game!";

    render();
}

function render() {
    pScore.innerHTML = playerScore;
    dScore.innerHTML = dealerScore;
    winDisplay.innerHTML = wins;
    lossDisplay.innerHTML = losses;
    tieDisplay.innerHTML = ties;
    h3.innerHTML = message;
}