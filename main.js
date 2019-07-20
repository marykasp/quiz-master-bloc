
const startButton = $("#start-button");
console.log(startButton);

const questionContainer = $('#question');
const headDisplayContainer = $('.head-display');
const gameContainer = $('.game-container');

let shuffledQuestions;
let currentQuestionIndex;
let currentQuestion;
const questionElement = $('#question');
const answerElements = $('.choice-text');
const choices = $('.choice-text');
const choiceContainer = $('.choice-container');


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


// Function to start the game
function startGame() {
    console.log('started');
    // remove hidden clss from game and headdisplay container
    $('.header').addClass('hidden');
    gameContainer.removeClass('hidden');
    headDisplayContainer.removeClass('hidden');

    // shuffle the questions located in the array using math random
    shuffledQuestions = questions.sort(() => Math.random() - 0.5)

    // set the current question index to 0
    currentQuestionIndex = 0;
    // set a current random question
    currentQuestion = shuffledQuestions[currentQuestionIndex];
    console.log(currentQuestion);
    setNextQuestion();
}

//  Function to select next question


function setNextQuestion() {
        //prints out whatever question is at that index to check if it worked (DEBUG)
        console.log(shuffledQuestions[currentQuestionIndex]);
        showQuestion(currentQuestion);
}

function showQuestion(question) {
    console.log(questionContainer);
    questionContainer.text(question.question);
    showAnswers();
}

// get element by ID

function showAnswers() {
    choices.each((index, value) => {
        const number = value.dataset['number'];
        console.log(number);
        value.innerText = currentQuestion['choice' + number];
    });
    selectAnswer();
}

// function to select an answer
function selectAnswer() {
  choiceContainer.on('click', function(event) {
    const selectedChoice = $(event.currentTarget);
    console.log(selectedChoice);

    console.log(selectedChoice === currentQuestion.answer);
  })
}



startButton.on('click', startGame);
