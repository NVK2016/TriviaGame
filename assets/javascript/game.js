
$(document).ready(function () {

	//     VARIABLES
	//------------------------------------------
	//Count Variables 
	var correctCount = 0;
	var incorrectCount = 0;
	var unasweredCount = 0;
	var currentQuestion = 0;
	var currentAnswer;
	var timeRemaining = 15; //a minute 
	var interValid, showQA;
	var clockRunning = true;
	var answeredBtnClicked = false;

	//Object Trivia Q&A list  
	var triviaQuestions = [
		{

			question: "Pupusas, handmade thick stuffed corn tortillas, are a traditional dish from what country?",
			choices: ["Ethiopia", "El Salvadore", "Peru", "Guatamala"],
			correctAnswer: 1,
			imageLink: "assets/images/logo_JavaScript.png"
		},
		{
			question: "Who Loves Orange Soda?",
			choices: ["Kel Loves Orange Soda", "Arnold Loves Orange Soda", "Kora Loves Orange Soda", "Patrick Loves Orange Soda"],
			correctAnswer: 0,
			imageLink: "assets/images/loading.gif"
		},
		{
			question: "In the cartoon series, the Flintstones, what was the Great Gazoo?",
			choices: ["A Dragon", "A club", "An alien", "a giraffee"],
			correctAnswer : 2,
			imageLink: "assets/iamges/flintstones.png"
		}
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

			if (timeRemaining === 0) {
				//stop the clock 
				stopCountDown();
				// timeRemaining = 15;
				// Player doesnt answer and time runs out 
				if(( !answeredBtnClicked) ){
					timeOuts(); 
				}
				
				//Move to next Question 
				nextQuestion(); 
			} 
			
		}
	}

	function nextQuestion(){
	
		currentQuestion++;
		showQA = setInterval(renderQuestionAns, 1000);
	}

	//Resets the clock to stop 
	function stopCountDown() {
		timeRemaining = 0; 
		clearInterval(interValid);
		clockRunning = false;  //Reset  

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
		// clearInterval(showQA); 

		//Display Question 
		$("#questionBlock").text(triviaQuestions[currentQuestion].question);
		console.log("Question#: " + currentQuestion);
		//Dynamically creating buttons 
		dynamicAnswerBtn(); 
		console.log("timeRemaining: "+ timeRemaining + " answeredBtnClicked:"+ answeredBtnClicked);
		
	}

	function dynamicAnswerBtn() {
		//Loops through all the answer options displays it as a button 
		for (var i = 0; i < 4; i++) {
			var answerList = $("<div class='text-center'>");

			answerList.text(triviaQuestions[currentQuestion].choices[i]);
			answerList.attr({ 'data-index': i });
			answerList.addClass('thisChoice');
			$('#answerList').append(answerList);
		}
		//RIGHT ANSWER FOR THE QUESTION 
		currentAnswer = triviaQuestions[currentQuestion].correctAnswer;
		// console.log(currentAnswer ); 

		//Add event listiner 
		$(".thisChoice").click(function () {

			answeredBtnClicked = true;
			var id = $(this).attr('data-index');
			// console.log(answeredBtnClicked + " ID: " + $(this).attr('data-index') + "Correct ans:" + currentAnswer);

			if ( id == currentAnswer) {
				//In case if the answer is correct 
				correctAnswers();
			} else {
				//In case of incorrect ANs
				incorrectAnswers(id);
			}
		});
	}

	function correctAnswers() {

		console.log("Correct ans fun"+ timeRemaining);
		
		//stop the clock 
		stopCountDown(); 
		//Count the correct answer 
        correctCount++;

		//Display message 
		$("#timer").html("<h2> Time Remaining: 00:00 </h2> <br/>");
        $('#questionBlock').html("Wohoo! Awesome you knew it! <br/>");
        $('#questionBlock').append("THE ANSWER IS: " + triviaQuestions[currentQuestion].choices[currentAnswer]);
        $('#answerList').html("<center><img class='img-thumbnail' src='" + triviaQuestions[currentQuestion].imageLink +"'/></center>");
   	 }

 	function incorrectAnswers(answerID) {
		console.log("InCorrect ans fun"+ timeRemaining);
		//stop the clock 
		stopCountDown(); 
		//Count the in-correct answer 
	    incorrectCount++;
		//Display MEasges 
		$("#timer").html("<h2> Time Remaining: 00:00 </h2> <br/>");
        $('#questionBlock').html("OH NO! THAT's not it <br />");
        $('#questionBlock').append("YOU CHOSE: " + triviaQuestions[currentQuestion].choices[answerID] + ".....HOWEVER THE ANSWER IS: " + triviaQuestions[currentQuestion].choices[currentAnswer]);
        $('#answerList').html("<center><img class='img-thumbnail' src='" + triviaQuestions[currentQuestion].imageLink + "'/></center>");
	}
	
	
	function timeOuts() {
		
		// clearInterval(showQA);
		stopCountDown(); 
        unasweredCount++;
		$("#timer").html("<h2> Time Remaining " + timeRemaining + "</h2> <br/>");
        $('#questionBlock').text("YOU FAILED TO CHOOSE AN ANSWER");
        $('#answerList').html("<center><img class='img-thumbnail' src='"+triviaQuestions[currentQuestion].imageLink + "'/></center>");
	}
	
	function quizResults() {

        // Timer is replaces with text
        $("#timer").html("<h4>Times Up ! ALL Done!!</h4>");
        $("btn-reset").attr("style", "display:block;");

        $("#questionBlock").html("<h4>Correct Answers: " + correctCount + "</h4>");
        $("#answerList").html("<h4>Wrong Answers: " + incorrectCount + "</h4>");
        $("#answerList").append("<h4>UnAnswered: " + unasweredCount + "</h4>");
	 }

	function gameStart() {
		//Calling the Timer function 
		countDown();

		renderQuestionAns();
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
		gameStart();

	});

});	