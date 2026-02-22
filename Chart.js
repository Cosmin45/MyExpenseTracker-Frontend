<script>
const ctx = document.getElementById('financeChart');

new Chart(ctx, 
{
    type: 'bar',
    data: 
    {
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
        responsive: true,
        plugins: 
        {
            legend: 
            {
                position: 'top'
            }
        },
        scales: 
        {
            y: 
            {
                beginAtZero: true
            }
        }
    }
});
</script>