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
    if payload['rule_id']:
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

# ToDo:
# merge rule_details, upsert_rule and delete_rule
# into one end point with different methods
@app.route('/rules/rule_details', methods=['GET'])
def rule_details():
    rule_id = request.args.get('_id', None)
    rule = mongo_helpers.get_rule(rule_id) if rule_id else None
    return render_template('rule_details.html', rule=rule)


@app.route('/rules/upsert', methods=['POST'])
def upsert_rule():
    data = get_rule_payload(request.form.to_dict().copy())
    mongo_helpers.upsert_rule(data)
    return redirect(url_for('rules'))


# ToDo: move inside
@app.route('/rules/delete/<string:rule_id>', methods=['DELETE'])
def delete_rule(rule_id):
    return mongo_helpers.delete_rule(rule_id)


@app.route('/comparisons')
def comparisons():
    rules = mongo_helpers.get_rules()
    for rule in rules:
        rule["_id"] = str(rule["_id"])
    return render_template('comparisons.html', rules=rules)


@app.route('/comparisons/<int:comparison_id>', methods=['POST'])
def save_comparison(comparison_id):
    pdb.set_trace()
    return comparisons()


if __name__ == "__main__":
    host = os.environ.get('IP', '0.0.0.0')
    port = os.environ.get('PORT', 5000)
    # ToDo: remove debug flag
    app.run(debug=True)
