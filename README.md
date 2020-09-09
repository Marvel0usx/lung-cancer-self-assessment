# Final Project - Lung Cancer Expert System

## NLP

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

### Behind Scene

#### random forest

take in:

- gender
- age
- chest_pain
- height/weight
- smoking
- alcohol

spit out:
- possible cancer

dataset: [lung cancer dataset](https://data.world/cancerdatahp/lung-cancer-data)

## ImageCNN

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
- CNN classfication
- regression


## Database

## Frontend & Backend Interaction
- [ ] Flask API as backend
- [ ] Frontend should be a webapp