function updateExpenseVsIncomeChart(informations)
{
    const lastElements = informations.totalExpensesPerMonth.slice(-6).reverse();
    const labels = [];
    const expenses = [];
    
    for(let i = lastElements.length - 1; i >= 0; i--)
    {
        labels.push(lastElements[i].month);
        expenses.push(lastElements[i].totalAmount);
    }

    const incomeVsExpenseCtx = document.querySelector(
        "#statistics-expenses-total-per-month-container canvas");
    new Chart(incomeVsExpenseCtx, 
        {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
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
                text: "Expenses by Month",
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

