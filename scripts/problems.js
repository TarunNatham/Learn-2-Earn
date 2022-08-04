let answered = false;
let difficulty = 0;
let question = "";
let answer = "";
let choices = [];

getQuestion();

function getQuestion() {
  const url = 'http://127.0.0.1:5000/question/?question=' + 'mult-by-five' + '&difficulty=' + difficulty;
  fetch(url)
    .then(response => {
      return response.json()
    }).then(function (text) {
      console.log('GET response:');
      question = text.Question;
      updateQuestion(question);
      answer = text.Answer;
      choices = text.Choices;
      updateChoices(choices);
    })
    .catch(error => console.log('ERROR'));
}

function updateQuestion(question) {
  document.getElementById('question').textContent = question;
}

function updateChoices(choices) {
  document.querySelectorAll('.choice').forEach(item => {
    item.style.backgroundColor = '';
    const index = Math.floor(Math.random() * choices.length);
    item.textContent = choices[index];
    choices.splice(index, 1);
  })
}
document.querySelectorAll('.choice').forEach(item => {
  item.addEventListener('click', event => {
    if(item.textContent == answer && !answered) {
      item.style.backgroundColor = 'green';
      answered = true;
      difficulty++;
    } else if(!answered) {
      item.style.backgroundColor = 'red';
      answered = true;
      difficulty--;
      difficulty = Math.max(difficulty, 0);
    }
  })
})

document.getElementById('next-button').addEventListener('click', event => {
  if(answered) {
    console.log(difficulty);
    if(difficulty >= 10) {
      document.getElementById('question').textContent = 'Mastered';
    } else {
      answered = false;
      getQuestion();
    }
  }
})