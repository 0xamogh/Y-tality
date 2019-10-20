# mongo.py

from flask import Flask
from flask import jsonify
from flask import request
from flask_pymongo import PyMongo

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'quick'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/quick'

mongo = PyMongo(app)

read_counter = 0

@app.route('/quick', methods=['GET'])
def get_all_patients():
  patient = mongo.db.patients
  output = []
  # for s in patient.find()[-read_counter:]:
  for s in patient.find():
    output.append({
            'ID' : s['ID'],
            'ECG_raw_value' : s['ECG_raw_value'],
            'ECG_prediction' : s['ECG_prediction'],
            'EEG_raw_value' : s['EEG_raw_value'],
            'EEG_prediction' : s['EEG_prediction'],
            'pulse' : s['pulse'],
            'GPS' : s['GPS'],
            'microphone_heart_prediction' : s['microphone_heart_prediction']
            })
  return jsonify({'result' : output})

def import_data(self, request):
    """Import the data for this recipe by either saving the image associated
    with this recipe or saving the metadata associated with the recipe. If
    the metadata is being processed, the title and description of the recipe
    must always be specified."""
    try:
        if 'file' in request.files:
            filename = file.save(request.files['file'])
            self.data_filename = filename
            self.file_url = file.url(filename)
	    os.system("server-data-handling.py " + file)
	    os.system("thermal-img-procc.py " + file)
	    os.system("eeg-server-processing.py " + file)
        else:
            json_data = request.get_json()
            self.title = json_data['title']
    except KeyError as e:
        raise ValidationError('Invalid recipe: missing ' + e.args[0])
    return self

# @app.route('/star/', methods=['GET'])
# def get_one_star(ID):
#     star = mongo.db.stars
#     s = star.find_one({'name' : ID})
#     if s:
#         output = {
#             'ID' : s['ID'],
#             'ECG_raw_value' : s['ECG_raw_value'],
#             'ECG_prediction' : s['ECG_prediction'],
#             'EEG_raw_value' : s['EEG_raw_value'],
#             'EEG_prediction' : s['EEG_prediction'],
#             'pulse' : s['pulse'],
#             'GPS' : s['GPS'],
#             'microphone_heart_prediction' : s['microphone_heart_prediction']
#             }
#     else:
#         output = "No such name"
#     return jsonify({'result' : output})

@app.route('/in', methods=['POST'])
def print_req():
  print(request)
  return jsonify({'status' : 200})

@app.route('/patient', methods=['POST'])
def add_patient():
    patient = mongo.db.patients
    ID = request.json['ID']
    ECG_raw_value = request.json['ECG_raw_value']
    ECG_prediction = request.json['ECG_prediction']
    EEG_raw_value = request.json['EEG_raw_value']
    EEG_prediction = request.json['EEG_prediction']
    pulse = request.json['pulse']
    GPS = request.json['GPS']
    microphone_heart_prediction = request.json['microphone_heart_prediction']
    patient_id = patient.insert({
            'ID' : ID,
            'ECG_raw_value' : ECG_raw_value,
            'ECG_prediction' : ECG_prediction,
            'EEG_raw_value' : EEG_raw_value,
            'EEG_prediction' : EEG_prediction,
            'pulse' : pulse,
            'GPS' : GPS,
            'microphone_heart_prediction' : microphone_heart_prediction
    })
    read_counter = read_counter + 1
    new_patient = patient.find_one({'_id': patient_id })
    output = {
        'ID' : new_patient['ID'],
        'ECG_raw_value' : new_patient['ECG_raw_value'],
        'ECG_prediction' : new_patient['ECG_prediction'],
        'EEG_raw_value' : new_patient['EEG_raw_value'],
        'EEG_prediction' : new_patient['EEG_prediction'],
        'pulse' : new_patient['pulse'],
        'GPS' : new_patient['GPS'],
        'microphone_heart_prediction' : new_patient['microphone_heart_prediction']
        }
    return jsonify({'result' : output})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='3000', debug=True)

# def upload_route_summary():


#         #store the file contents as a string
#         fstring = f.read()
        
#         #create list of dictionaries keyed by header row
#         csv_dicts = [{k: v for k, v in row.items()} for row in csv.DictReader(fstring.splitlines(), skipinitialspace=True)]

#         #do something list of dictionaries
#     return "success"

# @app.route('/upload', methods=['POST'])
# def upload():
#     # Create variable for uploaded file
#     f = request.files['fileupload'] 
#     patient = mongo.db.patients
#     ID = request.json['ID']
#     ECG_raw_value = request.json['ECG_raw_value']
#     ECG_prediction = request.json['ECG_prediction']
#     EEG_raw_value = request.json['EEG_raw_value']
#     EEG_prediction = request.json['EEG_prediction']
#     pulse = request.json['pulse']
#     GPS = request.json['GPS']
#     microphone_heart_prediction = request.json['microphone_heart_prediction']
#     patient_id = patient.insert({
#             'ID' : ID,            'ECG_raw_value' : ECG_raw_value,
#             'ECG_prediction' : ECG_prediction,
#             'EEG_raw_value' : EEG_raw_value,
#             'EEG_prediction' : EEG_prediction,
#             'pulse' : pulse,
#             'GPS' : GPS,
#             'microphone_heart_prediction' : microphone_heart_prediction
#     })
#     read_counter = read_counter + 1
#     new_patient = patient.find_one({'_id': patient_id })
#     output = {
#         'ID' : new_patient['ID'],
#         'ECG_raw_value' : new_patient['ECG_raw_value'],
#         'ECG_prediction' : new_patient['ECG_prediction'],
#         'EEG_raw_value' : new_patient['EEG_raw_value'],
#         'EEG_prediction' : new_patient['EEG_prediction'],
#         'pulse' : new_patient['pulse'],
#         'GPS' : new_patient['GPS'],
#         'microphone_heart_prediction' : new_patient['microphone_heart_prediction']
#         }
#     return jsonify({'result' : output})



# def save_entry(ID):
#     patients = mongo.db.patients
#     p = patients.find_one({'ID': ID})
#     if p:


# from flask import Flask
# from flask_restful import reqparse, abort, Api, Resource

# app = Flask(__name__)
# api = Api(app)

# TODOS = {
#     'todo1': {'task': 'build an API'},
#     'todo2': {'task': '?????'},
#     'todo3': {'task': 'profit!'},
# }


# def abort_if_todo_doesnt_exist(todo_id):
#     if todo_id not in TODOS:
#         abort(404, message="Todo {} doesn't exist".format(todo_id))

# parser = reqparse.RequestParser()
# parser.add_argument('task')


# # Todo
# # shows a single todo item and lets you delete a todo item
# class Todo(Resource):
#     def get(self, todo_id):
#         abort_if_todo_doesnt_exist(todo_id)
#         return TODOS[todo_id]

#     def delete(self, todo_id):
#         abort_if_todo_doesnt_exist(todo_id)
#         del TODOS[todo_id]
#         return '', 204

#     def put(self, todo_id):
#         args = parser.parse_args()
#         task = {'task': args['task']}
#         TODOS[todo_id] = task
#         return task, 201


# # TodoList
# # shows a list of all todos, and lets you POST to add new tasks
# class TodoList(Resource):
#     def get(self):
#         return TODOS

#     def post(self):
#         args = parser.parse_args()
#         todo_id = int(max(TODOS.keys()).lstrip('todo')) + 1
#         todo_id = 'todo%i' % todo_id
#         TODOS[todo_id] = {'task': args['task']}
#         return TODOS[todo_id], 201

# ##
# ## Actually setup the Api resource routing here
# ##
# api.add_resource(TodoList, '/todos')
# api.add_resource(Todo, '/todos/<todo_id>')


# if __name__ == '__main__':
#     app.run(debug=True)

