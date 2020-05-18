function highlightWinningRows() {
    let scores = Array.from(document.querySelectorAll('[data-test="total-score"]')).map(x => parseInt(x.textContent));
    let maxScore = Math.max(...scores)

    let winningRows = Array.from(document.querySelectorAll('[data-test="total-score"]'))
        .filter(el => el.textContent == maxScore);

    winningRows.forEach(element => { element.closest("tr").classList.add("table-success") });
}

highlightWinningRows();
