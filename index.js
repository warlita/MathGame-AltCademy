$(document).ready(function(){
  var currentQuestion;
  var interval;
  var timeLeft = 10;
  var score = 0;
  var finalGameScore = 0;
  var highScore = 0;


  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  }
  
  var questionGenerator = function () {
    var question = {};
    var num1 = randomNumberGenerator(10);
    var num2 = randomNumberGenerator(10);
    
    question.answer = num1 + num2; // create array object that stores equation answer
    question.equation = String(num1) + " + " + String(num2); // create array object that stores equation
    
    return question;
  }

  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);  
  }

  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $('#user-input').val(''); // clears input for user
      updateTimeLeft(+1);
      updateScore(+1);
    }
  };

  $('#user-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });

  var startGame = function () {
    if (!interval) {
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateScore(-score);
        updateHighScore(); 

      }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);
    }
  }

  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  }

  var updateScore = function (amount) {
    finalGameScore = score; // 
    score += amount;
    $('#score').text(score);
  };

  var updateHighScore = function () {
    if ( finalGameScore > highScore ) {
      highScore = finalGameScore;
      $('#highScore').text(highScore);
    } else {
      $('#highScore').text(highScore);
    }
  }

  renderNewQuestion();
});