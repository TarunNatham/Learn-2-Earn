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
  question = request.args.get('question')
  difficulty = int(request.args.get('difficulty')) #/question/?question=simple-addition&difficulty=0

  if(question == 'simple-addition'):
    question = simple_addition(difficulty)

    data_set = {'Page': 'Home', 'Question': question[0], 'Answer': question[1],
    'Choices': question[2]}
    response = jsonify(data_set)
    response.headers.add('Access-Control-Allow-Origin', '*')

  elif(question == 'simple-subtraction'):
    question = simple_subtraction(difficulty)

    data_set = {'Page': 'Home', 'Question': question[0], 'Answer': question[1],
    'Choices': question[2]}
    response = jsonify(data_set)
    response.headers.add('Access-Control-Allow-Origin', '*')

  elif(question == 'mult-by-ten'):
    question = mult_by_ten(difficulty)

    data_set = {'Page': 'Home', 'Question': question[0], 'Answer': question[1],
    'Choices': question[2]}
    response = jsonify(data_set)
    response.headers.add('Access-Control-Allow-Origin', '*')

  elif(question == 'mult-by-five'):
    question = mult_by_five(difficulty)

    data_set = {'Page': 'Home', 'Question': question[0], 'Answer': question[1],
    'Choices': question[2]}
    response = jsonify(data_set)
    response.headers.add('Access-Control-Allow-Origin', '*')
  
  return response



def simple_addition(difficulty):
  if difficulty in range(0, 10):
    first_num = random.randint(1, 10)
    sec_num = random.randint(1, 10)
    ans = first_num + sec_num

  elif difficulty in range(10, 20):
    first_num = random.randint(10, 30)
    sec_num = random.randint(10, 30)
    ans = first_num + sec_num

  else:
    first_num = random.randint(30, 60)
    sec_num = random.randint(30, 60)
    ans = first_num + sec_num

  question = 'What is ' + str(first_num) + ' + ' + str(sec_num) + '?'
  choice_set = (ans - 1, ans + 3, ans + 8, ans)
  return (question, ans, choice_set)


def simple_subtraction(difficulty):
  if difficulty in range(0, 10):
    first_num = random.randint(2, 10)
    sec_num = random.randint(1, first_num - 1)
    ans = first_num - sec_num

  elif difficulty in range(10, 20):
    first_num = random.randint(11, 30)
    sec_num = random.randint(10, first_num - 1)
    ans = first_num - sec_num

  else:
    first_num = random.randint(31, 60)
    sec_num = random.randint(30, first_num - 1)
    ans = first_num - sec_num

  question = 'What is ' + str(first_num) + ' - ' + str(sec_num) + '?'
  choice_set = (ans + 1, ans + 3, ans + 8, ans)
  return (question, ans, choice_set)

def mult_by_ten(difficulty):
  if difficulty in range(0, 10):
    sec_num = random.randint(1, 5)
    ans = 10 * sec_num
  elif difficulty in range(10, 20):
    sec_num = random.randint(5, 10)
    ans = 10 * sec_num
  else:
    sec_num = random.randint(10, 20)
    ans = 10 * sec_num
  question = 'What is 10 ' + '\u00d7 ' +  str(sec_num) + '?'
  choice_set = (ans + 1, ans + 3, ans + 8, ans)
  return (question, ans, choice_set)

def mult_by_five(difficulty):
  if difficulty in range(0, 10):
    sec_num = random.randint(1, 5)
    ans = 5 * sec_num
  elif difficulty in range(10, 20):
    sec_num = random.randint(5, 10)
    ans = 5 * sec_num
  else:
    sec_num = random.randint(10, 20)
    ans = 5 * sec_num
  question = 'What is 5 ' + '\u00d7 ' +  str(sec_num) + '?'
  choice_set = (ans + 1, ans + 3, ans + 8, ans)
  return (question, ans, choice_set)



app.run(debug=True)

#if difficulty in range(0, 10):
    
#elif difficulty in range(10, 20):

#else: