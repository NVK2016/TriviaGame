
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

			question: "What is another name for Superman?",
			choices: ["The Red Redeemer", "The MAsked Avenger", "The Caped Crusader", "The Man of Steel"],
			correctAnswer: 3,
			imageLink: "assets/images/superman.gif"
		},
		{
			question: "What is Deadpool's real name?",
			choices: ["Mike Powers", "Richard Maxwell", "Wade Wilson", "Harry Dodson"],
			correctAnswer: 2,
			imageLink: "assets/images/deadpool.jpeg"
		},
		{
			question: "What is Superman's only weakness?",
			choices: ["Samsonite", "Cosmonite", "Kryptonite", "Plutonite"],
			correctAnswer : 2,
			imageLink: "assets/images/kryptonite-thanks1.jpg"
		},
		{
			question: "Who was the first villian in the Spiderman comics?",
			choices: ["Big Wheel", "Carnage", "Chameleon", "Doctor Octopus"],
			correctAnswer: 2, 
			imageLink: "assets/images/Chameleon_Marvel.jpg"
		},{
			question: "Who is the prime starring character in the Flash?",
			choices: ["Candis Patton", "Grant Gustin", "Rick Cosnet", "Carlos Valdes"],
			correctAnswer: 1,
			imageLink: "assets/images/flash.jpg"
		},{
			question: "Who among flash's sidekick also exhibits superhuman speed?",
			choices: ["Cisco", "Kid Flash", "Harrison Wells", "Caitlin Snow"],
			correctAnswer: 1,
			imageLink: "assets/images/kidflash.jpg"
		},{
			question: "Which year was Wonder Woman first appearance in Dc  all-star comics?",
			choices: ["1933","1934","1941","1958"],
			correctAnswer: 2,
			imageLink: "assets/images/wonderwoman.jpg"
		},{
			question: "What is the name of Wonder Woman mother?",
			choices: ["Queen Hippolyta","Queen Cleopatra", "Queen lina", "Queen Nicholina"],
			correctAnswer: 0,
			imageLink: "assets/images/wondermom.jpg"
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

			console.log("Time is inside countDown "+ timeRemaining);

			if (timeRemaining === 0) {
				
				// Player doesnt answer and time runs out 
				if(( !answeredBtnClicked) ){
					timeOuts(); 
				}
				
				if( currentQuestion !== triviaQuestions.length ){
					//Move to next Question 
					nextQuestion(); 
				}
				else {
					quizResults(); //Display scoreboard when reaches the last question 
				}
			}
			console.log("countDown Length: "+ triviaQuestions.length); 
				console.log("countDown currentQuestion: "+ currentQuestion); 
			
		}
	}

	function nextQuestion(){
		//Reset the clock running variable to true 
		clockRunning = true; 

		currentQuestion++;
		//Calling the function once in set interval 
		showQA = setTimeout(renderQuestionAns, 5000);
	}

	//Resets the clock to stop 
	function stopCountDown() {
		console.log("stopCountDown");
		timeRemaining = 15; 
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
		clearInterval(showQA); 
		//Reset the button click event variable to false 
		answeredBtnClicked = false; 
		$('#answerList').empty(); 

		//Display Question 
		$("#questionBlock").text(triviaQuestions[currentQuestion].question);
		console.log("renderQuestionAns#: " + currentQuestion);

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
        $('#questionBlock').html("Wohoo! Awesome you knew it! <br/>");
        $('#questionBlock').append("THE ANSWER IS: " + triviaQuestions[currentQuestion].choices[currentAnswer]);
        $('#answerList').html("<center><img class='img-thumbnail' src='" + triviaQuestions[currentQuestion].imageLink +"'/></center>");
			
		//Move to next Question 
		nextQuestion();
	}

 	function incorrectAnswers(answerID) {
		console.log("InCorrect ans fun"+ timeRemaining);
		//stop the clock 
		stopCountDown(); 
		//Count the in-correct answer 
	    incorrectCount++;
		//Display MEasges 
        $('#questionBlock').html("OH NO! THAT's not it <br />");
        $('#questionBlock').append("YOU CHOSE: " + triviaQuestions[currentQuestion].choices[answerID] + ".....HOWEVER THE ANSWER IS: " + triviaQuestions[currentQuestion].choices[currentAnswer]);
        $('#answerList').html("<center><img class='img-thumbnail' src='" + triviaQuestions[currentQuestion].imageLink + "'/></center>");
			
		//Move to next Question 
		nextQuestion();	
}
	
	
	function timeOuts() {
		
		// clearInterval(showQA);
		stopCountDown(); 
        unasweredCount++;
		// answeredBtnClicked = true;
		$("#timer").html("<h2> Time Remaining " + timeRemaining + "</h2> <br/>");
        $('#questionBlock').text("YOU FAILED TO CHOOSE AN ANSWER");
        $('#questionBlock').append("The answer is " +triviaQuestions[currentQuestion].choices[currentAnswer] );
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