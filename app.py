import os
from flask import Flask, request, url_for, redirect, render_template
import mongo_helpers
import datetime
import json

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/rules')
def rules():
    return render_template('rules.html', rules=mongo_helpers.get_rules())


def get_rule_payload(payload):
    data = {'date_created': str(datetime.datetime.now())}
    data['rule_name'] = payload['rule_name']

    criteria = []
    multipliers = []
    notes = []

    for key in payload:
        value = payload[key]
        if key.startswith('name'):
            criteria.append(value)
        elif key.startswith('multiplier'):
            multipliers.append(int(value))
        elif key.startswith('note'):
            notes.append(value)

    criteria_entries = []

    for i in range(len(criteria)):
        criteria_entries.append(
            {
                "criterion": criteria[i],
                "multiplier": multipliers[i],
                "note": notes[i]
            }
        )

    data['criteria'] = criteria_entries
    return data


@app.route('/rules/create', methods=['GET', 'POST'])
def create_rule():
    if request.method == 'POST':
        data = get_rule_payload(request.form.to_dict().copy())
        mongo_helpers.insert_rule(data)
        return redirect(url_for('rules'))
    else:
        return render_template('create_rule.html')


@app.route('/rules/delete/<string:rule_id>', methods=['DELETE'])
def delete_rule(rule_id):
    return mongo_helpers.delete_rule(rule_id)


if __name__ == "__main__":
    host = os.environ.get('IP', '0.0.0.0')
    port = os.environ.get('PORT', 5000)
    # ToDo: remove debug flag
    app.run(debug=True)
