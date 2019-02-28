
$(document).ready(function(){

	//     VARAIBLES
	//------------------------------------------
	//Count Variables 
	var correctCount = 0 ; 
	var incorrectCount = 0 ; 
	var unasweredCount = 0 ; 
	var currentQuestion = 0 ; 
	var currentAnswer ; 
	var timeRemaining = 60; //a minute 
	var interValid; 
	var clockRunning = true;

	//Object Trivia Q&A list  
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

		correctAnswer: 0, 
		imageLink: "assets/images/loading.gif"
      },
		];


	//     FUNCTIONS
	//------------------------------------------

	//Starts the clock 
	function countDown(){

		if (clockRunning) {
			
			timeRemaining--; //Decrement the value 

			//Display time is this format 00:00 
			var convertedTime = timeConverter(timeRemaining); 
			$("#timer").html("<h2> Time Remaining " + convertedTime + "</h2> <br/>");
			// console.log("timeRemaining: "+ timeRemaining);

			// interValid = setInterval(countDown,1000);//run after every second 

			if( timeRemaining === 0 ){
				//stopt the clock 
				stopCountDown(); 
				// Timer is replaces with text
				$("#timer").html("<h4>Times Up ! ALL Done!!</h4>");
				$("btn-reset").attr("style", "display:block;");

				// Scoreboard  data is displayed onces time is up 
				$("#questionBlock").html("<h4>Correct Answers: " + correctCount + "</h4>");
				$("#answerList").html("<h4>Wrong Answers: " + incorrectCount + "</h4>");
				$("#answerList").append("<h4>UnAnswered: " + unasweredCount+ "</h4>");
				
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

	function renderQuestionAns(){
		
		//Continue the timer clock 
		interValid = setInterval(countDown,1000);//run after every second 

		// console.log('renderQuestionAns' + triviaQuestions.length);
		
		$('.thisChoice').empty();  //clear old Answe list 

		$("#questionBlock").html( "<center><p id='questiontext' class='text-center text-danger'> "+ triviaQuestions[currentQuestion].question + " <br/></p></center>"); 
		// console.log(triviaQuestions[currentQuestion].choices);

		for(var i = 0; i < 4; i++)
		{
			var answerList = $("<div class='text-center text-danger'>");
			answerList.text(triviaQuestions[currentQuestion].choices[i]);
			answerList.attr({'data-index': i });
			answerList.addClass('thisChoice');
			$('#answerList').append(answerList);
		}
		// console.log("Correct ans is:" + triviaQuestions[currentQuestion].correctAnswer);
		currentAnswer = triviaQuestions[currentQuestion].correctAnswer;

		nextQuestion();

		//Onclick of the ANswer Buttons 
		$(".thisChoice").click(function () {

			var id = $(this).attr('data-index');
			console.log("Button iD:" + id); 

			if (id === currentAnswer ){
					// answered = true; // stops the timer
					
					correctAnswers();
			} else {
					// answered = true; //stops the timer
					
					incorrectAnswers(id);
			}
	});

		//if player doesn't click any button 
		console.log($(".thisChoice")); 
		timeOuts(); 

	}

	function newQuestion(){
		if(currentQuestion == (triviaQuestions.length-1)){
			// setTimeout(scoreboard, 5000)
		} else{
			currentQuestion++; 
			setInterval(renderQuestionAns, 5000); // render next Question in 5 secs 
		}
	}
	
	function correctAnswers() {
		correctCount++;
		$('#questionBlock').html("Wohoo! Awesome you knew it! <br/>");
		$('#questionBlock').append("THE ANSWER IS: " + triviaQuestions[currentQuestion].choices[currentAnswer]);
		$('#answerList').html("<img src='"+triviaQuestions[currentQuestion].imageLink + "'/>");
		// resetRound();
	}

	function incorrectAnswers(answerID) {
		incorrectCount++;
		$('#questionBlock').html("OH NO! THAT's not it <br />");
		$('#questionBlock').append("YOU CHOSE: " + triviaQuestions[currentQuestion].choices[answerID] + ".....HOWEVER THE ANSWER IS: " + triviaQuestions[currentQuestion].choices[currentAnswer]);
		$('#answerList').html("<img src='"+triviaQuestions[currentQuestion].imageLink + "'/>");
		// resetRound();
	}


	function timeOuts() {
		unasweredCount++;
		$('#questionBlock').text("YOU FAILED TO CHOOSE AN ANSWER");
		// resetRound();
}



	// Main PROCESS -  functions
	//--------------------------------------

	console.log( "ready!" );

	//On click of start button the game starts 
	$('#btn-start').click(function () {
		console.log("Start Button clicked");
		$('#btn-start').attr("style", "display:none;");
		$('#btn-reset').attr("style", "display:none;");
		//Start Game 
		//Calling the Timer function 
		countDown(); 

		renderQuestionAns();

	});

});	