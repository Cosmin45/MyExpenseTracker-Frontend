function updateExpenseVsBudgetChart(informations)
{
    const lastElements = informations.expenseVsBudget.slice(-6).reverse();
    const labels = [];
    const expenses = [];
    const budget = [];
    
    for(let i = lastElements.length - 1; i >= 0; i--)
    {
        labels.push(lastElements[i].month);
        expenses.push(lastElements[i].expenses);
        budget.push(lastElements[i].budget);
    }
    
    const incomeVsExpenseCtx = document.querySelector("#statistics-cashflow-expenses-vs-budget-container canvas").getContext("2d");
    new Chart(incomeVsExpenseCtx, 
        {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Budget',
                    data: budget
                },
                {
                    label: 'Expenses',
                    data: expenses
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
                text: "Budget | Expenses",
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

