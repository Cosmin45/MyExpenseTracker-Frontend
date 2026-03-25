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
    
    const containers = document.querySelectorAll(
        ".savings-by-month-container canvas");

    console.log(containers);

    containers.forEach(container => 
    {
        new Chart(container, 
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
            }
        }
    });
    });
    
}

