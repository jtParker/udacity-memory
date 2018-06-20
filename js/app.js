// Shuffle cards and ready the game for play
const cardArr = ['fa fa-diamond', 'fa fa-space-shuttle', 'fa fa-beer', 'fa fa-bolt', 'fa fa-headphones', 'fa fa-leaf', 'fa fa-gamepad', 'fa fa-bomb', 'fa fa-diamond', 'fa fa-space-shuttle', 'fa fa-beer', 'fa fa-bolt', 'fa fa-headphones', 'fa fa-leaf', 'fa fa-gamepad', 'fa fa-bomb',];
const card = document.querySelectorAll('.card');
let deckArr = document.querySelectorAll('li.card > i');
let timeEl = document.getElementById('timer');
let movesEl = document.getElementById('moves');
let selections = [];
let moves = 0;
let flips = 0;
let interval;
let seconds = 0;

// Shuffle cards and reset the game

readyGame(deckArr);

function readyGame(arr) {
  let deck = document.querySelectorAll('.deck, li');
  let shuffledCards = shuffle(cardArr);
  resetCards(selections);
  for (let i = 0; i < arr.length; i++) {
    let elm = arr[i];
    let newClass = shuffledCards[i];
    elm.className = newClass;
   }
 }

 function newGame(arr) {
   let secondElem = document.querySelector('#timer');
   let movesElem = document.querySelector('#moves');
   let stars = document.querySelector(".stars");
   secondElem.innerHTML = '';
   movesElem.innerHTML ='';
   resetStars(stars);
   seconds = 0;
   moves = 0;
   clearInterval(interval);
   readyGame(arr);
 }

 function resetCards(selections) {
   for (var i = 0; i < selections.length; i++) {
     selections[i].className = 'card';
   }
 }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Card click handler

function cardClick(e) {
  let currentCards = document.getElementsByClassName('card match');
  if (moves === 0) {
    interval = setInterval(timer, 1000);
  }
  moves++;
  movesEl.innerHTML = moves;
  compare(selections, e);
  if (currentCards.length === 16){
    clearInterval(interval);
    allMatched();
  }
  starRank(currentCards);
}

document.addEventListener('click',function(e,) {
  let pick = e.target;
  let modal = document.querySelector('#win-modal');
  let modalOverlay = document.querySelector('#modal-overlay');
  if (pick.className === "card") {
    selections.unshift(pick);
    cardClick(e);
  } else if (pick.className === 'fa fa-repeat') {
    newGame(deckArr);
  } else if (pick.className === 'fa fa-repeat modal') {
    modal.classList.toggle('closed');
    modalOverlay.classList.toggle('closed');
    newGame(deckArr);
  }
});

// Flip the clicked card

function flipCard(e) {
  e.target.className = "card open show";
}

// Compare cards

function compare(selections, e) {
  let currentCards = document.getElementsByClassName('card match');

  flips++
  if (flips === 2) {
    flipCard(e);
    for (var i = 0; i < selections.length; i++) {
      let card1 = selections[0];
      let card2 = selections[1];
      if (card1.firstElementChild.className === card2.firstElementChild.className) {
        card1.className = 'card match';
        card2.className = 'card match';
        break;
      } else {
        setTimeout(function() {
          card1.className = 'card';
          card2.className = 'card';
        }, 700);
      }
    }
  } else if (currentCards.length === 16){
    clearInterval(interval);
    allMatched();
  } else {
    flipCard(e);
    return;
  }
  flips = 0;
}

// check for completion

function allMatched() {
  let modal = document.querySelector('#win-modal');
  let modalOverlay = document.querySelector('#modal-overlay');
  let finalMoves = document.querySelector('#final-moves');
  let finalTime = document.querySelector('#final-time');

  modalOverlay.classList.toggle('closed');
  modal.classList.toggle('closed');
  finalMoves.innerHTML = moves;
  finalTime.innerHTML = seconds + ' seconds';
}

// timer

function timer() {
  seconds++
  timeEl.innerHTML = seconds;
}

// Star ranking

function starRank(cardMatches) {
  let stars = document.querySelector('.stars');
  let modalStars = document.querySelector('.modal-stars');

  if (moves >= 50) {
    stars.children[0].style.visibility = 'hidden';
    stars.children[1].style.visibility = 'hidden';
    modalStars.children[0].style.display = 'none';
    modalStars.children[1].style.display = 'none';
  } else if (moves >= 30 ) {
      stars.children[0].style.visibility = 'hidden';
      modalStars.children[0].style.display = 'none';
  }
}

function resetStars(starNode) {
  for (var i = 0; i < starNode.children.length; i++) {
    starNode.children[i].style.visibility = 'visible';
  }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
