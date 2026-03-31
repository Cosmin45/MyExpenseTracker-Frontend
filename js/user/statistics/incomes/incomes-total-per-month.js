function updateIncomesAveragePerMonthChart(informations)
{
    const lastElements = informations.totalIncomesPerMonth.slice(-6).reverse();
    const labels = [];
    const incomes = [];
    
    for(let i = lastElements.length - 1; i >= 0; i--)
    {
        labels.push(lastElements[i].month);
        incomes.push(lastElements[i].totalAmount);
    }
    
    const incomesCtx = document.querySelector(
        "#statistics-incomes-total-per-month-container canvas");
    new Chart(incomesCtx, 
        {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Income',
                    data: incomes
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
                text: "Incomes by Month",
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

