from webbrowser import get
from flask import *
import json, time, random

app = Flask(__name__)


@app.route('/', methods=['GET'])
def home_page():
  data_set = {'Page': 'Home', 'Message': 'Successfully loaded the home page', 'Timestamp': time.time()}
  response = jsonify(data_set)
  response.headers.add('Access-Control-Allow-Origin', '*')
  
  return response

@app.route('/user/', methods=['GET'])
def request_page():
  user_query = str(request.args.get('user')) #/user/?user=tn8197

  data_set = {'Page': 'Home', 'Message': f'Successfully got the request for {user_query}', 'Timestamp': time.time()}
  response = jsonify(data_set)
  response.headers.add('Access-Control-Allow-Origin', '*')
  
  return response

@app.route('/question/', methods=['GET'])
def get_question():
  difficulty = int(request.args.get('question')) #/question/?question=0
  additionQuestion = create_addition(difficulty)

  data_set = {'Page': 'Home', 'Question': additionQuestion[0], 'Answer': additionQuestion[1],
  'Choices': additionQuestion[2]}
  response = jsonify(data_set)
  response.headers.add('Access-Control-Allow-Origin', '*')
  
  return response



def create_addition(difficulty):
  if difficulty in range(0, 10):
    first_num = random.randint(1, 10)
    sec_num = random.randint(1, 10)
    ans = first_num + sec_num

    question = 'What is ' + str(first_num) + ' + ' + str(sec_num) + '?'
    choice_set = (ans - 1, ans + 3, ans + 8, ans)

    return (question, ans, choice_set)
  elif difficulty in range(10, 20):
    first_num = random.randint(10, 30)
    sec_num = random.randint(10, 30)
    ans = first_num + sec_num

    question = 'What is ' + str(first_num) + ' + ' + str(sec_num) + '?'
    choice_set = (ans - 1, ans + 3, ans + 8, ans)

    return (question, ans, choice_set)
  else:
    first_num = random.randint(30, 60)
    sec_num = random.randint(30, 60)
    ans = first_num + sec_num

    question = 'What is ' + str(first_num) + ' + ' + str(sec_num) + '?'
    choice_set = (ans - 1, ans + 3, ans + 8, ans)

    return (question, ans, choice_set)




app.run(debug=True)