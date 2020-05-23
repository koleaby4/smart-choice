# Overview
Smart Choice is a web application, which can help to choose the best option based on your own weighted rules.

More info about decision-making matrix can be in [weighted decision matrix prioritization](https://airfocus.io/blog/weighted-decision-matrix-prioritization/) article

# Run locally

## Activate virtual environment

Windows:
    `env\Scripts\activate.bat`

Mac:
    `source env/bin/activate`

For further information see [venv documentation](https://docs.python.org/3/library/venv.html)

## Install dependencies

`pip install -r requirements.txt`

## Run Flask app

Windows:
    `set "IP=0.0.0.0"`
    `set "PORT=5000"`
    `set "MONGO_CONNECTION_STRING=<connection_string_for_mongo_database>"`

Mac:
    `export "IP=0.0.0.0"`
    `export "PORT=5000"`
    `export "MONGO_CONNECTION_STRING=<connection_string_for_mongo_database>"`


`python app.py`


## Execute cypress tests

Prerequisites:
* Make sure `npm` is installed (see [these steps](https://www.npmjs.com/get-npm) for details).
* Open terminal window and execute `npm`.

Run tests in Cypress UI:
1. open terminal window
1. `cd` into project folder
1. execute th following in command line: `npm run cypress:open`
1. click `Run all spec` button


## Create demo content

1. set up connection to MongoDb:
    - Windows: `set "MONGO_CONNECTION_STRING=<connection_string_for_mongo_database>"`
    - Mac: `export "MONGO_CONNECTION_STRING=<connection_string_for_mongo_database>"`
1. execute th following in command line: `python mongo_create_content.py`


## Run application

1. in command line terminal navigate to project folder
2. execute `flask run`

# Deployment to Heroku

We used Heroku as a deployment and hosting platform.
Deployment and configuration steps were taken from this [Heroku: Getting started with Python](https://devcenter.heroku.com/articles/getting-started-with-python) tutorial.

# MongoDb collections design

Smart Choice application operates with two top level objects:
* rules
* comparisons

## Structure of 'rule' document

Each rule would contain the following information:
 * id
 * rule name
 * timestamp (as string in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601))
 * criteria - collection of criterion objects with the following structure:
    * criterion (description / string)
    * multiplier
    * note

Example of a rule document:
```
    {
    "_id": "5ec28e61241125cc797ba944",
    "rule_name": "Cars comparison (Demo)",
    "timestamp": "2019-01-24 22:08:12.12345",
    "criteria": [
        {
            "criterion": "price",
            "multiplier": 5
            "note": "lower - better"
        },
        {
            "criterion": "brand",
            "multiplier": 4,
            "note": "stronger - better"
        },
        ...
    ]
    }
```

## Structure of 'comparison' document

Comparison documents have the following structure:

* id
* comparison name
* rule object (embedded/copied rather than referenced)
* highest score (calculated at back-end to make it easier for front-end to highlight the winner)
* timestamp (string in ISO format)
* options - collections of objects with the following structure:
    * name
    * total score
    * scores - collection of objects with the following structure:
        * criterion
        * multiplier
        * score
        * weighted_score (calculated by multplying score by weight from corresponding criterion in rule)


```
{
  "_id": "5e9463679c7468bf618c192c",
  "name": "Compare cars",
  "rule": { ... },
  "highest_score": 86,
  "timestamp": "2020-04-13 14:04:39.082601"
  "options": [
    {
      "option_name": "Audi",
      "total": "81",
      "scores": [
        {
          "criterion": "price",
          "multiplier": 5,
          "score": 4,
          "weighted_score": 20
        },
        {
          "criterion": "brand",
          "multiplier": 4,
          "score": 5,
          "weighted_score": 20
        },
        ...
      ]
    },
    {...}
  ]
}
```

## Database design decisions

 1. It was decided to embed rules into comparisons rather than reference them.
 This is because rules are allowed to change, but we did not want these changes to affect saved comparisons.
 In this way rules can be amended to reflect changing priorities and new comparisons can be created based on these rules,
 however previously saved comparisons remain unchanged - which allows reviewing past decisions.

1. Both rules and comparisons have additional fields (timestamps, calculated totals),
which were not present in the front-end and were added by web-services.
This information allows faster ordering of rules and comparisons as well as faster rendering of the saved comparisons
because all the calculations were done in the back-end when saving these objects. This allows keeping front-end simple because it only renders information provided by the back-end.

# Capturing requirements and tracking progress

We used [github's issues](https://github.com/koleaby4/smart-choice/issues) functionality to capture requirements, bugs and track progress.
Labels were used for grouping tickets into: NFR(non-functional requirements) and Bugs. All unlabeled tickets are treated as functional requirements.

Where useful/needed, wireframes were provided(see [Issue 16](https://github.com/koleaby4/smart-choice/issues/16)
and [Issue 17](https://github.com/koleaby4/smart-choice/issues/17) for examples).

Bugs have the following structure:
1. steps to reproduce
1. expected result
1. actual results

See [Issue 37](https://github.com/koleaby4/smart-choice/issues/37) as an example.

# Known limitations

1. Current implementation targets larger screen sizes. With the focus of the project being back-end,<br>
we kept front-end works for mobile devices at the end of the backlog.<br>
[Issue 37](https://github.com/koleaby4/smart-choice/issues/37) was raised to address this limitation in the future.
1. Certain parts of functionality will not work on Internet Explorer due to the fact <br>
that we are using JS arrow-functions, which are currently [not supported by IE browser](https://caniuse.com/#feat=arrow-functions).<br>
We raised [issue 27](https://github.com/koleaby4/smart-choice/issues/27) to address this limitation in the future.

# Tools used

1. [VSCode](https://code.visualstudio.com/) as IDE
1. [git](https://git-scm.com/) for versioning
1. [github](https://github.com/):
    1. as a remote repository
    1. for managing tickets and tracking progress
1. [Heroku](https://heroku.com/)
1. [MongoDb](https://mongodb.com/)
1. [cypress.io](https://www.cypress.io/)
1. [W3 css validator](https://jigsaw.w3.org/css-validator/validator)
1. [W3 html validator](https://validator.w3.org/)

# 3rd party resources

1. [normilize.css](http://nicolasgallagher.com/about-normalize-css/)
1. [bootstrap 4.4](https://getbootstrap.com/docs/4.4)
1. [Google fonts](https://fonts.google.com/)
1. [ionicons](https://ionicons.com/)
1. Images: [Unsplash](https://unsplash.com/)
