function updateBudgetLeftProgressBarContainer(informations)
{
    const expenses = informations.budgetLeftThisMonthDTO.expenses;
    const budget = informations.budgetLeftThisMonthDTO.budget;

    const expensesPercentage = informations.budgetLeftThisMonthDTO
    .expensesPercentage;
    const budgetLeftPercentage = informations.budgetLeftThisMonthDTO
    .budgetLeftPercentage;

    const expensesElement = document.querySelector("#expenses-value");
    expensesElement.textContent = expenses;

    const budgetElement = document.querySelector("#budget-value");
    budgetElement.textContent = budget;

    const expensesPercentageContainer = document.querySelector("#expenses");
    expensesPercentageContainer.style.width = expensesPercentage + "%";

    const budgetLeftPercentageContainer = document.querySelector("#budget-left");
    budgetLeftPercentageContainer.style.width = budgetLeftPercentage + "%";

}