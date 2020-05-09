# choice-guide
Web app, helping you to choose the best option using your own weighted rules

More info about decision-making matrix can be in [weighted decision matrix prioritization](https://airfocus.io/blog/weighted-decision-matrix-prioritization/) article

# Run locally

## Activate virtual environment

Windows:
    `env\Scripts\activate.bat`

Mac:
    `TBC`

`pip install -r requirements.txt`

# Run Flask app

Windows:
    `set "IP=0.0.0.0"`
    `set "PORT=5000"`
    `set "MONGO_CONNECTION_STRING=<connection_string_for_mongo_database>"`

Mac:
    `export "IP=0.0.0.0"`
    `export "PORT=5000"`
    `export "MONGO_CONNECTION_STRING=<connection_string_for_mongo_database>"`


`python app.py`

# Install dependencies

Prerequisites:
Make sure `npm` ins installed (see [these steps](https://www.npmjs.com/get-npm) for details).

Open terminal window and execute `npm`.

# Execute cypress tests

1. open terminal window
1. `cd` into project folder
1. execute th following in command line: `npm run cypress:open`
1. click `Run all spec` button


# Create demo content

1. set up connection to MongoDb:
    - Windows: `set "MONGO_CONNECTION_STRING=<connection_string_for_mongo_database>"`
    - Mac: `export "MONGO_CONNECTION_STRING=<connection_string_for_mongo_database>"`
1. execute th following in command line: `python mongo_create_content.py`


# Run application

1. in command line terminal navigate to project folder
2. execute `flask run`

# ToDo:
describe deployment to Heroku

# ToDo:
describe DB design decisions

# Known limitations

1. Current implementation targets larger screen sizes. With the focus of the project being back-end,<br>
we deprioritised front-end works for mobile devices.<br>
[Issue 37](https://github.com/koleaby4/smart-choice/issues/37) was raised to address this limitation in the future.
1. Certain parts of functionality will not work on Internet Explorer due to the fact <br>
that we are using JS arrow-functions, which are currently [not supported by IE browser](https://caniuse.com/#feat=arrow-functions).<br>
We raised [issue 27](https://github.com/koleaby4/smart-choice/issues/27) to address this limitation in the future.

# 3rd party resources

1. [normilize.css](http://nicolasgallagher.com/about-normalize-css/)
1. [bootstrap 4.4](https://getbootstrap.com/docs/4.4)
1. [Google fonts](https://fonts.google.com/)
1. [ionicons](https://ionicons.com/)
1. Images: [Unsplash](https://unsplash.com/)
1. [W3 css validator](https://jigsaw.w3.org/css-validator/validator)
1. [W3 html validator](https://validator.w3.org/)
