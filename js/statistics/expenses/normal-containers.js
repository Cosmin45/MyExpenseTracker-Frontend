function updateNormalContainers(informations)
{
    updateHighestExpensesContainer(informations);

    updateRecurringPaymentsContainer(informations);
    
}

function updateHighestExpensesContainer(informations)
{
    const topHighestExpenses = informations.topHighestExpenses.slice(0, 5);

    const dateContainer = document.querySelector("#statistics-expenses-top-highest-expenses-container .date-container");
    const categoryContainer = document.querySelector("#statistics-expenses-top-highest-expenses-container .category-container");
    const valueContainer = document.querySelector("#statistics-expenses-top-highest-expenses-container .value-container");

    topHighestExpenses.forEach(expense =>
    {
        const date = document.createElement("p");
        date.textContent = expense.date;
        dateContainer.appendChild(date);

        const category = document.createElement("p");
        category.textContent = expense.category;
        categoryContainer.appendChild(category);

        const value = document.createElement("p");
        value.textContent = expense.amount;
        valueContainer.appendChild(value);
    });
}

function updateRecurringPaymentsContainer(informations)
{
    const recurringPaymentsContainer = informations.recurringPayments;

    const merchantContainer = document.querySelector("#statistics-expenses-recurring-payments-container .merchant-container");
    const categoryContainer = document.querySelector("#statistics-expenses-recurring-payments-container .category-container");
    const monthsCountContainer = document.querySelector("#statistics-expenses-recurring-payments-container .months-count-container");

    recurringPaymentsContainer.forEach(expense =>
    {
        const merchant = document.createElement("p");
        merchant.textContent = expense.merchant;
        merchantContainer.appendChild(merchant);

        const category = document.createElement("p");
        category.textContent = expense.category;
        categoryContainer.appendChild(category);

        const monthsCount = document.createElement("p");
        monthsCount.textContent = expense.monthsCount;
        monthsCountContainer.appendChild(monthsCount);
    });
}