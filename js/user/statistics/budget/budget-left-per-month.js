function updateBudgetLeftPerMonthChart(informations)
{
    const lastElements = informations.budgetsLeftByMonth.slice(-6).reverse();
    const labels = [];
    const budgets = [];
    
    for(let i = lastElements.length - 1; i >= 0; i--)
    {
        labels.push(lastElements[i].date);
        budgets.push(lastElements[i].budgetLeft);
    }
    
    const budgetCtx = document.querySelector(
        "#statistics-budget-left-per-month-container canvas");
    new Chart(budgetCtx, 
        {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Budget',
                    data: budgets
                }
            ]
        },
        options: 
        {
            responsive: true,
            maintainAspectRatio: false,

            layout: 
            {
                padding: 10
            },

            plugins: {
                title: {
                display: true,
                text: "Budget Left by Month",
                font: {
                    size: 20,
                    weight: "bold"
                },
                color: "#486ba3",
                padding: {
                    top: 10,
                    bottom: 20
                }
                }
            }
        }
    });
}

