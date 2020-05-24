/* Java Script for rules.html */

document.getElementById("createRuleButton").onclick = () => location.href = `/rules/0`

function openRuleDetails(rule_id) {
    location.href = `/rules/${rule_id}`
}

function deleteRuleFromDatabase(rule_id) {
    let outcome

    let url = `/rules/${rule_id}`
    fetch(url, { method: 'delete' })
        .then(response => response.json())
        .then(outcome => console.log(outcome))
}

/* delete rule from UI and DB */
function deleteRule(event) {
    {
        const row = event.closest("tr")
        deleteRuleFromDatabase(row.id)
        row.remove()
    }
}

function editRule(event) {
    {
        const ruleRow = event.closest("tr")
        location.href = `/rules/${ruleRow.id}`
    }
}
