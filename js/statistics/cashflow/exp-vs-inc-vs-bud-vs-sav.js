function updateExpVsIncVsBudVsSavChart(informations)
{
    const lastElements = informations.expVsIncVsBudVsSav.slice(-6).reverse();
    const labels = [];
    const expenses = [];
    const incomes = [];
    const budget = [];
    const savings = [];
    
    for(let i = lastElements.length - 1; i >= 0; i--)
    {
        labels.push(lastElements[i].date);
        expenses.push(lastElements[i].expenses);
        incomes.push(lastElements[i].incomes);
        budget.push(lastElements[i].budget);
        savings.push(lastElements[i].savings);
    }
    
    const incomeVsExpenseCtx = document.querySelector("#statistics-cashflow-exp-vs-inc-vs-bud-vs-sav-container canvas").getContext("2d");
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
                },
                {
                    label: 'Budget',
                    data: budget
                },
                {
                    label: 'Savings',
                    data: savings
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
                text: "Incomes | Expenses | Budget | Savings",
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

