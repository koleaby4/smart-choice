/* Java Script for rule_details.html*/

let counter = 0
function deleteRow(target) {
    $(target).closest("tr").remove();
}

function loadCriteria(criteria) {
    criteria.forEach(criteria => {
        document.getElementById("addrow").click();

        let nameInputs = document.querySelectorAll('input[name*=name]')
        nameInputs[nameInputs.length - 1].value = criteria.criterion;

        let weightSelects = document.querySelectorAll('select[name*=multiplier]')
        weightSelects[weightSelects.length - 1].value = criteria.multiplier;

        let noteInputs = document.querySelectorAll('input[name*=note]')
        noteInputs[noteInputs.length - 1].value = criteria.note;
    })
}

/* insert new row into criteria_table */
function insertRow() {
    // ToDo: consider refactoring using JS createElement and appendChild
    let newRow = document.createElement("tr");
    let cols = `<td><input type="text" class="form-control" required name="name${counter}"/></td>`;
    counter += 1
    cols += `
    <td>
        <select name="multiplier${counter}" class="custom-select" class="form-control col-sm-4">
                    <option value="5" selected>5</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                    <option value="1">1</option>
                    </select>
                    </td>
                    `;
                    cols += `<td><input type="text" class="form-control" name="note${counter}"/></td>`;

                    cols += '<td><ion-icon name="trash-outline" onclick="deleteRow(this)" size="large" class="delete-row btn btn-md btn-light" ></ion-icon></td>';

                    newRow.innerHTML = cols;
                    document.querySelector('#criteria_table tbody').appendChild(newRow)
                    document.querySelector('#criteria_table tbody').lastChild.querySelector('[name*=name]').focus()
}