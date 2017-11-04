// * **Word**: Used to create an object representing the current word the user is 
//attempting to guess. This should contain word specific logic and data.
var Letter = require("./letter");


var Word = function(index) {			//When creating a word object pass in a number between 0 and 2.

  this.arr = ["zerg", "protoss", "terran", 
  "marine", "queen", "zealot", "pylon", "creep"];	//fill an array with our possible words
  this.completed = this.arr[index];
  this.whatsLeft = this.arr[index];
  this.guesses = 6;
  this.lett = new Letter();			//creates a letter object

  //First build the spaced word _ _ _ _     This happens only once
  this.spaced = this.lett.build(this.completed);		//uses a method from the letter object

  this.update = function(input) {
  	if(this.completed.indexOf(input) != -1 && input){			//This will return -1 if false && input cannot be empty
  		console.log("--------------------------------");		//spaces for console neatness
  		console.log("Correct guess!");							//tells user they guessed right

  		//run this as many times as there are dublicate letters.
  		while(this.whatsLeft.indexOf(input) != -1){
  			//uses a method from the letter object to replace the "this.spaced" with the correct letters
  			this.spaced = this.lett.fillLetters(input, this.whatsLeft.indexOf(input), this.spaced);			//replace the those repective blanks with letters
  			//this fucky line returns the completed word with guessed letter taken out. (ie: word guessed 0 = wrd)
  			this.whatsLeft = this.whatsLeft.slice(0, this.whatsLeft.indexOf(input)) + "_" + this.whatsLeft.slice(this.whatsLeft.indexOf(input) + 1, this.whatsLeft.length);

  		}//end of while loop	
  		
  	}
  	else{	//if the guessed letter is NOT in the word...
  		this.guesses--;//decrement guesses by 1
  		console.log("--------------------------------");
  		console.log("Incorrect guess.");				//Print wrong guess message
  		console.log(this.guesses + " guesses remaining.");		//Prints out the numer of guesses remaining
  	}//end of else

  };//end of update method

};//end of Word constructor function

module.exports = Word;