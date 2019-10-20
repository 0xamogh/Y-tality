# mongo.py

from flask import Flask
from flask import jsonify
from flask import request
from flask_pymongo import PyMongo

from pymongo import Binary

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'restdb'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/restdb'

mongo = PyMongo(app)

read_counter = 0

@app.route('/patient', methods=['GET'])
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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='3500', debug=True)
