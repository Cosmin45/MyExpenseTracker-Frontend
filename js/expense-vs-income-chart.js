function updateExpenseVsIncomeChart(informations)
{
    const lastElements = informations.expenseVsIncomeList.slice(-6).reverse();
    const labels = [];
    const expenses = [];
    const incomes = [];
    
    for(let i = lastElements.length - 1; i >= 0; i--)
    {
        labels.push(lastElements[i].date);
        expenses.push(lastElements[i].totalExpensesAmount);
        incomes.push(lastElements[i].totalIncomesAmount);
    }

    const incomeVsExpenseCtx = document.getElementById('expense-vs-income-chart');
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
            cutout: "40%", // dimensiunea găurii (efectul de inel)
            radius: "95%",
            
            responsive: true,
            maintainAspectRatio: false,

            layout: 
            {
                padding: 10
            },
            plugins: {
                title: {
                display: true,
                text: "Expenses & Incomes by Month",
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

