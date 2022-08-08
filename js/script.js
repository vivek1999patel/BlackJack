/*----- constants -----*/
const suits = ['spades', 'hearts', 'diamonds', 'clubs'];
const cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

/*----- app's state (variables) -----*/
let deck = [];
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
let pCards = document.getElementById("player_hand");
let dCards = document.getElementById("dealer_hand");
let pScore = document.getElementById("player_score");
let dScore = document.getElementById("dealer_score");
let h3 = document.querySelector("h3");
let winDisplay = document.querySelector("#display > #wins");
let lossDisplay = document.querySelector("#losses");
let tieDisplay = document.querySelector("#display > #ties");

/*----- event listeners -----*/
playBtn.addEventListener("click", startGame);
// resetBtn.addEventListener("click", resetGame);
// standBtn.addEventListener("click", stand);
hitBtn.addEventListener("click", hitButton);

/*----- functions -----*/
init();

function init() {
    deck = shuffleDeck();
    // console.log(deck);
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
    // dScore.innerHTML = dealerScore;
    winDisplay.innerHTML = wins;
    lossDisplay.innerHTML = losses;
    tieDisplay.innerHTML = ties;
    h3.innerHTML = message;
}

function getDeck() {
    let cardDeck = [];
    for (i = 0; i < cards.length; i++) {
        for (j = 0; j < suits.length; j++) {
            if (cards[i] === 'A') {
                cardDeck.push({card : cards[i], suit : suits[j], value : 11});
            } else if (cards[i] === 'J' || cards[i] === 'Q' || cards[i] === 'K') {
                cardDeck.push({card : cards[i], suit : suits[j], value : 10});
            } else {
                cardDeck.push({card : cards[i], suit : suits[j], value : parseInt(cards[i])});
            }
        }
    }
    return cardDeck;
}

function shuffleDeck() {
    let shuffleDeck = getDeck();
    let index = 0;
    while (index < shuffleDeck.length) {
        let arrIdx1 = Math.floor(Math.random() * shuffleDeck.length);
        let arrIdx2 = Math.floor(Math.random() * shuffleDeck.length);
        let temp;

        temp = shuffleDeck[arrIdx1];
        shuffleDeck[arrIdx1] = shuffleDeck[arrIdx2];
        shuffleDeck[arrIdx2] = temp;

        index++;
    }
    return shuffleDeck;
}

function startGame() {
    for (let i = 0; i < 2; i++) {
        let playerC = deck.pop();
        let dealerC = deck.pop();
        playerCards.push({c : playerC.card, s : playerC.suit});
        playerScore += playerC.value;
        dealerCards.push({c : dealerC.card, s : dealerC.suit});
        dealerScore += dealerC.value;
    }

    message = "Great! Choose To Stand or Hit!"
    render();
    displayPlayerCards();
    displayDealerCards();
    
}

function hitButton() {
    let divEl = document.createElement("div");
    if (playerScore <= 21) {
        var playerC = deck.pop();
        playerCards.push({c : playerC.card, s : playerC.suit});
        playerScore += playerC.value;
        if (playerC.card == 'A' || playerC.card == 'J' || playerC.card == 'Q' || playerC.card == 'K') {
            divEl.classList.add("card", "large", `${playerC.suit}`, `${playerC.card}`);
            pCards.appendChild(divEl);
        } else {
            divEl.classList.add("card", "large", `${playerC.suit}`, `r${playerC.card}`);
            pCards.appendChild(divEl);
        }
        // render();
        compare();
    }
    else {
        message = "You loose! Better Luck Next Time";
    }
    render();
}

function compare() {
    if (playerScore > 21) {
        message = "You loose! Better Luck Next Time";
        var el = document.querySelector(".back");
        console.log(el);
        el.classList.remove("back");
        console.log(el);
        if (dealerCards[1].c == 'A' || dealerCards[1].c == 'J' || dealerCards[1].c == 'Q' || dealerCards[1].c == 'K') {
            el.classList.add(`${dealerCards[1].s}`, `${dealerCards[1].c}`);
            // dCards.appendChild(divEl);
            dScore.innerHTML = dealerScore;
        } else {
            el.classList.add(`${dealerCards[1].s}`, `r${dealerCards[1].c}`);
            // dCards.appendChild(divEl);
            dScore.innerHTML = dealerScore;
        }
    }
}

function displayPlayerCards() {
    for (let i = 0; i < playerCards.length; i++) {
        let card = playerCards[i].c;
        let suit = playerCards[i].s;
        let divEl = document.createElement("div");
        if (card == 'A' || card == 'J' || card == 'Q' || card == 'K') {
            divEl.classList.add("card", "large", `${suit}`, `${card}`);
            pCards.appendChild(divEl);
        } else {
            divEl.classList.add("card", "large", `${suit}`, `r${card}`);
            pCards.appendChild(divEl);
        }
    }
}

function displayDealerCards() {
    for (let i = 0; i < dealerCards.length; i++) {
        let card = dealerCards[i].c;
        let suit = dealerCards[i].s;
        let divEl = document.createElement("div");
        if (i === 1) {
            divEl.classList.add("card", "large", "back");
            dCards.appendChild(divEl);
        } else {
            if (card == 'A' || card == 'J' || card == 'Q' || card == 'K') {
                divEl.classList.add("card", "large", `${suit}`, `${card}`);
                dCards.appendChild(divEl);
            } else {
                divEl.classList.add("card", "large", `${suit}`, `r${card}`);
                dCards.appendChild(divEl);
            }
        }
    }
}