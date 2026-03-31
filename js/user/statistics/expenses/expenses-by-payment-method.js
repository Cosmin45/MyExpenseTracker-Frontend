function updateExpensesByPaymentMethodChart(informations)
{
    const data = informations.expensesByPaymentMethod;
    const labels = [];
    const values = [];

    for(let i = 0; i < data.length; i++)
    {
        labels.push(data[i].paymentMethod);
        values.push(data[i].amount);
    }

    const expensesDistributionCtx = document.querySelector("#statistics-expenses-by-payment-method-container canvas").getContext("2d");

    const expensesChart = new Chart(expensesDistributionCtx, 
        {
        type: "doughnut", // tipul donut
        data: {
            labels: labels,
            datasets: [{
                data: values, // valorile tale
                backgroundColor: [
                    "#f28e2b", // orange
                    "#e15759", // red
                    "#76b7b2", // teal
                    "#59a14f", // green
                    "#edc948", // yellow
                    "#b07aa1", // purple
                    "#ff9da7", // pink
                    "#9c755f", // brown
                    "#bab0ac", // gray
                    "#86bc86", // light green
                    "#6b9ac4", // light blue
                    "#f1a340", // amber
                    "#998ec3", // violet
                    "#66c2a5",  // mint
                    "#4e79a7" // blue
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
                text: "Expenses by Payment Method",
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
                    position: "bottom", // legenda în dreapta ca în imagine
                    labels: {
                        font: {
                            size: 16   // mărește textul
                        },
                        boxWidth: 16,
                        color: "black"
                    }
                }
            }
        }
    });
}

