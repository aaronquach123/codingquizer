// Need script that adds list items to unordered list and implement buttons with it
// Assign each question a unique id and each answer an id ranging from 1 to 4
// From there make it so detect button click and checks id with right answer in database
// If wrong subtract time if right do nothing
//Create timer that changes questions in intervals of 10 seconds
// Create local storage for high scores make high scores able to be called back
var quizBoxEl = document.querySelector("#quiz-box");
var timerEl = document.querySelector("#timer-text");
var mainEl = document.querySelector("#main")
var questionResultEl = document.querySelector("#question-result");
var highscoreBoxEl = document.querySelector("#highscore-box");
var questionNumber = 0;
var timeLeft = 100;
var quizScore = 0;
var quizQuestion = [
    {
        question: "When selecting a class in css what would you identify it as?",
        a: ".classname",
        b: "(classname)",
        c: "var className",
        d: "let className",
        answer: "a",
    },
    {
        question: "When adding a js script into your html file how would you correctly add it in?",
        a: "<script src='./.js'/>",
        b: "<script src='./.js'></script>",
        c: ".script src='./.js'",
        d: "function() {}",
        answer: "b",
    },
    {
        question: "Which line will write the message 'Hello World' in an alert box?",
        a: "alert('Hello World')",
        b: "<h1>Hello World </h1>",
        c: "msgAlert('Hello World')",
        d: ".msgAlert {('Hello World')}",
        answer: "a",
    },
    {
        question: "What is the correct syntax for an 'if' statement?",
        a: "if() {}",
        b: ".if() <>",
        c: "if() ()",
        d: "<if></if>",
        answer: "a",
    },
    {
        question: "What is display:flex?",
        a: "Displays a new div with new classes.",
        b: "Javascript function that displays variables on the HTML page.",
        c: "Web api that allows for HTML to be interactive with the user.",
        d: "Css rule that allows for containers to wrap with each other and not take up the whole space.",
        answer: "d",
    },
    {
        question: "What does DOM stand for?",
        a: "Data Object Manager.",
        b: "Direct Object Mechanism.",
        c: "Document Object Model.",
        d: "Data Operation Model.",
        answer: "c",
    },
    {
        question: "What does HTML stand for?",
        a: "Hyperlink Text Markup Language",
        b: "Hyper Text Markup Language.",
        c: "Helper Text Mechanic Language.",
        d: "Home Tool Markup Language.",
        answer: "b",
    },
    {
        question: "What is the biggest heading size?",
        a: "<h1>",
        b: "<h2>",
        c: "font-size: large",
        d: "<h6>",
        answer: "a",
    },
    {
        question: "What is :root in regards to css?",
        a: "Selects the root element of the document.",
        b: "Selects all of the document.",
        c: "Class selecting tool.",
        d: "Selects all ids in the document.",
        answer: "a",
    },
    {
        question: "Which of the following would iterate through a loop until the variable matches the integer?",
        a: "if (i === cars.length)",
        b: "else if (cars === i)",
        c: "for (i = 0; i < cars.length; i++)",
        d: "for (i= 0; i > cars.length; i++)",
        answer: "c",
    },
];
var lastQuestion = quizQuestion[quizQuestion.length];
var questionBox = document.getElementById("quiz-holder");
var previousHighscores = JSON.parse(localStorage.getItem("highscores"));

//Function for start button
var startBtnEl = document.getElementById("start-button").onclick = function() {
    quizScore = 0;
    questionNumber = 0;
    createQuestion();
    //Interval function that counts in seconds
    var timeInterval = setInterval(function() {
        if (timeLeft > 1) {
            timeLeft--;
            timerEl.innerHTML = "Time Left " + timeLeft; 
        } else if (timeLeft === 1) {
            timeLeft--;
            timerEl.innerHTML = "Time Left " + timeLeft; 
        } else {
          clearInterval(timeInterval);
          highscoreFormCreator();   

        }
        if (timeLeft % 10 === 0) {
            questionBoxEl.remove();
            questionNumber++; 
            createQuestion();
        }
      }, 1000);
      document.getElementById("start-button").remove();
    
}
//Creates a form after game that allows you to input your name 
var highscoreFormCreator = function() {
    var highscoreBoxTextEl = document.createElement("div");
    highscoreBoxTextEl.className = "highscore-name-holder";
    highscoreBoxTextEl.id = "highscore-name-holder";
    highscoreBoxTextEl.innerHTML = "<h2> Congrats you've finished! Enter your initials here: </h2>"

    var highscoreBoxFormEl = document.createElement("form");
    highscoreBoxFormEl.id = "form";
    highscoreBoxFormEl.className = "highscore-input-form";

    var highscoreBoxInputEl = document.createElement("input");
    highscoreBoxInputEl.className = "input"
    highscoreBoxInputEl.setAttribute("type", "text"); 
    highscoreBoxInputEl.setAttribute("name", "Initials"); 
    highscoreBoxInputEl.setAttribute("placeholder", "Your Initials here"); 
    
    var highScoreBoxSubmitEl = document.createElement("input"); 
    highScoreBoxSubmitEl.className = "input-button"
    highScoreBoxSubmitEl.setAttribute("type", "submit"); 
    highScoreBoxSubmitEl.setAttribute("value", "Submit")

    highscoreBoxFormEl.appendChild(highscoreBoxInputEl);
    highscoreBoxFormEl.appendChild(highScoreBoxSubmitEl);
    highscoreBoxTextEl.appendChild(highscoreBoxFormEl);

    highscoreBoxEl.appendChild(highscoreBoxTextEl);
}

//Handles input of name to be added to localstorage of high scores and also sends back the stored list of high scores
var highscoreFormHandler = function(event) {
    event.preventDefault();
    var highScoreNameInput = document.querySelector("input[name='Initials']").value;
    if (!highScoreNameInput) {
        alert("Please put your intials in!");
        return false;
    }
    //Puts quizScore and Name into an object to be stored in localstorage
    var highscoreObj = {
        name: highScoreNameInput,
        score: quizScore
    };
    //Removes form after input is recorded
    document.getElementById("highscore-name-holder").remove();

    var highscoresArry = [];
    highscoresArry.push(highscoreObj);
    
   if (previousHighscores === null) {
    localStorage.setItem("highscores", JSON.stringify(highscoresArry));
    } else {
       previousHighscores.push(highscoreObj);
       localStorage.setItem("highscores", JSON.stringify(previousHighscores));
    };

    var highscoresBoxEl = document.createElement("div");
    highscoresBoxEl.className = "highscores-holder";
    highscoresBoxEl.innerHTML = "<h2> High Scores </h2>";

    highscoresListEl = document.createElement("ul");
    highscoresListEl.className = "highscores-list";
    highscoresBoxEl.appendChild(highscoresListEl);

    for (i=0; i < previousHighscores.length; i++) {
        var highscoresItems = document.createElement("li");
        highscoresItems.innerHTML = "<h3> Name: " + previousHighscores[i].name + previousHighscores[i].score + "</h3>";
        highscoresListEl.appendChild(highscoresItems);
    }

    var playAgainEl = document.createElement("button");
    playAgainEl.className = "button";
    playAgainEl.innerHTML = "<h4> Press to Play Again! </h4>";
    playAgainEl.id = "start-button";
    
    highscoreBoxEl.appendChild(highscoresBoxEl);
    highscoreBoxEl.appendChild(playAgainEl);

    playAgainEl.onclick = function () {
        highscoreBoxEl.innerHTML = "";
        timeLeft = 100;
        startBtnEl();
    }
}

//Handles question creation and button creation
var createQuestion = function() {
    //if statement to check if there are anymore questions left
    if (quizQuestion[questionNumber] === lastQuestion) {
        timeLeft = 0;
        timerEl.innerHTML = "Time Left " + timeLeft; 
    } else {
        var quizQuestionHolderEl = document.createElement("li");
        quizQuestionHolderEl.className = "quiz-holder";
        quizQuestionHolderEl.id = "quiz-holder";
        quizQuestionHolderEl.setAttribute("quiz-question-holder", questionNumber)
    
        var quizQuestionContentEl = document.createElement("div");
        quizQuestionContentEl.className = "quiz-holder-div";
        quizQuestionContentEl.innerHTML = "<h3>" + quizQuestion[questionNumber].question; + "</h3>"
    
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
    }
        
}



//Checks answer of button clicked if correct
var answerChecker = function(event) {
    var correctAnswerEl = document.createElement("div");
    correctAnswerEl.innerHTML = "<h3> Correct! </h3>";
    var incorrectAnswerEl = document.createElement("div");
    incorrectAnswerEl.innerHTML = "<h3> Incorrect! </h3>";
    var questionBoxEl = document.getElementById("quiz-holder");
    targetEl = event.target;
    if (targetEl.getAttribute("answer") === quizQuestion[questionNumber].answer) {
        quizScore ++; 
        questionResultEl.innerHTML = "<h3> Correct! </h3>";
        questionBoxEl.remove();
        questionNumber++; 
        createQuestion();
    } else if (targetEl.getAttribute("answer") != quizQuestion[questionNumber].answer) {
        quizScore --;
        timeLeft -= 10;
        questionResultEl.innerHTML = "<h3> Incorrect! </h3>";
        questionBoxEl.remove();
        questionNumber++; 
        createQuestion();
    }
}

quizBoxEl.addEventListener("click", answerChecker)
highscoreBoxEl.addEventListener("submit", highscoreFormHandler);