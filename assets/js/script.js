// Need script that adds list items to unordered list and implement buttons with it
// Assign each question a unique id and each answer an id ranging from 1 to 4
// From there make it so detect button click and checks id with right answer in database
// If wrong subtract time if right do nothing
//Create timer that changes questions in intervals of 10 seconds
// Create local storage for high scores make high scores able to be called back
var quizBox = document.querySelector("#quiz-box");
var quizQuestionTitle = document.querySelector("quiz-question");
var quizAnswers = document.querySelector("#quiz-answers");
var timerEl = document.getElementById('countdown');
var mainEl = document.getElementById('main');
var startBtn = document.getElementById('start');
var questionNumber = 0;
var timeLeft = 100;


var quizQuestion = [
    {
        question: "test",
        answer: "test",
    },
    {
        question: "test2",
        answer: "test2",
    }
];


var timeInterval = setInterval(function() {
    if (timeLeft > 1) {
        timeLeft--;
    } else if (timeLeft === 1) {
        timeLeft--;
    } else {
      clearInterval(timeInterval);
    }
    if (timeLeft % 10 === 0) {
        console.log(timeLeft + " remaining");
        createQuestion();
    }
  }, 1000);

var createQuestion = function() {
    var currentQuestion = quizQuestion[questionNumber];
    var usersAnswer = confirm(currentQuestion.question);
    questionNumber++; 
}


var questionWriter = function() {

}
