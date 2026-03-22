function updateIncomesMiniContainers(informations)
{
    updateIncomesMonthComparisonContainer(informations);

    updateForecastNextMonthContainer(informations);

    updateTotalIncomesContainer(informations);

    updateAverageIncomesContainer(informations);

    updateHighestIncomeDayContainer(informations);
}

function updateIncomesMonthComparisonContainer(informations)
{
    const percentage = informations.incomesMonthComparisonDTO.percentage;

    const value = document.querySelector("#statistics-incomes-month-comparison-container p .value");
    const text = document.querySelector("#statistics-incomes-month-comparison-container p .text");

    if (percentage < 0)
    {
        value.textContent = Math.abs(percentage) + "% ";
        value.style.color = "red";
        value.style.fontWeight = "bold";

        text.textContent = "lower than previous month so far."
    }
    else if (percentage === 0)
    {
        text.textContent = "equal with previous month so far."
    }
    else
    {
        value.textContent = Math.abs(percentage) + "% ";
        value.style.color = "green";
        value.style.fontWeight = "bold";

        text.textContent = "higher than previous month so far."
    }
}

function updateForecastNextMonthContainer(informations)
{
    const forecast = informations.incomesForecastDTO.forecast;

    const spanElement = document.querySelector("#statistics-incomes-forecast-next-month-container span");
    spanElement.textContent = forecast;
}

function updateTotalIncomesContainer(informations)
{
    const total = informations.totalIncomes;

    const spanElement = document.querySelector("#statistics-incomes-total-container span");
    spanElement.textContent = total;
}

function updateAverageIncomesContainer(informations)
{
    const average = informations.averageIncomes;

    const spanElement = document.querySelector("#statistics-incomes-average-container span");
    spanElement.textContent = average;
}

function updateHighestIncomeDayContainer(informations)
{
    const highestIncomeDaySum = informations.highestIncomeDayDTO.sum;
    const highestIncomeDayDate = informations.highestIncomeDayDTO.date;

    const date = document.querySelector("#statistics-incomes-highest-income-date-container #date");
    const value = document.querySelector("#statistics-incomes-highest-income-date-container #value");

    date.textContent = highestIncomeDayDate;
    value.textContent = highestIncomeDaySum;
}