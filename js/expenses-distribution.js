const expensesDistributionCtx = document.getElementById("expensesChart").getContext("2d");

const expensesChart = new Chart(expensesDistributionCtx, {
    type: "doughnut", // tipul donut
    data: {
        labels: [
            "Alimentație",
            "Utilități",
            "Transport",
            "Divertisment",
            "Altele"
        ],
        datasets: [{
            data: [350, 200, 150, 180, 120], // valorile tale
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