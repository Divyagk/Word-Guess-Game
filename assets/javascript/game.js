
// Declaring computer choices
var computerChoices = ["italy", "france"];

//Creating variables to hold the number of wins, losses, and chances.
var wins = 0;
var losses = 0;
var chances = 18;


// Create variables that hold references to the places in the HTML where we want to display things. 
var directionsText = document.getElementById("directions-text");
var userChoiceText = document.getElementById("userchoice-text");
var computerChoiceText = document.getElementById("computerchoice-text");
var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");
var gussedlettersText = document.getElementById("gussed letters-text");
var GussesRemaningText = document.getElementById("GussesRemaning-text");
// the function is triggered any key is pressed
document.onkeyup = function (event) {
    var userGuess = event.key;
    var dashes = "";
    // Randomly chooses a choice from the options array. This is the Computer's guess.
    var computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];
    console.log(computerGuess);

    for (var i = 0; i < computerGuess.length; i++) {
        dashes += "  _  ";
    }
    console.log(dashes)
    computerChoiceText.textContent = dashes;

}



