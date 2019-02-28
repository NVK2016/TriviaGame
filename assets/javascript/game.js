
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
	var clockRunning = true;

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

		if (clockRunning) {
			
			timeRemaining--; //Decrement the value 

			//Display time is this format 00:00 
			var quizTime = timeConverter(timeRemaining); 
			$("#timer").html("<h2>" + quizTime + "</h2>");

			console.log("timeRemaining: "+ timeRemaining);

			interValid = setInterval(countDown,1000);//run after every second 

			if( timeRemaining === 0 ){
				//stopt the clock 
				stopCountDown(); 
				// Timer is replaces with text
				$("#timer").html("<h4>ALL DONE</h4>");
				// Quiz is replaced with scores/quiz data
				$("#quiz-container").html("<h4>Correct Answers: " + quiz.correctAnswers + "</h4>");
				$("#quiz-container").append("<h4>Wrong Answers: " + quiz.wrongAnswers + "</h4>");
				
			}
		}
	
	}

	//Resets the clock to stop 

	function stopCountDown(){
		// console.log("stopCountDown");

		clearInterval(interValid);
		clockRunning = false;  //Reset 
		timeRemaining = 60; //Reset timer 

	}
	
	//Returns the time in this formnat 00:00 
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

	//Calling the Timer function 
	countDown(); 

});	