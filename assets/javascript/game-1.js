
$(document).ready(function(){

	//     VARAIBLES
	//------------------------------------------
	//Count Variables 
	var correctCount = 0 ; 
	var incorrectCount = 0 ; 
	var unasweredCount = 0 ; 
	var userAnswer; 
	var timeRemaining = 60; //a minute 
	var interValid; 
	var clockRunning = false;

	//Object list 
	var triviaQuestions =[ {

			question: "Pupusas, handmade thick stuffed corn tortillas, are a traditional dish from what country?", 
			choices: ["Ethiopia", "El Salvadore", "Peru", "Guatamala"],
			correctAnswer: 1,
			imageLink: "assets/images/pupusas.jpg"
		},
		{
		question: "Who Loves Orange Soda?",
        choices: [
           "Kel Loves Orange Soda", 
           "Arnold Loves Orange Soda",
           "Kora Loves Orange Soda",
           "Patrick Loves Orange Soda"
        ],

		correctAnswer: "0", 
		imageLink: "#"
      },
		];


	//     FUNCTIONS
	//------------------------------------------

	//Takes seconds and element as its parameter 
	function countDown(){
		 //  TODO: Use setInterval to start the count here and set the clock to running.
		 if (!clockRunning) {
			clockRunning = true;

			if( timeRemaining === 0 ){
				// Countdown stops.
				stopCountDown();
				$("#timer").html("<h2> OOPS!! times up!</h2>");
			}

			timeRemaining--; //Decrement the value 

			//Display time is this format 00:00 
			var quizTime = timeConverter(timeRemaining); 
			$("#timer").html("<h2>" + quizTime + "</h2>");

			// console.log("timeRemaining: "+ timeRemaining);

			interValid = setInterval(countDown,1000);//run after every second 
		}
		console.log(clockRunning);
	}

	function stopCountDown(){
		clearInterval(interValid);
		clockRunning = false; 
	}
	
	function renderQuestionAns() {

		console.log('renderQuestionAns' + triviaQuestions.length);
		// populates the quiz questions.
		
		for(var i =0; i < triviaQuestions.length; i++){
			
			console.log(triviaQuestions[i].question);
			$("#questionBlock").html( "<center><p id='questiontext'> "+ triviaQuestions[i].question + " <br/></p></center>"); 
			console.log(triviaQuestions[i].choices);
			// $("#answerBlock").html("<p id='anstext'> " + triviaQuestions[i].choices +" </p>"); 
			console.log(triviaQuestions[i].choices.length);
			for (j = 0; j < triviaQuestions[i].choices.length; j++) {
				$('<input id="answers" class="radio" type="radio" name="dynradio' + (i) + '" value="' + (j) + '">' + triviaQuestions[i].choices[j] + '</input><br/>').appendTo("#answerBlock");
			  }
		}
		// else {
		// 	$("#questionBlock").innerHTML  = "<p> Game over!! </p>"; 
		// 	// document.getElementById("score").innerHTML = "Final Score: " + score + " out of " + quizList.length
		// }
	}

	function timeConverter(t) {

		//  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
		var minutes = Math.floor(t / 60);
		var seconds = t - (minutes * 60);
	
		if (seconds < 10) {
		  seconds = "0" + seconds;
		}
	
		if (minutes === 0) {
		  minutes = "00";
		}
	
		else if (minutes < 10) {
		  minutes = "0" + minutes;
		}
	
		return minutes + ":" + seconds;
	  }

	// Main PROCESS -  functions
	//--------------------------------------

	console.log( "ready!" );

	countDown(); //runit for 60 secs passing the element 

	// Calling functions to start the game.
	renderQuestionAns();

	// Captures keyboard input. Depending on the letter pressed it will "call" (execute) different functions.
	document.onkeyup = function(event) {
            userAnswer = event.key; 
	
	}
			
});	