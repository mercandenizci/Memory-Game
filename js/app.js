const cards = document.querySelectorAll('.card');/* cards variable holds a list of all cards */
const deck = document.querySelector('.deck');/* decks variable selects deck */
let toggledCards = [];


/* Sets moves, clocks and matches to 0 at the start of game */
let moves = 0;
let clockOff = true;
let time = 0;
let clockId;
let matched = 0;

/* Function to increase moves with every click*/
function addMove() {
	moves++;
	const movesText = document.querySelector('.moves');
	movesText.innerHTML = moves;

}

/* Function to check score and hide stars according to the number of moves */
function checkScore() {
	if (moves === 16 || moves === 24) {
		hideStar();
	}
}

function hideStar() {
	const starList = document.querySelectorAll('.stars li');
	for (star of starList) {
		if (star.style.display !== 'none') {
			star.style.display = 'none';
			break;
		}
	}
}

/* Function to display Time */
function displayTime() {
	const clock = document.querySelector('.clock');
	console.log(clock);
	clock.innerHTML = time;

	const minutes = Math.floor(time / 60);
	const seconds = time % 60;

	if (seconds < 10) {
		clock.innerHTML = `${minutes}:0${seconds}`;
	} else {
		clock.innerHTML = `${minutes}:${seconds}`;
	}
} 
/* Function to start the clock*/
function startClock() {
	let clockId = setInterval(() => {
		time++;
		displayTime();
		console.log(time);
	}, 1000);
}
/* Function to stop the clock*/
function stopClock() {
	clearInterval(clockId);
}

/* Shuffle function from http://stackoverflow.com/a/2450976*/
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

/* Function to shuffle the deck*/
function shuffleDeck() {
	const cardsToShuffle = Array.from(document.querySelectorAll('.deck li')); /*Put the deck variable in an array*/
	const shuffledCards = shuffle(cardsToShuffle);
	for (card of shuffledCards) {
		deck.appendChild(card);
	}
}

shuffleDeck();

/* Event listener to take track of moves*/
deck.addEventListener('click', event => {
	const clickTarget = event.target;

	if (isClickValid(clickTarget /* Starts the clock when the first card is clicked*/
		)) {
			if (clockOff) {
			startClock();
			clockOff = false;
		}

		toggleCard(clickTarget);
		addToggleCard(clickTarget);


		if (toggledCards.length === 2) { /*Checkes for match, score and adds move when 2 cards are clicked*/
			checkForMatch(clickTarget);
			addMove();
			checkScore();
	
		}
	}

});

/* Conditional function to check if it is a card and a match*/
function isClickValid(clickTarget) {
	return (
		clickTarget.classList.contains('card') &&
		!clickTarget.classList.contains('match') &&
		toggledCards.length < 2 &&
		!toggledCards.includes(clickTarget)

	);

}

/* When clicked make switch the card to open*/
function toggleCard(clickTarget) {
	clickTarget.classList.toggle('open');
	clickTarget.classList.toggle('show');
}

// pushes the clickTarget into the toggledCards array
function addToggleCard(clickTarget) {
	toggledCards.push(clickTarget);
	console.log(toggledCards);
}

/*Function to check for match*/
function checkForMatch() {
	/*If it is a match*/
	if (
		toggledCards[0].firstElementChild.className ===
		toggledCards[1].firstElementChild.className
	) {
		toggledCards[0].classList.toggle('match');
		toggledCards[1].classList.toggle('match');
		toggledCards = [];
		matched++;
		console.log('Its a match');
	}/*If it is not a match*/
	 else {
		setTimeout(() => {
		
		toggleCard(toggledCards[0]);
		toggleCard(toggledCards[1]);
		toggledCards = [];
		console.log('Its not a match');
	}, 1000);
}
//If there are 8 mathces then the game is over
	if (matched === 8) {
		gameOver();
	}
}

/*Setting modals and adding event listeners to them*/
function toggleModal() {
	const modal = document.querySelector('.modal__background');
	modal.classList.toggle('hide');

	document.querySelector('.modal__cancel').addEventListener('click', () => {
		toggleModal();
	});

	document.querySelector('.modal__replay').addEventListener('click', replayGame);

	document.querySelector('.restart').addEventListener('click', resetGame);
}

toggleModal();
toggleModal();


/*Display time, moves and stars when modal is displayed*/
function writeModalStats() {
	const timeStat = document.querySelector('.modal__time');
	const clockTime = document.querySelector('.clock').innerHTML;
	const movesStat = document.querySelector('.modal__moves');
	const starsStat = document.querySelector('.modal__stars');
	const stars = getStars();

	timeStat.innerHTML = `Time = ${clockTime}`;
	movesStat.innerHTML = `Moves = ${moves}`;
	starsStat.innerHTML = `Stars = ${stars}`;
}

/*Reset game function. Clock, time and moves are reset. Decks are shuffled for another game*/
function resetGame() {
	resetClockAndTime();
	resetMoves();
	resetStars();
	shuffleDeck();
	
}

/*Stopping and resetting time*/
function resetClockAndTime() {
	stopClock();
	clockOff = true;
	time = 0;
	displayTime();
}
/*Resetting moves*/
function resetMoves() {
	moves = 0;
	document.querySelector('.moves').innerHTML = moves;
}
/*Resetting stars*/
function resetStars() {
	stars = 0;
	const starList = document.querySelectorAll('.stars li');
	for (start of starList) {
		star.style.display = 'inline';
	}
}
/*Resetting cards*/
function resetCards() {
	const cards = document.querySelectorAll('.deck li');
	for (let card of cards) {
		card.className = 'card';
	}
}
/*Displaying stars*/
function getStars() {
	stars = document.querySelectorAll('.stars li');
	starCount = 0;
	for (star of stars) {
		if (star.style.display !== 'none') {
			starCount++;
		}
	}
	console.log(starCount);
	return starCount;
}
/*Game over function. Clock is stopped, modal pops out to display time, stars and moves*/
function gameOver() {
	stopClock();
	writeModalStats();
	toggleModal(); 
}

/*Resets gae when clicked on the reset arrow*/
function replayGame() {
	resetGame();
	toggleModal();
}

