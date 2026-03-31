function updateExpensesDistributionChart(informations)
{
    const data = informations.topFiveMostExpenseCategories;
    const labels = [];
    const values = [];

    for(let i = 0; i < data.length; i++)
    {
        labels.push(data[i].category);
        values.push(data[i].totalAmount);
    }

    const expensesDistributionCtx = document.getElementById("expensesChart").getContext("2d");

    const expensesChart = new Chart(expensesDistributionCtx, 
        {
        type: "doughnut", // tipul donut
        data: {
            labels: labels,
            datasets: [{
                data: values, // valorile tale
                backgroundColor: [
                    "#f4b942", // galben
                    "#4e99cc", // albastru
                    "#8c63c2", // mov
                    "#f7665c", // roșu
                    "#4bb36f"  // verde
                ],
                borderWidth: 0
            }]
        },
        options: {
            cutout: "40%", // dimensiunea găurii (efectul de inel)
            radius: "100%",

            responsive: true,
            maintainAspectRatio: false,
            layout: 
            {
                padding: 10
            },

            plugins: {
                title: {
                display: true,
                text: "Top 5 Expense Categories",
                font: {
                    size: 20,
                    weight: "bold"
                },
                color: "#486ba3",
                padding: {
                    top: 10,
                    bottom: 20
                }
                },
                legend: {
                    position: "bottom",
                    labels: {
                        font: {
                            size: 16
                        },
                        boxWidth: 16,
                        color: "black"
                    }
                }
            }
        }
    });
}

