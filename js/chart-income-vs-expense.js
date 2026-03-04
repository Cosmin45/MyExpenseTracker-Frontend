const incomeVsExpenseCtx = document.getElementById('financeChart');
new Chart(incomeVsExpenseCtx, {
    type: 'bar',
    data: {
        labels: ['Ian', 'Feb', 'Mar', 'Apr'],
        datasets: [
            {
                label: 'Income',
                data: [4200, 3800, 4600, 4100]
            },
            {
                label: 'Expenses',
                data: [2800, 3000, 2600, 2900]
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
    }
});