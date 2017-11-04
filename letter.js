// * **Letter**: Used for each letter in the current word. Each letter object should 
//either display an underlying character, or a blank placeholder (such as an underscore),
// depending on whether or not the user has guessed the letter. This should contain letter specific logic and data.

//Doesn't require anything because it's on the bottom of the food chain.

// Constructor function for creating Letter objects
var Letter = function() {
	
  this.build = function(werd) {			//This method builds the spaces for the word initially
  	var spaced = "";
  	for(var i = 0; i < werd.length; i++){
  		spaced += "_ ";
  	}
  	return spaced;
  }

  this.fillLetters = function(input, index, spaced) {			//This method builds the spaces for the word initially
  	//take <spaced> and remove the white space from it
  	var noWhite = spaced.replace(/ /g,'');
  	//change the correct spaces to the guessed letters
	noWhite = noWhite.substr(0, index) + input + noWhite.substr(index + 1);
	var result = noWhite.split('').join(' '); 	//add the whitespace back and return
  	return result;
  }

};

// Exporting our Letter constructor. We will require it in word.js
module.exports = Letter;