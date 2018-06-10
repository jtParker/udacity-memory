// Shuffle cards and ready the game for play
const cardArr = ['fa fa-diamond', 'fa fa-space-shuttle', 'fa fa-beer', 'fa fa-bolt', 'fa fa-headphones', 'fa fa-leaf', 'fa fa-gamepad', 'fa fa-bomb', 'fa fa-diamond', 'fa fa-space-shuttle', 'fa fa-beer', 'fa fa-bolt', 'fa fa-headphones', 'fa fa-leaf', 'fa fa-gamepad', 'fa fa-bomb',];
const card = document.querySelectorAll('.card');
let deckArr = document.querySelectorAll('li.card > i');
let timeEl = document.getElementById('timer');
let selections = [];
let moves = 0;
let flips = 0;
let seconds = 0;

readyGame(deckArr);

function readyGame(arr) {
  let shuffledCards = shuffle(cardArr);
  for (let i = 0; i < arr.length; i++) {
    let elm = arr[i];
    let newClass = shuffledCards[i];
    elm.className = newClass;
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

// Click handler

function cardClick(e) {
  let interval;
  if (moves === 0) {
    interval = setInterval(timer, 1000);
  }
  moves++;
  compare(selections, e);
}

document.addEventListener('click',function(e) {
  let pick = e.target;
  if (pick.className === "card") {
    selections.unshift(pick);
    cardClick(e);
  }
});

// Flip the clicked card

function flipCard(e) {
  e.target.className = "card open show";
}

// Compare cards

function compare(selections, e) {
  flips++
  if (flips === 2) {
    flipCard(e);
    for (var i = 0; i < selections.length; i++) {
      let card1 = selections[0];
      let card2 = selections[1];
      if (card1.firstElementChild.className === card2.firstElementChild.className) {
        card1.className = 'card match'
        card2.className = 'card match'
        break;
      } else {
        setTimeout(function() {
          card1.className = 'card'
          card2.className = 'card'
        }, 800);
      }
    }
    selections = [];
  } else {
    flipCard(e);
    return;
  }
  flips = 0;
  console.log(selections.every(allMatched));
}

// check for completion

function allMatched(element, index, array) {
  selections.every(function() {
    return element[index].className.split() === 'card match';
  })
}

// timer functions

function timer() {
  seconds++
  timeEl.innerHTML = seconds;
}

function stopTimer() {
  clearTimeout(time);
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
