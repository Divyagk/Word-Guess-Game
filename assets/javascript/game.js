
//'use strict';
// Declaring computerchoices
var computerChoices = ["italy", "france", "russia", "canada", "china", "india", "sudan", "brazil",];

//Creating variables to hold the number of wins, losses, and chances.
var wins = 0;
var Loss = 0;
var chances = 10;
var gamefinished = false; //indicate press any key to start game.
var computerGuess;    //the computerguess and index of current word.
var guessedLetters = [];
var guessingWord = [];
var remainingGusses = 0;
// For Game sounds
var keySound = new Audio('./assets/sounds/typewriter-key.wav');
var winSound = new Audio('./assets/sounds/you-win.wav');
var loseSound = new Audio('./assets/sounds/you-lose.wav');

// Reset the game variabless
function resetGame() {
    remainingGusses = chances;
    computerGuess = Math.floor(Math.random() * (computerChoices.length));

    // Clearing the arrays
    guessedLetters = [];
    guessingWord = [];


    // Build the guessing word and clear it out
    for (var i = 0; i < computerChoices[computerGuess].length; i++) {
        guessingWord.push("_");
    }
    // Hide the gameover, youwin & presskey try again
    document.getElementById("pressKeyTryAgain").style.cssText = "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";

    // Show display
    updateDisplay();
}


//  Updates the display on the HTML Page
function updateDisplay() {

    document.getElementById("wins-text").innerText = wins;
    document.getElementById("Loss-text").innerText = Loss;
    console.log(wins)

    // Display how much of the word we have already guessed on screen.

    var guessingWordText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        guessingWordText += guessingWord[i];
    }
    console.log(guessingWordText);
    console.log(guessedLetters);

    document.getElementById("currentword-text").innerText = guessingWordText;
    document.getElementById("GuessesRemaning-text").innerText = remainingGusses;
    document.getElementById("guessedLetters-text").innerText = guessedLetters;
}


// This function takes a letter and finds all instances of 
// appearance in the string and replaces them in the guess word.
function evaluateGuess(letter) {
    // Array to store positions of letters in string
    var positions = [];

    // Loop through word finding all instances of guessed letter, store the indicies in an array.
    for (var i = 0; i < computerChoices[computerGuess].length; i++) {
        if (computerChoices[computerGuess][i] === letter) {
            positions.push(i);
        }
    }

    // if there are no indicies, remove a guess.
    if (positions.length <= 0) {
        remainingGusses--;

    } else {
        // Loop through all the indicies and replace the '_' with a letter.
        for (var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
}
// Checks for a win by seeing if there are any remaining underscores in the guessingword we are building.
function checkWin() {
    if (guessingWord.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        wins++;
        winSound.play();
        gamefinished = true;
    }
}


// Checks for a loss
function checkLoss() {
    if (remainingGusses <= 0) {
        loseSound.play();
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
        Loss++;
        gamefinished = true;
    }

}

function makeGuess(letter) {
    if (remainingGusses > 0) {
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }

}


// Event listener.....if a game finished we want to reset the whole game..
document.onkeydown = function (event) {
    if (gamefinished) {
        resetGame();
        gamefinished = false;
    }
    else {
        // a=65 & z=90{we want to make sure that a to z was pressed}
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            keySound.play();
            makeGuess(event.key.toLowerCase());
            updateDisplay();
            checkWin();
            checkLoss();
        }
    }
}











