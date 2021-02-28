// Need script that adds list items to unordered list and implement buttons with it
// Assign each question a unique id and each answer an id ranging from 1 to 4
// From there make it so detect button click and checks id with right answer in database
// If wrong subtract time if right do nothing
//Create timer that changes questions in intervals of 10 seconds
// Create local storage for high scores make high scores able to be called back
var quizBoxEl = document.querySelector("#quiz-box");
var timerEl = document.querySelector("#timer-text");
var mainEl = document.querySelector("#main")
var highscoreBoxEl = document.querySelector("#highscore-box")
var questionNumber = 0;
var timeLeft = 100;
var quizScore = 0;
var highscore = localStorage.getItem("highscore");
var quizQuestion = [
    {
        question: "test1",
        a: "test2",
        b: "test3",
        c: "test4",
        d: "test5",
        answer: "b",
    },
    {
        question: "test2",
        a: "test2",
        b: "test2",
        c: "test2",
        d: "test2",
        answer: "c",
    }
];
var lastQuestion = quizQuestion[quizQuestion.length];
var questionBox = document.getElementById("quiz-holder");

var highscoreRecorder = function() {
    if (highscore !== null) {
        if (quizScore > highscore) {
            localStorage.setItem("highscore", quizScore)
        }
    } else {
        localStorage.setItem("highscore", quizScore)
    }
    var highscoreBoxTextEl = document.createElement("div");
    highscoreBoxTextEl.innerHTML = "<h2>" + quizScore + "</h2>";
    highscoreBoxEl.appendChild(highscoreBoxTextEl);
}

var startBtnEl = document.getElementById("start-button").onclick = function() {
    quizScore = 0;
    createQuestion();
    var timeInterval = setInterval(function() {
        if (timeLeft > 1) {
            timeLeft--;
            timerEl.innerHTML = timeLeft
        } else if (timeLeft === 1) {
            timeLeft--;
            timerEl.innerHTML = timeLeft
        } else {
          clearInterval(timeInterval);
          highscoreRecorder();   

        }
        if (timeLeft % 10 === 0) {
            questionBox.remove();
            questionNumber++; 
            console.log(questionBox)
            createQuestion();
        }
      }, 1000);
      document.getElementById("start-button").remove();
    
}
var createQuestion = function() {
    if (quizQuestion[questionNumber] === lastQuestion) {
        timeLeft = 0;
        timerEl.innerHTML = timeLeft
    } else {
        var quizQuestionHolderEl = document.createElement("li");
        quizQuestionHolderEl.className = "quiz-holder";
        quizQuestionHolderEl.id = "quiz-holder";
        quizQuestionHolderEl.setAttribute("quiz-question-holder", questionNumber)
    
        var quizQuestionContentEl = document.createElement("div");
        quizQuestionContentEl.className = "button";
        quizQuestionContentEl.innerHTML = "<h2>" + quizQuestion[questionNumber].question; + "</h2>"
    
        var quizChoice1 = document.createElement("button");
        quizChoice1.textContent = quizQuestion[questionNumber].a;
        quizChoice1.setAttribute("answer", "a");
        quizChoice1.className = "button";
        quizQuestionContentEl.appendChild(quizChoice1);
    
        var quizChoice2 = document.createElement("button");
        quizChoice2.textContent = quizQuestion[questionNumber].b;
        quizChoice2.setAttribute("answer", "b");
        quizChoice2.className = "button";
        quizQuestionContentEl.appendChild(quizChoice2);
        
        var quizChoice3 = document.createElement("button");
        quizChoice3.textContent = quizQuestion[questionNumber].c; 
        quizChoice3.setAttribute("answer", "c");
        quizChoice3.className = "button";
        quizQuestionContentEl.appendChild(quizChoice3);
        
        var quizChoice4 = document.createElement("button");
        quizChoice4.textContent = quizQuestion[questionNumber].d;
        quizChoice4.setAttribute("answer", "d");
        quizChoice4.className = "button";
        quizQuestionContentEl.appendChild(quizChoice4);
    
            
        quizQuestionHolderEl.appendChild(quizQuestionContentEl);
        quizBoxEl.appendChild(quizQuestionHolderEl);
        questionBox = document.getElementById("quiz-holder")
        console.log(questionNumber)
    }
        
}




var answerChecker = function(event) {
    
    var questionBox = document.getElementById("quiz-holder");
    targetEl = event.target;
    if (targetEl.getAttribute("answer") === quizQuestion[questionNumber].answer) {
        quizScore ++; 
        questionBox.remove();
        questionNumber++; 
        createQuestion();
    } else if (targetEl.getAttribute("answer") != quizQuestion[questionNumber].answer) {
        quizScore --;
        timeLeft -= 10;
        questionBox.remove();
        questionNumber++; 
        createQuestion();
    }
}

quizBoxEl.addEventListener("click", answerChecker)