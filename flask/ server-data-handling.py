from __future__ import division, print_function
# from keras.callbacks import LearningRateScheduler
import matplotlib.pyplot as plt
import numpy as np
from sklearn.metrics import confusion_matrix, roc_auc_score, roc_curve, precision_recall_curve, f1_score, classification_report
from __future__ import division, print_function
import numpy as np
from config import get_config
from utils import *
import os
def uploadedData(filename, csvbool = True):
    if csvbool:
      csvlist = list()
      with open(filename, 'r') as csvfile:
        for e in csvfile:
          if len(e.split()) == 1 :
            csvlist.append(float(e))
          else:
            csvlist.append(e)
    return csvlist

def preprocess(data, config):
    sr = config.sample_rate
    if sr == None:
      sr = 300
    data = np.nan_to_num(data) # removing NaNs and Infs
    from scipy.signal import resample
    data = resample(data, int(len(data) * 360 / sr) ) # resample to match the data sampling rate 360(mit), 300(cinc)
    from sklearn import preprocessing
    data = preprocessing.scale(data)
    from scipy.signal import find_peaks
    peaks, _ = find_peaks(data, distance=150)
    data = data.reshape(1,len(data))
    data = np.expand_dims(data, axis=2) # required by Keras
    return data, peaks
def predict(data, label, peaks, config):
    classesM = ['N','Ventricular','Paced','A','F','Noise']
    predicted, result  = predictByPart(data, peaks)
    sumPredict = sum(predicted[x][1] for x in range(len(predicted)))
    avgPredict = sumPredict/len(predicted)
    print("The average of the predict is:", avgPredict)
    print("The most predicted label is {} with {:3.1f}% certainty".format(classesM[avgPredict.argmax()], 100*max(avgPredict[0])))
    sec_idx = avgPredict.argsort()[0][-2]
    print("The second predicted label is {} with {:3.1f}% certainty".format(classesM[sec_idx], 100*avgPredict[0][sec_idx]))
    print("The original label of the record is " + label)
    return predicted, classesM[avgPredict.argmax()], 100*max(avgPredict[0])
def predictByPart(data, peaks):
    classesM = ['N','Ventricular','Paced','A','F','Noise']#,'L','R','f','j','E','a','J','Q','e','S']
    predicted = list()
    result = ""
    from keras.models import load_model
    model = load_model('models/MLII-latest.hdf5')

    for i, peak in enumerate(peaks[3:-1]):
      total_n =len(peaks)
      start, end =  peak-config.input_size//2 , peak+config.input_size//2
      prob = model.predict(data[:, start:end])
      prob = prob[:,0]
      ann = np.argmax(prob)
      if classesM[ann] != "N":
        print("The {}/{}-record classified as {} with {:3.1f}% certainty".format(i,total_n,classesM[ann],100*prob[0,ann]))
      result += "("+ classesM[ann] +":" + str(round(100*prob[0,ann],1)) + " %)"
      predicted.append([classesM[ann],prob])
      if classesM[ann] != 'N' and prob[0,ann] > 0.95:
        import matplotlib.pyplot as plt
        plt.plot(data[:, start:end][0,:,0],)
        mkdir_recursive('results')
        plt.savefig('results/hazard-'+classesM[ann]+'.png', format="png", dpi = 300)
        plt.close()
    return predicted, result
def main(file):
  classesM= ['N','Ventricular','Paced','A','F', 'Noise']#,'L','R','f','j','E','a','J','Q','e','S']
  data = uploadedData(file)
  data, peaks = preprocess(data, config)
  return predict(data, label, peaks, config)

if __name__=='__main__':
  # config = get_config()
  main()
