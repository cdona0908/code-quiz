//Global Variables and Query Selectors

// time and score
var timeEl = document.querySelector("#timeSpan");
var timeCount = 75;
var scoreEl = document.querySelector("#score");

// sections
// section intro
var introEl = document.querySelector("#intro");

// section questions
//question section
var questionsEl = document.querySelector("#quiz-questions");
//where question goes
var questionItem = document.querySelector("#question");
// how many questions they have answered
var questionCount = 0;
// div display if question is right or wrong
var rgMessage = document.querySelector("#message");

// section final
var endOfGame = document.querySelector("#AllDone");
// user initials
var initialsInput = document.querySelector("#initials");

// section highscores
var highscoresEl = document.querySelector("#highscores");
// ordered list
var scoreListEl = document.querySelector("#score-list");
// array of scores
var scoreList = [];

// buttons
// start
var startBtn = document.querySelector("#btn-start");
// answer button class
var ansBtn = document.querySelectorAll("button.ansBtn")
// answer1
var ans1Btn = document.querySelector("#answer1");
// answer2
var ans2Btn = document.querySelector("#answer2");
// answer3
var ans3Btn = document.querySelector("#answer3");
// answer4
var ans4Btn = document.querySelector("#answer4");
// submit-score
var submitScrBtn = document.querySelector("#submit");
// goback
var goBackBtn = document.querySelector("#btn-back");
// clearscores
var clearScrBtn = document.querySelector("#btn-clear");
// view-scores
var viewScrBtn = document.querySelector("#view-scores");

// Object for question, answer, true/false
var questions = [ // array of objects
    {
        // question 0
        question: "Commonly used data types do NOT include:",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer: "2"
    },
    {
        // question 1
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
        correctAnswer: "2"
    },
    {
        // question 2
        question: "Arrays in Javascript can be used to store ____.",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: "3"
    },
    {
        // question 3
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["1. commmas", "2. curly brackets", "3. quotes", "4. parentheses"],
        correctAnswer: "2"
    },
    {
        // question 4
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. Javascript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correctAnswer: "3"
    }
];
//------------Functions----------------//

//Timer

function timeInit(){
    var timer = setInterval(function(){
        timeCount --;
        timeEl.textContent = timeCount;
        if (timeCount === 0 || questionCount===questions.length){
            clearInterval(timer);
            questionsEl.style.display = "none";
            endOfGame.style.display ="block";
            scoreEl.textContent = timeCount;
        }   
    },1000); 
}

function quizInit(){
    introEl.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;
    timeInit();
    showQuestion(questionCount);
}


//--------------- Event Listeners---------------//