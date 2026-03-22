function updateMiniContainers(informations)
{
    updateExpensesMonthComparisonContainer(informations);

    updateHighestExpenseDayContainer(informations);

    updateForecastNextMonthContainer(informations);

    updateTotalExpensesContainer(informations);

    updateAverageExpensesContainer(informations);
}

function updateExpensesMonthComparisonContainer(informations)
{
    const percentage = informations.monthComparisonDTO.percentage;

    const value = document.querySelector("#statistics-expenses-month-comparison-container p .value");
    const text = document.querySelector("#statistics-expenses-month-comparison-container p .text");

    if (percentage < 0)
    {
        value.textContent = Math.abs(percentage) + "% ";
        value.style.color = "green";
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
        value.style.color = "red";
        value.style.fontWeight = "bold";

        text.textContent = "higher than previous month so far."
    }
}

function updateHighestExpenseDayContainer(informations)
{
    const highestExpenseDaySum = informations.highestExpenseDayDTO.sum;
    const highestExpenseDayDate = informations.highestExpenseDayDTO.date;

    const date = document.querySelector("#statistics-expenses-highest-expense-date-container #date");
    const value = document.querySelector("#statistics-expenses-highest-expense-date-container #value");

    date.textContent = highestExpenseDayDate;
    value.textContent = highestExpenseDaySum;
}

function updateForecastNextMonthContainer(informations)
{
    const forecast = informations.forecastDTO.forecast;

    const spanElement = document.querySelector("#statistics-expenses-forecast-next-month-container span");
    spanElement.textContent = forecast;
}

function updateTotalExpensesContainer(informations)
{
    const total = informations.totalExpenses;

    const spanElement = document.querySelector("#statistics-expenses-total-container span");
    spanElement.textContent = total;
}

function updateAverageExpensesContainer(informations)
{
    const average = informations.averageExpenses;

    const spanElement = document.querySelector("#statistics-expenses-average-container span");
    spanElement.textContent = average;
}

