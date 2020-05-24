
function getSelectedRule() {
    let dropDown = document.querySelector('[name=rules]');
    let rule_id = dropDown.getAttribute('rule_id');
    return getRuleById(rule_id);
}

/* wipe out existing content of comparison table
    and re-populate its headers with details from selected rule*/
function populateComparisonTable(selectedOption) {
    const selectedRuleId = selectedOption.value

    selectedOption.setAttribute('rule_id', selectedRuleId)
    const selectedRule = getRuleById(selectedRuleId)

    clearComparisonTable()

    const criteriaCount = selectedRule.criteria.length
    for (let i = 1; i <= criteriaCount; i++) {

        let ruleDetails = selectedRule.criteria[i - 1]
        let multiplier = ruleDetails.multiplier

        let headerCell = createHeaderCell(`${ruleDetails.criterion}`)
        headerCell.setAttribute('multiplier', multiplier);
        appendHeaderCell(headerCell);
    }

    appendHeaderCell(createHeaderCell("Total"));
    appendHeaderCell(createHeaderCell("Actions"));

    // enable buttons
    let addRowButton = document.querySelector('#addrow');
    addRowButton.removeAttribute("disabled")
    addRowButton.click();

    document.querySelector('[data-test="save-comparison"]').removeAttribute("disabled");

    // adjust spacing for table footer
    document.querySelectorAll('tfoot td').forEach(td => td.setAttribute("colspan", criteriaCount + 3))
}

let appendHeaderCell = headerCell =>
    document.querySelector('.comparison-header-row').appendChild(headerCell);

/* create `th` element with specified text */
function createHeaderCell(innerText) {
    let headerCell = document.createElement("th");
    headerCell.innerText = innerText;
    headerCell.setAttribute('scope', "col");
    return headerCell;
}

function clearComparisonTable() {

    // reset header of the table
    document.querySelectorAll('#comparison-table .comparison-header-row th')
        .forEach(cell => cell.remove())

    appendHeaderCell(createHeaderCell("Options to compare"));

    // and remove previous content
    document.querySelectorAll('#comparison-table tbody tr').forEach(row => row.remove())
}

let counter = 0;
function insertRowIntoComparisonTable() {
    let newRow = document.createElement("tr");
    const selectedRule = getSelectedRule();
    const criteria = selectedRule.criteria;

    let cols = `<td><input type="text" class="form-control" required name="option${counter}"/></td>`;

    for (let i = 0; i < criteria.length; i++) {
        cols += `
            <td>
                <select name="${criteria[i]['criterion']}" class="form-control custom-select" onchange="calculateScore(this)">
                    <option value="0" selected disabled>?</option>
                    <option value="5">5</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                    <option value="1">1</option>
                </select>
                <span name="weighted_score">0</span>
            </td>
        `;

    }
    cols += '<td><span name="total">0</span></td>';
    cols += '<td><ion-icon name="trash-outline" size="large" class="delete-option btn btn-md btn-light" onclick="deleteRow(this)"></ion-icon></td>';

    newRow.innerHTML = cols;
    document.querySelector('#comparison-table tbody').appendChild(newRow)
    document.querySelector('#comparison-table tbody').lastChild.querySelector('[name*=option]').focus()
    counter += 1
}

async function saveComparison() {
    const rule = getSelectedRule();

    const options = []
    const rows = document.querySelectorAll('#comparison-table tbody tr')

    rows.forEach(row => {
        const option = {}
        option['option_name'] = row.querySelector('[name*="option"]').value
        option['scores'] = []

        for (let i = 0; i < rule.criteria.length; i++) {
            const result = {}
            const criterion = rule.criteria[i]

            result['criterion'] = criterion.criterion
            result['multiplier'] = criterion.multiplier
            result['score'] = parseInt(row.querySelectorAll('select')[i].value)
            result['weighted_score'] = parseInt(row.querySelectorAll('[name=weighted_score]')[i].innerText)
            option['scores'].push(result)
        }

        option['total'] = row.querySelector('[name=total]').innerText
        options.push(option)

    })

    const name = document.querySelector('#comparison_name').value;
    const highestScore = Math.max(...options.map(o => o.total))

    const data = { rule, name, options, "highest_score": highestScore }
    const response = await fetch(`/comparisons`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    )

    location.href = "/comparisons"
}

function calculateScore(target) {
    applyWeightedToCell(target.closest('td'))
    applyRowTotal(target.closest('tr'))
}

function applyWeightedToCell(cell) {
    const score = parseInt(cell.querySelector('select').value);
    const weight = parseInt(cell.closest('table').querySelectorAll('thead th')[cell.cellIndex].getAttribute('multiplier'));
    cell.querySelector('[name=weighted_score]').innerText = score * weight;

}

function applyRowTotal(row) {
    const weightedScores = [...row.querySelectorAll('[name=weighted_score]')].map(weightedScoreContainer => parseInt(weightedScoreContainer.innerText));
    const total = weightedScores.reduce((a, b) => a + b);
    row.querySelector('[name=total]').innerHTML = total

}

function deleteRow(target) {
    target.closest('tr').remove()
}

/* select latest rule when page loaded */
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("[name='rules']").selectedIndex = 0;
});
