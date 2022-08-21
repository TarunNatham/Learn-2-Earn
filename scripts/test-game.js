let character = document.getElementById('character');
let answered = false;
let question = "";
let answer = "";
let choices = [];

getQuestion();

function getQuestion() {
  const url = 'http://127.0.0.1:5000/question/?question=' + 'simple-addition' + '&difficulty=0';
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

document.querySelectorAll('.choice').forEach(item => {
  item.addEventListener('click', func => {
    if(!answered) {
      if(item.textContent == answer) {
        item.style.backgroundColor = 'green';
        answered = true;
        jump();
      } else if(!answered) {
        item.style.backgroundColor = 'red';
        answered = true;
      }
      setTimeout(() => {
      answered = false;
      getQuestion();
      }, 500);
    }
  })
})

for(let i = 1; i <= 4; i++) {
  window.addEventListener('keyup', event => {
    if(event.key == i.toString()) {
      document.getElementById('choice' + i.toString()).click();
    }
  })
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

function jump() {
  if(character.classList != 'animate') {
    character.classList.add('animate');
  }
  setTimeout(() => {
    character.classList.remove('animate');
  }, 500);
}