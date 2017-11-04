// Requiring our word module exported from word.js
var Word = require("./word.js");
var inquirer = require("inquirer");


// Creating a new Word with our constructor using the random number
var daWord = new Word(Math.floor(Math.random() * 7));	//this should choose one of the three word in the array.  (Maybe change this to arr.length)
//QUESTION: how would I reference one of an objects 
// recursive function which will allow the user continue guessing
var playGame = function() {
  // if the length of the team array is 3 or higher, no more questions will be asked
  if (daWord.guesses > 0) {			//TODO: change this condition to "if the games not over"
    console.log("\nNEW TURN!\n");
    console.log(daWord.spaced + "\n");

    inquirer.prompt([
      {
        name: "name",
        message: "What's your guess?: "
      }
    ]).then(function(answers) {
      //checks to see if input is acceptable..
      if(answers.name.length > 1 || parseInt(answers.name)){    //If the user tries to input multiple characters or a number...
        console.log("Please only guess one letter at a time.");
        playGame();
      }
      else{
        //Once we know the input is acceptable make the guesses lowercase
        answers.name = answers.name.toLowerCase();

        //console.log("The word we're looking for is... " + daWord.completed);    //here for testing..
        //Then do the comparator logic.
        daWord.update(answers.name);
        if(daWord.completed.split('').join(' ') == daWord.spaced){     //this catches if the game is won
          console.log("WINNER WINNER CHICKEN DINNER!!");
          console.log(daWord.completed + " was the secret word. \n ");

          inquirer.prompt([
          {
            type: "confirm",
            message: "\n Would you like to play again?",
            name: "confirm",
            default: true
          }
          ]).then(function(answers) {
            if(answers.confirm == true){      //if they want to play again choose a new word and reset # of guesses
                daWord = new Word(Math.floor(Math.random() * 3));
                daWord.guesses = 6;
                console.log(daWord.guesses);
                playGame();
            }//otherwise the game closes
          });
        }
        else{ //if played didn't win...
              playGame();                 //run that shit again... (could put the conditional here..) until we win/lose

        }

      }//end of else
      
      //CONSOLE LOG OUT THE PROGRESS OF THE WORD HERE.

    }); //end of promise
  }//end of if statement
  else{     //indicates game over (out fo guesses)
      inquirer.prompt([
      {
        type: "confirm",
        message: "\nGAME OVER\n Would you like to play again?",
        name: "confirm",
        default: true
      }
    ]).then(function(answers) {
      if(answers.confirm == true){      //if they want to play again choose a new word and reset # of guesses
          daWord = new Word(Math.floor(Math.random() * 3));
          daWord.guesses = 6;
          console.log(daWord.guesses);
          playGame();
      }//otherwise the game closes
    });
  }
};

playGame();   //runs the game initially
