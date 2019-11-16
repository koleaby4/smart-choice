# choice-guide
Web app, helping you to choose the best option using your own weighted rules

More info about decision-making matrix can be in [weighted decision matrix prioritization](https://airfocus.io/blog/weighted-decision-matrix-prioritization/) article

# Run locally

```pip install -r requirements.txt```

Windows:
    set "IP=0.0.0.0"
    set "PORT=5000"
    set "MONGO_CONNECTION_STRING=<connection_string_for_mongo_database>"

Mac:
    export "IP=0.0.0.0"
    export "PORT=5000"
    export "MONGO_CONNECTION_STRING=<connection_string_for_mongo_database>"


python app.py

# Install dependencies

Prerequisites:
Make sure `npm` ins installed (see [these steps](https://www.npmjs.com/get-npm) for details).

Open terminal window and execute `npm`.

# Execute cypress tests

1. open terminal window
2. `cd` into project folder
3. execute `npm run cypress:open`