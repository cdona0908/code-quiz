//----------Query Selectors------------//

var timeEl = document.querySelector("#timeSpan");
var scoreEl = document.querySelector("#score");
var introEl = document.querySelector("#intro");
var questionsEl = document.querySelector("#quiz-questions");
var questionItem = document.querySelector("#question");
// div element display if question is right or wrong
var rgMessage = document.querySelector("#message");
var endOfGame = document.querySelector("#allDone");
var userInitials = document.querySelector("#initials");
var highScoresSection = document.querySelector("#highScores");
var scoreListEl = document.querySelector("#score-list");
// Buttons Selectors
var startBtn = document.querySelector("#btn-start");
var answerBtn = document.querySelectorAll("button.answers");
var ans1Btn = document.querySelector("#answer1");
var ans2Btn = document.querySelector("#answer2");
var ans3Btn = document.querySelector("#answer3");
var ans4Btn = document.querySelector("#answer4");
var submitHighScore = document.querySelector("#submit");
var backBtn = document.querySelector("#btn-back");
var clearBtn = document.querySelector("#btn-clear");
var viewScores = document.querySelector("#view-scores");

//----------- Global Variables-----------//

//timer counter
var timeCount = 75;
// counts number of questions
var questionCount = 0;
// array of scores
var scoreList = [];

// Object for questions
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

//Start Quiz
function quizInit(){
    introEl.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;
    userInitials.value ="";
    timeInit();
    showQuestion(questionCount);
}

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
// Display question and posible answers
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
//Verify if answer right ot wrong and then go to the next question
function verifyAnswer(event){
    
    //Message holder to display right or wrong
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

// Submit HighScore
function addHighScore(event){
    event.preventDefault();
    endOfGame.style.display ="none";
    highScoresSection.style.display ="block";
    
    scoreList.push({
        initials: userInitials.value,
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

//Save Scores in HighScore List
function saveScores(){
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

// Display HighScore list
function showScores(){
    var storedHighScores = JSON.parse(localStorage.getItem("scoreList"));
    if (storedHighScores !== null){
        scoreList = storedHighScores;
    }
}
// Clear HighScore list
function clearScores(){
    localStorage.clear();
    scoreListEl.innerHTML="";
}

//--------------- Event Listeners---------------//

//Start Quiz
startBtn.addEventListener("click",quizInit);
//Verify Answers Selected
answerBtn.forEach(item =>{
    item.addEventListener("click",verifyAnswer);
});
//Submit Highscore
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

//Show HighScore List
viewScores.addEventListener("click",function(){
    if(highScoresSection.style.display === "none"){
        highScoresSection.style.display = "block";
    }else if (highScoresSection.style.display === "block"){
        highScoresSection.style.display = "none";
    } else {
        return alert ("There are no Highscores to show yet.");
    }
});

