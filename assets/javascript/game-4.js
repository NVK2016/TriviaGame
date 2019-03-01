
$(document).ready(function () {

	//     VARAIBLES
	//------------------------------------------
	//Count Variables 
	var correctCount = 0;
	var incorrectCount = 0;
	var unasweredCount = 0;
	var currentQuestion = 0;
	var currentAnswer;
	var timeRemaining = 10; //a minute 
	var interValid;
	var clockRunning = true;
	var answeredBtnClicked = false;

	//Object Trivia Q&A list  
	var triviaQuestions = [
		{

			question: "Pupusas, handmade thick stuffed corn tortillas, are a traditional dish from what country?",
			choices: ["Ethiopia", "El Salvadore", "Peru", "Guatamala"],
			correctAnswer: 1,
			imageLink: "assets/images/pupusas.jpg"
		},
		{
			question: "Who Loves Orange Soda?",
			choices: ["Kel Loves Orange Soda", "Arnold Loves Orange Soda", "Kora Loves Orange Soda", "Patrick Loves Orange Soda"],
			correctAnswer: 0,
			imageLink: "assets/images/loading.gif"
		},
	];

	//     FUNCTIONS
	//------------------------------------------

	//Starts the clock 
	function countDown() {

		if (clockRunning) {

			timeRemaining--; //Decrement the value 

			//Display time is this format 00:00 
			var convertedTime = timeConverter(timeRemaining);
			$("#timer").html("<h2> Time Remaining " + convertedTime + "</h2> <br/>");

			if ((timeRemaining === 0) ){
				//stopt the clock 
				stopCountDown();

				// Scoreboard  data is displayed onces time is up 
				// quizResults();

			}
		}

	}

	//Resets the clock to stop 

	function stopCountDown() {
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

	function renderQuestionAns() {

		//Continue the timer clock 
		interValid = setInterval(countDown, 1000);//run after every second 

		$('.thisChoice').empty();  //clear old Answer list 
		$('#questionBlock').empty();  //clear old Question  

		$("#questionBlock").html("<center><p id='questiontext' class='text-center text-danger'> " + triviaQuestions[currentQuestion].question + " <br/></p></center>");

		//Loops through all the answer options displays it as a button 
		for (var i = 0; i < 4; i++) {
			var answerList = $("<div class='text-center'>");

			answerList.text(triviaQuestions[currentQuestion].choices[i]);
			answerList.attr({ 'data-index': i });
			answerList.addClass('thisChoice');
			$('#answerList').append(answerList);
		}
		currentAnswer = triviaQuestions[currentQuestion].correctAnswer;

		nextQuestion();

		//Onclick of the ANswer Buttons 
		$(".thisChoice").click(function () {
			answeredBtnClicked = true;
			var id = $(this).attr('data-index');

			if (id === currentAnswer) {
				//In case if the answer is correct 
				// correctAnswers();
			} else {
				//In case of incorrect ANs
				// incorrectAnswers(id);
			}
		});

		//if player doesn't click any button 
		if (answeredBtnClicked) {
			console.log($(".thisChoice"));
			timeOuts();
		}
	}

	function nextQuestion() {
		if (currentQuestion == (triviaQuestions.length - 1)) {
			// setTimeout(scoreboard, 5000)
		} else {
			currentQuestion++;
			setInterval(renderQuestionAns, 5000); // render next Question in 5 secs 
		}
		return currentQuestion; //returns the updated Question no.
	}

	function correctAnswers() {
		correctCount++;
		$('#questionBlock').html("Wohoo! Awesome you knew it! <br/>");
		$('#questionBlock').append("THE ANSWER IS: " + triviaQuestions[currentQuestion].choices[currentAnswer]);
		$('#answerList').html("<img src='" + triviaQuestions[currentQuestion].imageLink + "'/>");
	}

	function incorrectAnswers(answerID) {
		incorrectCount++;
		$('#questionBlock').html("OH NO! THAT's not it <br />");
		$('#questionBlock').append("YOU CHOSE: " + triviaQuestions[currentQuestion].choices[answerID] + ".....HOWEVER THE ANSWER IS: " + triviaQuestions[currentQuestion].choices[currentAnswer]);
		$('#answerList').html("<img src='" + triviaQuestions[currentQuestion].imageLink + "'/>");
	}


	function timeOuts() {
		unasweredCount++;
		$('#questionBlock').text("YOU FAILED TO CHOOSE AN ANSWER");
		// $('#answerList').html("<img src='"+triviaQuestions[currentQuestion].imageLink + "'/>");
		// stopCountDown(); 
	}

	function quizResults() {

		// Timer is replaces with text
		$("#timer").html("<h4>Times Up ! ALL Done!!</h4>");
		$("btn-reset").attr("style", "display:block;");

		$("#questionBlock").html("<h4>Correct Answers: " + correctCount + "</h4>");
		$("#answerList").html("<h4>Wrong Answers: " + incorrectCount + "</h4>");
		$("#answerList").append("<h4>UnAnswered: " + unasweredCount + "</h4>");
	}



	// Main PROCESS -  functions
	//--------------------------------------

	console.log("ready!");

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