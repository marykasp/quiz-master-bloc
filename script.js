let questions = [
  {
    question: 'Which of the following are not part of a neuron?',
    choice1: 'synapse',
    choice2: 'axon',
    choice3: 'Nissl bodies',
    choice4: 'dendrite',
    answer: 3,
    correct: 'Nissl bodies'
  },

  {
    question:
      'The resting potential of a neuron is dependent on what two ions?',
    choice1: 'lead and calcium ions',
    choice2: 'calcium and phosphate ions',
    choice3: 'potassium and phosphate ions',
    choice4: 'sodium and potassium ions',
    answer: 4,
    correct: 'sodium and potassium ions'
  },

  {
    question: 'Which of the following is NOT a type of neuron?',
    choice1: 'sensory',
    choice2: 'motor',
    choice3: 'association',
    choice4: 'stimulatory',
    answer: 4,
    correct: 'stimulatory'
  },

  {
    question: 'Which of of the following statements is TRUE of insulin?',
    choice1: 'secreted by the pancreas',
    choice2: 'a protein',
    choice3: 'involved in the metabolism of glucose',
    choice4: 'all of the above',
    answer: 4,
    correct: 'all of the above'
  },

  {
    question: 'What are the major fibrous proteins?',
    choice1: 'peptone and edestin',
    choice2: 'leucine and glutelin',
    choice3: 'valine and lysine',
    choice4: 'myosin and actin',
    answer: 4,
    correct: 'myosin and actin'
  }
];

/**********************************
 VARIABLES STORING JQUERY ELEMENT DOM SELECTIONS
 ******************************/
const startButton = $("#start-button");
const headDisplayContainer = $('.head-display');
const gameContainer = $('.game-container');
const results = $('.result');

const question = $('#question');
const choices = $('.choice-text');
const feedback = $('.textual-feedback');
const questionCounterText = $('#questionCounter');
const scoreText = $('#score');
const choiceContainer = $('.choice-container');
const progessBarFull = $('.progress-bar-full');



let acceptAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let currentQuestion = {};


// CONSTANTS
const maxQuestions = 5;


/*******************
Function that starts the game- changes display
*******************/
function startGame() {
      // show head display and game container, hide start and results page
      $('.header').addClass('hidden');
      gameContainer.removeClass('hidden');
      headDisplayContainer.removeClass('hidden');
      results.addClass('hidden');

      // calls function to reset the score to 0
      resetScore();
}

/*******************
Function that resets the score
*******************/
function resetScore() {
  // set score and question counter to 0
  questionCounter = 0;
  score = 0;
  scoreText.text(score);

  // put question array into a new array to manipulate
  availableQuestions = [...questions];
  console.log(availableQuestions);

  //call function that generates and displays a randowm question from the array
  getNewQuestion();
}

/*******************
Function that generates the new question, calls other functions
*******************/
function getNewQuestion() {
  if(availableQuestions.length === 0 || questionCounter > maxQuestions) {
    displayFinalScore();
  }

  // update the question counter
  questionCounterUpdate();

  // get new random question from the available questions array
  getRandomQuestion();
  acceptAnswers = true;

  // display the current question
  showCurrentQuestion();
}

/*******************
Updates the question counter and increases the progress bar
*******************/
function questionCounterUpdate() {
  questionCounter++;
  questionCounterText.text(`${questionCounter} / ${maxQuestions}`);

  let percentage = (questionCounter / maxQuestions) * 100;
  console.log(percentage);
  progessBarFull.css('width', `${percentage}%`);
}

/*******************
increases the score and fixes the score display
*******************/
function incrementScore(num) {
  score += num;
  console.log(score);
  scoreText.text(score);
}

/*******************
Generate a Random Question from Availabe Questions
*******************/
function getRandomQuestion() {
  // pick a random index number from the available maxQuestion
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  console.log(currentQuestion);

  availableQuestions.splice(questionIndex, 1);

}

/*******************
Display current question to question form
*******************/
function showCurrentQuestion() {
  // change text of question HTML element with the current maxQuestion
  question.text(currentQuestion.question);
  showAnswers();
}

/*******************
Display answer to current question in question form
*******************/
function showAnswers() {
    choices.each((index, value) => {
        const number = value.dataset['number'];
        console.log(number);
        value.innerText = currentQuestion['choice' + number];
    });
    showFeedback();
}

/*******************
Display answer to current question in question form
*******************/
function showFeedback() {
  choiceContainer.on('click', function(event) {
    if(!acceptAnswers) return;

    acceptAnswers = false;

    const selectedChoice = $(event.currentTarget).children('.choice-text');
    // console.log(selectedChoice);

    const selectedAnswer = selectedChoice.data('number');
    // console.log(selectedAnswer);

    if(selectedAnswer == currentQuestion.answer) {
      $(this).addClass('correct');
      feedback.removeClass('hidden').find('p').html(
        '<p>Yay! You got it correct!');
      incrementScore(1);
    } else {
      $(this).addClass('incorrect');
      feedback.removeClass('hidden').find('p').html(`<p>Sorry you are incorrect. The correct answer is: ${currentQuestion.correct}</p>`);
    }

    setTimeout(() => {
      $(this).removeClass('correct incorrect');
      $('.textual-feedback').addClass('hidden');

      getNewQuestion();
    }, 2000);
  });

}

/*******************
Displays the results page and shows final score
contains buttons that on click will either go home or start game again
*******************/
function displayFinalScore() {
  // window.location.assign('results.html');
  headDisplayContainer.addClass('hidden');
  gameContainer.addClass('hidden');
  results.removeClass('hidden');

  $('#finalScore').text(score + ' / ' + maxQuestions);
  $('#playagain').on('click', startGame);
}

/**********************
 starts game once start button is clicked, calls function that resets the score and gets the first questions
 *************************/
function renderPage() {
  startButton.on('click', startGame);
}

// on document ready render the quiz 
$(renderPage);

