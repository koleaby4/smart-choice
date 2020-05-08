import datetime
import json
import logging
import os
from typing import List

from flask import Flask, redirect, render_template, request, url_for

import mongo_helpers

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/help")
def help():
    return render_template("help.html")


def get_rule_payload(payload: dict) -> dict:
    """
    Given initial POST payload for creating / updating rules
    enriches it with additional fields and return expanded payload.
    """

    data = {"timestamp": string_timestamp()}
    data["rule_name"] = payload["rule_name"]
    if payload.get("rule_id"):
        data["_id"] = mongo_helpers.ObjectId(payload["rule_id"])
    criteria = []
    multipliers = []
    notes = []

    for key in payload:
        value = payload[key]
        if key.startswith("name"):
            criteria.append(value)
        elif key.startswith("multiplier"):
            multipliers.append(int(value))
        elif key.startswith("note"):
            notes.append(value)

    criteria_entries = []

    for i in range(len(criteria)):
        criteria_entries.append(
            {"criterion": criteria[i], "multiplier": multipliers[i], "note": notes[i]}
        )

    data["criteria"] = criteria_entries
    return data


@app.route("/rules", methods=["GET", "POST"])
def rules():
    if request.method == "POST":
        data = get_rule_payload(request.form.to_dict().copy())
        mongo_helpers.upsert_rule(data, None)
        return redirect(url_for("rules"))
    elif request.method == "GET":
        rules = format_timestamp(mongo_helpers.get_rules())
        return render_template("rules.html", rules=rules)


def format_timestamp(records: List) -> dict:
    """ Given a list of DB records,
        truncates `timestamp` fields
            from    "2020-04-25 12:15:39.109703"
            to      "2020-04-25 12:15"
        and returns updated records
    """
    for item in records:
        item["timestamp"] = item["timestamp"].rpartition(":")[0]
    return records


@app.route("/rules/<string:rule_id>", methods=["GET", "POST", "DELETE"])
def rule(rule_id):
    if request.method == "DELETE":
        return mongo_helpers.delete_rule(rule_id)
    elif request.method == "POST":
        data = get_rule_payload(request.form.to_dict().copy())
        mongo_helpers.upsert_rule(data, rule_id)
        return redirect(url_for("rules"))
    elif request.method == "GET":
        rule = mongo_helpers.get_rule(rule_id) if rule_id != "0" else None
        return render_template("rule_details.html", rule=rule)


@app.route("/comparison")
def new_comparison():
    rules = mongo_helpers.get_rules()
    for rule in rules:
        rule["_id"] = str(rule["_id"])
    return render_template("new_comparison.html", rules=rules)


@app.route("/comparisons/<string:comparison_id>", methods=["GET", "DELETE"])
def comparison(comparison_id):
    if request.method == "GET":
        comparison = mongo_helpers.get_comparison(comparison_id)
        comparison["_id"] = comparison_id
        comparison["options"].sort(key=lambda x: x["total"], reverse=True)
        return render_template("comparison_details.html", comparison=comparison)
    if request.method == "DELETE":
        return mongo_helpers.delete_comparison(comparison_id)


@app.route("/comparisons", methods=["GET", "POST"])
def comparisons():
    if request.method == "POST":
        payload = {**request.json, "timestamp": string_timestamp()}
        response = mongo_helpers.save_comparison(payload)
        logging.debug(f"!!! {response}")
        return response
    if request.method == "GET":
        comparisons = format_timestamp(mongo_helpers.get_comparisons())
        return render_template("comparisons.html", comparisons=comparisons)


def string_timestamp():
    """ Return current time as a string
    """
    return str(datetime.datetime.now())


if __name__ == "__main__":
    host = os.environ.get("IP", "0.0.0.0")
    port = os.environ.get("PORT", 5000)
    # ToDo: remove debug flag
    app.run(debug=True)
