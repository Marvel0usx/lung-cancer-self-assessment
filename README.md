# Final Project - Lung Cancer Expert System

### NLP

```
> symptons

I have chest pain

> age?

I'm fifty yesrs old

> gender?

female(LGBTQ+)

> DO u have a ct scan

upload scan.jpg
```
Keyword extraction demo:https://www.textrazor.com/demo

Keyword blog:https://monkeylearn.com/keyword-extraction/

### Random Forest

#### Dataset

The dataset is downloaded from [lung cancer dataset](https://data.world/cancerdatahp/lung-cancer-data). This dataset is preprocessed and it is in a very good shape in terms of tidiness. Loaded from the csv file, the first ten rows of the dataset is shown below.

| patient_id | age  | gender | air_pollution | alcohol_use | dust_allergy | occupational_hazards | genetic_risk | chronic_lung_disease | balanced_diet | ...  | fatigue | weight_loss | shortness_of_breath | wheezing | swallowing_difficulty | clubbing_of_finger_nails | frequent_cold | dry_cough | snoring | level  |
| :--------- | :--- | :----- | :------------ | :---------- | :----------- | :------------------- | :----------- | :------------------- | :------------ | :--- | :------ | :---------- | :------------------ | :------- | :-------------------- | :----------------------- | :------------ | :-------- | :------ | :----- |
| P1         | 33   | 1      | 2             | 4           | 5            | 4                    | 3            | 2                    | 2             | ...  | 3       | 4           | 2                   | 2        | 3                     | 1                        | 2             | 3         | 4       | Low    |
| P10        | 17   | 1      | 3             | 1           | 5            | 3                    | 4            | 2                    | 2             | ...  | 1       | 3           | 7                   | 8        | 6                     | 2                        | 1             | 7         | 2       | Medium |
| P100       | 35   | 1      | 4             | 5           | 6            | 5                    | 5            | 4                    | 6             | ...  | 8       | 7           | 9                   | 2        | 1                     | 4                        | 6             | 7         | 2       | High   |
| P1000      | 37   | 1      | 7             | 7           | 7            | 7                    | 6            | 7                    | 7             | ...  | 4       | 2           | 3                   | 1        | 4                     | 5                        | 6             | 7         | 5       | High   |
| P101       | 46   | 1      | 6             | 8           | 7            | 7                    | 7            | 6                    | 7             | ...  | 3       | 2           | 4                   | 1        | 4                     | 2                        | 4             | 2         | 3       | High   |
| P102       | 35   | 1      | 4             | 5           | 6            | 5                    | 5            | 4                    | 6             | ...  | 8       | 7           | 9                   | 2        | 1                     | 4                        | 6             | 7         | 2       | High   |
| P103       | 52   | 2      | 2             | 4           | 5            | 4                    | 3            | 2                    | 2             | ...  | 3       | 4           | 2                   | 2        | 3                     | 1                        | 2             | 3         | 4       | Low    |
| P104       | 28   | 2      | 3             | 1           | 4            | 3                    | 2            | 3                    | 4             | ...  | 3       | 2           | 2                   | 4        | 2                     | 2                        | 3             | 4         | 3       | Low    |
| P105       | 35   | 2      | 4             | 5           | 6            | 5                    | 6            | 5                    | 5             | ...  | 1       | 4           | 3                   | 2        | 4                     | 6                        | 2             | 4         | 1       | Medium |
| P106       | 46   | 1      | 2             | 3           | 4            | 2                    | 4            | 3                    | 3             | ...  | 1       | 2           | 4                   | 6        | 5                     | 4                        | 2             | 1         | 5       | Medium |

After removing the *patient_id* column, which is irrelevant to our training, the dataset is 1000 samples by 23 features. The model takes in the first 23 columns as X, and the last column, *level* of severity for its training and testing.

#### Training and Testing Partitioning

```python
mask = np.random.rand(n_sample) < 0.8
training_set = cleaned_df[mask]
testing_set = cleaned_df[~mask]
```

The data is loaded as a *pandas DataFrame* object, where we can easily split the dataset by 80% of training data and 20% of testing data.

#### Performance of Random Forest Classifier

```
testing_X = testing_set.loc[:, testing_set.columns != "level"]
testing_y = testing_set[["level"]]
nn.score(testing_X, testing_y)
```

The model is trained on a training set of 797 samples and tested on a testing set of 203 samples, the total score is **1.0**, which means it predicted all of the samples in the testing set correctly.

## Image CNN

> nn.predict(scan.jpg)
>
> return result to chatbot

Models for breast cancer detection:

code:https://github.com/lishen/end2end-all-conv
paper:https://paperswithcode.com/paper/deep-learning-to-improve-breast-cancer-early

## Response Chatbot

### hospice chatbot
- inform results
- give expectation life time, probability
- provide advice
- provide medication advice
- give prescription 

### Behind scene
- recognition
- CNN classification
- regression


## Database

## Frontend & Backend Interaction
- [ ] Flask API as backend
- [ ] Frontend should be a WebApp