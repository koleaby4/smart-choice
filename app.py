import os
from flask import Flask, request, url_for, redirect, render_template
import mongo_helpers
import datetime
import json
import pdb

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/rules')
def rules():
    return render_template('rules.html', rules=mongo_helpers.get_rules())


def get_rule_payload(payload):
    data = {'timestamp': str(datetime.datetime.now())}
    data['rule_name'] = payload['rule_name']
    if payload.get('rule_id'):
        data['_id'] = mongo_helpers.ObjectId(payload['rule_id'])
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


@app.route('/rules/<string:rule_id>', methods=['GET', 'POST', 'DELETE'])
def rule(rule_id):
    if request.method == 'DELETE':
        return mongo_helpers.delete_rule(rule_id)
    elif request.method == 'POST':
        data = get_rule_payload(request.form.to_dict().copy())
        mongo_helpers.upsert_rule(data, rule_id if rule_id != '0' else None)
        return redirect(url_for('rules'))
    elif request.method == 'GET':
        rule = mongo_helpers.get_rule(rule_id) if rule_id != '0' else None
        return render_template('rule_details.html', rule=rule)


@app.route('/comparison')
def new_comparison():
    rules = mongo_helpers.get_rules()
    for rule in rules:
        rule["_id"] = str(rule["_id"])
    return render_template('comparison.html', rules=rules)


@app.route('/comparisons', methods=['POST'])
def save_comparison():
    mongo_helpers.save_comparison(request.json)
    return new_comparison()


if __name__ == "__main__":
    host = os.environ.get('IP', '0.0.0.0')
    port = os.environ.get('PORT', 5000)
    # ToDo: remove debug flag
    app.run(debug=True)
