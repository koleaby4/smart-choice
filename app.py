import os
from flask import Flask, request, url_for, redirect

app = Flask(__name__)

@app.route('/')
def index():
    return 'Working...'

if __name__ == "__main__":
    host = os.environ.get('IP', '0.0.0.0')
    port = os.environ.get('PORT', 5000)
    app.run()