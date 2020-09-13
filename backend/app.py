import os
import base64
from flask import Flask, jsonify, request
import json
import pickle
from flask_cors import cross_origin
import numpy as np
# from tensorflow.keras.models import load_model
import random

# init app
app = Flask(__name__)

RF_PATH = r"E:/programming/Python/Current/final-project/nn/rand_forest.dat"
# CNN_PATH = r"E:/programming/Python/Current/final-project/nn/model.h5"
IMG_SAVE_PATH = r"E:/programming/Python/Current/final-project/data/"

# setup neural networks
rf = pickle.load(open(RF_PATH, "rb"))
# cnn = load_model(CNN_PATH)

@app.route("/analysis", methods=["POST"])
@cross_origin()
def rest_return_report():
    """Route for getting prediction by random forest. Function returns
    formatted json file on success; returns empty json file otherwise.
    """
    raw_data = request.get_data()
    data = json.loads(raw_data)["data"]
    
    # modify data to fit the input of our classifier
    rf_testing_X = compute_X(data)
    rf_y_hat = rf.predict(rf_testing_X)[0]

    return jsonify({"rf_prediction": rf_y_hat})

@app.route("/image-analysis", methods=["POST"])
@cross_origin()
def get_cnn_prediction():
    """Route for getting prediction by CNN. Function returns
    formatted json file on success; returns empty json file otherwise.
    """
    print(request.files)
    image_file = request.files.get("file", "")
    filename = "ct-{}".format(random.randint(0, 999))
    image_file.save(os.path.join(IMG_SAVE_PATH, filename))

    res = cnn_predict(IMG_SAVE_PATH + filename)

    return jsonify({"cancer": "89", "no_cancer": "11"})

def cnn_predict(img_path):
    pass

def compute_X(data):
    data[1] = 1 if data[1] == "male" else 2
    data = [float(i) for i in data]
    bmi = data[10] / (data[9] ** 2)
    if bmi < 18.5:
        obesity = 1
    elif 18.5 <= bmi <= 24.9:
        obesity = 2
    else:
        obesity = 2 + round(bmi - 25)
    X = data[:9] + [obesity] + data[11:]
    assert len(X) == 23
    return np.array([X]).reshape((-1, 23))


if __name__ == "__main__":
    app.run(debug=True)
