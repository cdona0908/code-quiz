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
var endOfGame = document.querySelector("#allDone");
// user initials
var userInitials = document.querySelector("#initials");

// section highscores
var highScoresSection = document.querySelector("#highScores");
// ordered list
var scoreListEl = document.querySelector("#score-list");
// array of scores
var scoreList = [];

// buttons
// start
var startBtn = document.querySelector("#btn-start");
// answer button class
var ansBtn = document.querySelectorAll("button.answers")
// answer1
var ans1Btn = document.querySelector("#answer1");
// answer2
var ans2Btn = document.querySelector("#answer2");
// answer3
var ans3Btn = document.querySelector("#answer3");
// answer4
var ans4Btn = document.querySelector("#answer4");
// submit-score
var submitHighScore = document.querySelector("#submit");
// goback
var backBtn = document.querySelector("#btn-back");
// clearscores
var clearBtn = document.querySelector("#btn-clear");
// view-scores
var scoreBtn = document.querySelector("#view-scores");

// Object for question, answer, true/false
var questions = [ // array of objects
    {
        // question 0
        question: "Commonly used data types do NOT include:",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        solution: "2"
    },
    {
        // question 1
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
        solution: "2"
    },
    {
        // question 2
        question: "Arrays in Javascript can be used to store ____.",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        solution: "3"
    },
    {
        // question 3
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["1. commmas", "2. curly brackets", "3. quotes", "4. parentheses"],
        solution: "2"
    },
    {
        // question 4
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. Javascript", "2. terminal/bash", "3. for loops", "4. console.log"],
        solution: "3"
    }
];
//------------Functions----------------//

//Timer

function timeInit(){
    var timer = setInterval(function(){
        timeCount --;
        timeEl.textContent = timeCount;
        if (timeCount === 0 || questionCount === questions.length){
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

//function can be reduced with for loop but couldn't make it work on time
function showQuestion(questionNumber){
    if (questionNumber < questions.length){
        questionItem.textContent = questions[questionNumber].question;
        ans1Btn.textContent = questions[questionNumber].answers[0];
        ans2Btn.textContent = questions[questionNumber].answers[1];
        ans3Btn.textContent = questions[questionNumber].answers[2];
        ans4Btn.textContent = questions[questionNumber].answers[3];
    }
}
//Verify if answer right ot wrong and the go to next question
function verifyAnswer(event){
    event.preventDefault();
    //display right or wrong message
    rgMessage.style.display = "block";
    var p = document.createElement("p");
    rgMessage.appendChild(p);
    setTimeout(function(){
        p.style.display = "none";
    }, 1000);
    //verify if answer is correct
    if(questions[questionCount].solution === event.target.value){
        p.textContent = "Correct!";        
    } else if (questions[questionCount].solution !== event.target.value){
        p.textContent = "Wrong!";
        timeCount = timeCount - 10;
    }
    //increase question counter by 1 to go to the next question
    if (questionCount < questions.length){
        questionCount++;
    }
    showQuestion(questionCount);
}

function addHighScore(event){
    //event.preventDefault();
    endOfGame.style.display ="none";
    highScoresSection.style.display ="block";
    scoreList.push({
        initials: userInitials,
        score: timeCount
    });
    scoreListEl.innerHTML="";
    for( i=0; i<scoreList.length;i++){
        var scoreItem = document.createElement("li");
        scoreItem.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(scoreItem);       
    
    }
    saveScores();
    showScores();
}

function saveScores(){
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function showScores(){
    var storedHighScores = JSON.parse(localStorage.getItem("scoreList"));
    if (storedHighScores !== null){
        scoreList = storedHighScores;
    }
}

function clearScores(){
    localStorage.clear();
    scoreListEl.innerHTML="";
}

//--------------- Event Listeners---------------//

//Start Quiz
startBtn.addEventListener("click",quizInit);
//Verify Answers Selected
ansBtn.forEach(item =>{
    item.addEventListener("click",verifyAnswer);
});
//submit score
submitHighScore.addEventListener("click", addHighScore);

// Back Button
backBtn.addEventListener("click", function(){
    highScoresSection.style.display = "none";
    introEl.style.display = "block";
    timeCount = 75;
    timeEl.textContent = `Time:${timeCount}s`;
});
//Clear Scores Button

clearBtn.addEventListener("click",clearScores);

scoreBtn.addEventListener("click",function(){
    if(highScoresSection.style.display === "none"){
        highScoresSection.style.display = "block";
    }else if (highScoresSection.style.display === "block"){
        highScoresSection.style.display = "none";
    } else {
        return alert ("No scores to show.");
    }
});

