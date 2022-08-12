/*----- constants -----*/
const suits = ["spades", "hearts", "diamonds", "clubs"];
const cards = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

/*----- app's state (variables) -----*/
let deck = [];
let playerCards;
let playerScore;
let dealerCards;
let dealerScore;
let wins, losses, ties;
let message;
let totalAmount;
let betValue;
let earned;

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
resetBtn.addEventListener("click", resetGame);
standBtn.addEventListener("click", standButton);
hitBtn.addEventListener("click", hitButton);

/*----- functions -----*/
init();

// init() will initilize all the required variables value when page loads
function init() {
  deck = shuffleDeck();
  playerCards = [];
  dealerCards = [];
  playerScore = 0;
  dealerScore = 0;
  wins = 0;
  losses = 0;
  ties = 0;
  score = 0;
  message = "Welcome To BlackJack, Start Your Game!";
  playBtn.innerHTML = "Play";
  playBtn.style.fontSize = "20px";
  playBtn.style.width = "15vh";
  let rmCards = document.querySelectorAll(".card");
  rmCards.forEach(function (card) {
    card.remove();
  });

  render();
}

// render() will render all the value everytime value updates
function render() {
  pScore.innerHTML = playerScore;
  winDisplay.innerHTML = wins;
  lossDisplay.innerHTML = losses;
  tieDisplay.innerHTML = ties;
  h3.innerHTML = message;
}

// getDeck() will make deck of 52 cards with the combination of 13 cards and 4 suits
function getDeck() {
  let cardDeck = [];
  for (i = 0; i < cards.length; i++) {
    for (j = 0; j < suits.length; j++) {
      if (cards[i] === "A") {
        cardDeck.push({ card: cards[i], suit: suits[j], value: 11 });
      } else if (cards[i] === "J" || cards[i] === "Q" || cards[i] === "K") {
        cardDeck.push({ card: cards[i], suit: suits[j], value: 10 });
      } else {
        cardDeck.push({
          card: cards[i],
          suit: suits[j],
          value: parseInt(cards[i]),
        });
      }
    }
  }
  return cardDeck;
}

// shuffleDeck() will shuffle cards after making deck
function shuffleDeck() {
  let shuffleDeck = getDeck();
  let index = 0;
  while (index < shuffleDeck.length) {
    let arrIdx1 = Math.floor(Math.random() * shuffleDeck.length + 0);
    let arrIdx2 = Math.floor(Math.random() * shuffleDeck.length + 0);
    let temp;

    temp = shuffleDeck[arrIdx1];
    shuffleDeck[arrIdx1] = shuffleDeck[arrIdx2];
    shuffleDeck[arrIdx2] = temp;

    index++;
  }
  return shuffleDeck;
}

// startGame() will be called when the player will click on the Play Button
function startGame() {
  if (playBtn.innerHTML === "Play Again?") {
    resetBoard();
  }
  for (let i = 0; i < 2; i++) {
    let playerC = deck.pop();
    let dealerC = deck.pop();
    playerCards.push({ c: playerC.card, s: playerC.suit });
    dealerCards.push({ c: dealerC.card, s: dealerC.suit });
    playerScore += playerC.value;
    dealerScore += dealerC.value;

    render();
    displayPlayerCards(playerC);
  }
  render();
  displayDealerCards();
  if (playerScore < 21) {
    message = "Make you move below! Choose to hit or stand";
    render();
  }
  if (playerScore == 21) {
    faceUpCard();
    dScore.innerHTML = dealerScore;
    message = "You Win! Hurray";
    wins += 1;
    render();
  }
  if (playerScore > 21) {
    faceUpCard();
    dScore.innerHTML = dealerScore;
    message = "You loose! Better Luck Next Time";
    losses += 1;
    render();
  }
  playAgain();
}

// displayPlayerCards() will add and display card on the screen whenever needed
function displayPlayerCards(pCard) {
  let divEl = document.createElement("div");
  if (
    pCard.card == "A" ||
    pCard.card == "J" ||
    pCard.card == "Q" ||
    pCard.card == "K"
  ) {
    divEl.classList.add("card", "large", `${pCard.suit}`, `${pCard.card}`);
    pCards.appendChild(divEl);
  } else {
    divEl.classList.add("card", "large", `${pCard.suit}`, `r${pCard.card}`);
    pCards.appendChild(divEl);
  }
}

// displayDealerCards() will add and display two card in the beginning of the game
function displayDealerCards() {
  for (let i = 0; i < dealerCards.length; i++) {
    let card = dealerCards[i].c;
    let suit = dealerCards[i].s;
    let divEl = document.createElement("div");
    if (i === 1) {
      divEl.classList.add("card", "large", "back");
      dCards.appendChild(divEl);
    } else {
      if (card == "A" || card == "J" || card == "Q" || card == "K") {
        divEl.classList.add("card", "large", `${suit}`, `${card}`);
        dCards.appendChild(divEl);
      } else {
        divEl.classList.add("card", "large", `${suit}`, `r${card}`);
        dCards.appendChild(divEl);
      }
    }
  }
}

// playAgain() will be called to change the CSS of play Button
function playAgain() {
  playBtn.innerHTML = "Play Again?";
  playBtn.style.fontSize = "20px";
  playBtn.style.width = "20vh";
}

// resetBoard() will reset the player's and dealer's cards and score after each game
function resetBoard() {
  if (deck.length < 22) {
    message = "Not enough cards! Reset The Game";
  } else {
    message = "Welcome To BlackJack, Start Your Game!";
  }
  playerScore = 0;
  dealerScore = 0;
  playerCards = [];
  dealerCards = [];
  dScore.innerHTML = dealerScore;
  let rmCards = document.querySelectorAll(".card");
  rmCards.forEach(function (card) {
    card.remove();
  });

  render();
}

// hitButton() will be called when player choose to hit in game
function hitButton() {
  let s = 0;
  if (playerScore <= 21) {
    var playerC = deck.pop();
    playerCards.push({ c: playerC.card, s: playerC.suit });
    s = playerScore + playerC.value;
    if (playerCards[0].c == "A" || playerCards[1].c == "A") {
      if (s > 21) {
        if (playerCards[0].c == "A" && playerCards[1].c == "A") {
          s = s - 10;
          playerScore = s;
        } else if (playerC.card == "A") {
          s = s - 10;
          playerScore = s;
        } else if (playerC.card != "A") {
          if (playerCards[2].c === playerC.card) {
            s = s - 10;
            playerScore = s;
          } else {
            playerScore = s;
          }
        } else if (playerCards[0].c == "A") {
          s = s - 10;
          playerScore = s;
        } else if (playerCards[1].c == "A") {
          s = s - 10;
          playerScore = s;
        } else {
          playerScore = s;
        }
      } else {
        if (playerC.card != "A") {
          if (playerCards[2].c === playerC.card) {
            s = s - 10;
            playerScore = s;
          } else {
            playerScore = s;
          }
        }
        // playerScore = s;
      }
    } else if (s > 21) {
      if (acesInHand(playerCards)) {
        if (playerC.card == "A") {
          s = s - 10;
          playerScore = s;
        } else {
          playerScore = s;
        }
      } else {
        playerScore = s;
      }
    } else {
      playerScore = s;
    }
    displayPlayerCards(playerC);
    compare();
  } else {
    message = "You loose! Better Luck Next Time";
    losses += 1;
  }
  render();
}

// standButton() will be called when player choose to stand in game
function standButton() {
  if (dealerScore > playerScore) {
    if (dealerScore <= 21) {
      faceUpCard();
      message = "You loose! Better Luck Next Time";
      losses += 1;
    } else {
      message = "You Win! Hurray";
      wins += 1;
    }
  } else {
    faceUpCard();
    while (dealerScore <= 21) {
      // Add Card
      let s = 0;
      let dealerC = deck.pop();
      dealerCards.push({ c: dealerC.card, s: dealerC.suit });
      s = dealerScore + dealerC.value;
      if (dealerCards[0].c == "A" || dealerCards[1].c == "A") {
        if (s > 21) {
          if (dealerCards[0].c == "A" && dealerCards[1].c == "A") {
            s = s - 10;
            dealerScore = s;
          } else if (dealerC.card == "A") {
            s = s - 10;
            dealerScore = s;
          } else if (dealerC.card != "A") {
            if (dealerCards[2].c === dealerC.card) {
              s = s - 10;
              dealerScore = s;
            } else {
              dealerScore = s;
            }
          } else if (dealerScore[0].c == "A") {
            s = s - 10;
            dealerScore = s;
          } else if (dealerCards[1].c == "A") {
            s = s - 10;
            dealerScore = s;
          } else {
            dealerScore = s;
          }
        } else {
          if (dealerC.card != "A") {
            if (dealerCards[2].c === dealerC.card) {
              s = s - 10;
              dealerScore = s;
            } else {
              dealerScore = s;
            }
          }
        }
      } else if (s > 21) {
        if (acesInHand(dealerCards)) {
          if (dealerC.card == "A") {
            s = s - 10;
            dealerScore = s;
          } else {
            dealerScore = s;
          }
        } else {
          dealerScore = s;
        }
      } else {
        dealerScore = s;
      }
      render();
      addOneDealerCard(dealerC);
      // Break Condition
      if (dealerScore > playerScore) {
        if (dealerScore > 21 && playerScore <= 21) {
          message = "You Win! Hurray";
          wins += 1;
          break;
        } else {
          message = "You loose! Better Luck Next Time";
          losses += 1;
          break;
        }
      } else if (dealerScore == playerScore) {
        message = "It's Tie! Noone Won";
        ties += 1;
      }
      render();
    }
  }
  render();
}

// addOneDealerCard() will single card in dealer's hand when needed
function addOneDealerCard(dealerC) {
  let divEl = document.createElement("div");
  if (
    dealerC.card == "A" ||
    dealerC.card == "J" ||
    dealerC.card == "Q" ||
    dealerC.card == "K"
  ) {
    divEl.classList.add("card", "large", `${dealerC.suit}`, `${dealerC.card}`);
    dCards.appendChild(divEl);
    dScore.innerHTML = dealerScore;
  } else {
    divEl.classList.add("card", "large", `${dealerC.suit}`, `r${dealerC.card}`);
    dCards.appendChild(divEl);
    dScore.innerHTML = dealerScore;
  }
  render();
}

// resetGame() will be called when player will call the Reset Button
function resetGame() {
  init();
  dScore.innerHTML = dealerScore;
}

// acesInHand() will check if the hand has more than one ace in it and if it has more than
// one aces in hand it will assign its value to 1 otherwise keep it to 11
function acesInHand(hand) {
  let acesCount = 0;
  for (i = 0; i < hand.length; i++) {
    if (hand[i].c === "A") {
      acesCount += 1;
    }
  }

  if (acesCount >= 1) {
    return true;
  } else {
    return false;
  }
}

// compare() will be called to compare the playerScore against dealerScore
function compare() {
  if (playerScore == 21) {
    message = "You Win! Hurray";
    wins += 1;
    faceUpCard();
  } else if (playerScore > 21) {
    message = "You loose! Better Luck Next Time";
    losses += 1;
    faceUpCard();
  }
}

// faceUpCard() will be used to faceUp the second card of dealer in game
function faceUpCard() {
  let el = document.querySelector(".back");
  el.classList.remove("back");
  if (
    dealerCards[1].c == "A" ||
    dealerCards[1].c == "J" ||
    dealerCards[1].c == "Q" ||
    dealerCards[1].c == "K"
  ) {
    el.classList.add(`${dealerCards[1].s}`, `${dealerCards[1].c}`);
    dScore.innerHTML = dealerScore;
  } else {
    el.classList.add(`${dealerCards[1].s}`, `r${dealerCards[1].c}`);
    dScore.innerHTML = dealerScore;
  }
}
