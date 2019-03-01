
$(document).ready(function () {

	//     VARIABLES
	//------------------------------------------
	//Count Variables 
	var correctCount = 0;
	var incorrectCount = 0;
	var unasweredCount = 0;
	var currentQuestion = 0;
	var currentAnswer;
	var timeRemaining = 10; //a minute 
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
		},{
			question: "What's the name of Quick Silver's alter ego?",
			choices: ["Pietro Don Maximoff", "Pietro Django Maximoff","Pietro Django", "Pietro Lang"],
			correctAnswer : 1, 
			imageLink: "assets/images/quick-silver-alterego.jpeg"
		},
		{
			question: "In 'Iron Man', what superhero identity was assumed by James Rhodes, Tony Stark's personal pilot and confidant?",
			choices: ["War Machine", "Captain America","Black Bolt", "Ant-Man"],
			correctAnswer : 0, 
			imageLink: "assets/images/warmachine.gif"
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
			$("#timer").html("<h2> Time Remaining " + convertedTime + "</h2>");

			// console.log("Time is inside countDown "+ timeRemaining);
			// console.log("countDown Length: "+ triviaQuestions.length); 
			// console.log("countDown currentQuestion: "+ currentQuestion);
			// console.log("timeRemaining" + timeRemaining);
			if (timeRemaining === 0) {
			
				// Player doesnt answer and time runs out 
				if(( !answeredBtnClicked) ){
					console.log("timeRemaining 0 unanswered value", unasweredCount);
					timeOuts(); 

					if( currentQuestion === triviaQuestions.length -1  ){
						setTimeout(quizResults(),5000); //Display scoreboard when reaches the last question afer few secs 
					}
				}
				// else {
					//Move to next Question 
					nextQuestion(); 
				// }
			}
			else {
				//IN CASE LAST QUESTION DISPLAY SCORE BOARD 
				if( (currentQuestion === triviaQuestions.length -1  ) && (timeRemaining !== 0) ){
					setTimeout(quizResults(), 3000);
				}
				
			}
		}
	}

	function nextQuestion(){
		//Reset the clock running variable to true so the timer can show the time again 
		clockRunning = true; 

		currentQuestion++;
		//Calling the function once in set interval 
		showQA = setTimeout(renderQuestionAns, 3000);
	}

	//Resets the clock to stop 
	function stopCountDown() {
		// console.log("stopCountDown");
		timeRemaining = 10; 
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

	//Display Question & Answer choice on the screen 
	function renderQuestionAns() { 

		//Continue the timer clock 
		interValid = setInterval(countDown, 1000);//run after every second 
		clearInterval(showQA); 
		//Reset the button click event variable to false 
		answeredBtnClicked = false; 
		$('#answerList').empty(); 

		//Display Question 
		$("#questionBlock").text(triviaQuestions[currentQuestion].question);
		$("#questionBlock").append("<br /> " );
		// console.log("renderQuestionAns#: " + currentQuestion);

		//Dynamically creating buttons 
		dynamicAnswerBtn(); 

		// console.log("timeRemaining: "+ timeRemaining + " answeredBtnClicked:"+ answeredBtnClicked);	
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

		//Add event listiner for the class '.thisChoice' 
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

	//Counts the correct answers and display the results for the answer selected 
	function correctAnswers() {

		// console.log("Correct ans fun"+ timeRemaining);
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

	//Counts the in-correct answers and display the results for the answer selected 
 	function incorrectAnswers(answerID) {
		// console.log("InCorrect ans fun"+ timeRemaining);
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
	
	//COunts unanswered questions by the player 
	function timeOuts() {
		
		// clearInterval(showQA);
		stopCountDown(); 
        unasweredCount++;
		console.log("Unanswered Count:"+unasweredCount);
		// answeredBtnClicked = true;
		$("#timer").html("<h2> Time Remaining " + timeRemaining + "</h2>");
        $('#questionBlock').text("YOU FAILED TO CHOOSE AN ANSWER \n");
        $('#questionBlock').append("\n The answer is " +triviaQuestions[currentQuestion].choices[currentAnswer] );
        $('#answerList').html("<center><img class='img-thumbnail' src='"+triviaQuestions[currentQuestion].imageLink + "'/></center>");
	}
	
	function quizResults() {
		stopCountDown();
        // Timer is replaces with text
        $("#timer").html("<h4>Times Up ! ALL Done!!</h4>");
        var button = $("#btn-reset") ; 
		button.attr("style", "display:block;"); //Show play again button 

        $("#questionBlock").html("<h4 class='text-sucess'>Correct Answers: " + correctCount + "</h4>");
        $("#answerList").html("<h4 class='text-danger'>Wrong Answers: " + incorrectCount + "</h4>");
        $("#answerList").append("<h4 class='text-warning'>UnAnswered: " + unasweredCount + "</h4>");
	 }

	function gameStart() {
		
		//Calling the Timer function 
		countDown();

		renderQuestionAns();
	}

	//Resets all values used 
	function resetGame() {

		 $("#timer").empty();
		$("#questionBlock").empty();
		$("#answerList").empty();
		currentQuestion = 0; 
		timeRemaining = 10; 
		correctCount = 0;
		incorrectCount = 0;
		unasweredCount = 0;
		answeredBtnClicked = false; 
		clockRunning = true; 

	}
	// Main PROCESS -  functions
	//--------------------------------------

	console.log("ready!");
	$('#btn-start').show(); 
	$('#btn-reset').hide(); 

	//On click of start button the game starts 
	$('#btn-start').click(function () {
		console.log("Start Button clicked");
		$('#btn-start').hide();
		// $('#btn-reset').show(); 
		//Start Game 
		gameStart();

	});

	//Reset Button 
	//On click of start button the game starts 
	$('#btn-reset').click(function () {
		console.log("Reset Button clicked");
		$('#btn-start').hide();
		$('#btn-reset').hide(); 
		//reset the entire container  section for a new game 
		resetGame(); 
		//Start a fresh  Game 
		gameStart();

	});


});	