// Need script that adds list items to unordered list and implement buttons with it
// Assign each question a unique id and each answer an id ranging from 1 to 4
// From there make it so detect button click and checks id with right answer in database
// If wrong subtract time if right do nothing
//Create timer that changes questions in intervals of 10 seconds
// Create local storage for high scores make high scores able to be called back
var quizBox = document.querySelector("#quiz-box");
var timerEl = document.getElementById('countdown');
var mainEl = document.getElementById('main');
var startBtn = document.getElementById('start');
var questionNumber = 0;
var timeLeft = 100;

var quizQuestion = [
    {
        question: "test1",
        choice1: "test2",
        choice2: "test3",
        choice3: "test4",
        choice4: "test5",
        
    },
    {
        question: "test2",
        choice1: "test2",
        choice2: "test2",
        choice3: "test2",
        choice4: "test2",
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
    //var usersAnswer = confirm(currentQuestion.question);
    questionNumber++; 
}


var questionWriter = function() {


    var quizQuestionHolder = document.createElement("li");
    quizQuestionHolder.className = "quiz-holder";

    var quizQuestionTitle = document.createElement("div");
    quizQuestionTitle.className = "test1"
    quizQuestionTitle.innerHTML = "<h2>" + quizQuestion[questionNumber].question;
    
    quizQuestionHolder.appendChild(quizQuestionTitle);

    var quizChoiceHolder = document.createElement("div");
    quizChoiceHolder.className = "quiz-holder";

    var quizChoice1 = document.createElement("button");
    quizChoice1.textContent = quizQuestion[questionNumber].choice1;
    quizChoiceHolder.appendChild(quizChoice1);

    var quizChoice2 = document.createElement("button");
    quizChoice1.textContent = quizQuestion[questionNumber].choice2;
    quizChoiceHolder.appendChild(quizChoice2);
    
    var quizChoice3 = document.createElement("button");
    quizChoice1.textContent = quizQuestion[questionNumber].choice3; 
    quizChoiceHolder.appendChild(quizChoice3);
    
    var quizChoice4 = document.createElement("button");
    quizChoice1.textContent = quizQuestion[questionNumber].choice4;
    quizChoiceHolder.appendChild(quizChoice4);

    quizBox.appendChild(quizQuestionHolder)
    quizBox.appendChild(quizChoiceHolder);

};

questionWriter();