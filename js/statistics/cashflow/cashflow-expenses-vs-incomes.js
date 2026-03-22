function updateExpenseVsIncomeChart(informations)
{
    const lastElements = informations.expenseVsIncome.slice(-6).reverse();
    const labels = [];
    const expenses = [];
    const incomes = [];
    
    for(let i = lastElements.length - 1; i >= 0; i--)
    {
        labels.push(lastElements[i].date);
        expenses.push(lastElements[i].totalExpensesAmount);
        incomes.push(lastElements[i].totalIncomesAmount);
    }
    
    const incomeVsExpenseCtx = document.querySelector("#statistics-cashflow-expenses-vs-incomes-container canvas").getContext("2d");
    new Chart(incomeVsExpenseCtx, 
        {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Income',
                    data: incomes
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
                text: "Incomes | Expenses",
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

