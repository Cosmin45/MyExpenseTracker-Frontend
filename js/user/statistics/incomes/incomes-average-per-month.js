function updateIncomesTotalPerMonthChart(informations)
{
    const lastElements = informations.averageIncomesPerMonth.slice(-6).reverse();
    const labels = [];
    const averages = [];
    
    for(let i = lastElements.length - 1; i >= 0; i--)
    {
        labels.push(lastElements[i].date);
        averages.push(lastElements[i].average);
    }
    
    const averagesCtx = document.querySelector(
        "#statistics-incomes-average-per-month-container canvas");
    new Chart(averagesCtx, 
        {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Average',
                    data: averages
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
                text: "Average by Month",
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

