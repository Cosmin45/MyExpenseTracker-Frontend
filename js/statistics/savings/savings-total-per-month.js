function updateSavingsPerMonthPerMonthChart(informations)
{
    const lastElements = informations.savingsPerMonth.slice(-6).reverse();
    const labels = [];
    const savings = [];

    for(let i = lastElements.length - 1; i >= 0; i--)
    {
        labels.push(lastElements[i].month);
        savings.push(lastElements[i].savings);
    }
    
    const savingsCtx = document.querySelector(
        "#statistics-savings-total-per-month-container canvas").getContext("2d");
    new Chart(savingsCtx, 
        {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Saving',
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
                text: "Savings by Month",
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

