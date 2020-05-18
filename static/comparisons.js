function viewComparison(comparison_id) {
    location.href = `/comparisons/${comparison_id}`
}

function deleteComparisonFromDatabase(comparison_id) {
    fetch(`/comparisons/${comparison_id}`, { method: 'delete' })
}

function deleteComparison(event) {
    {
        const row = event.closest("tr")
        deleteComparisonFromDatabase(row.id)
        row.remove()
    }
}