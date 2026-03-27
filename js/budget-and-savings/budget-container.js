function updateBudgetContainer(informations)
{
    const budgetLimit = informations.budgetLeftThisMonthDTO.budget;
    const budgetSpent = informations.budgetLeftThisMonthDTO.expenses;
    const budgetRemaining = informations.budgetLeftThisMonthDTO.budgetLeft;

    const budgetSpentPercentage = informations.budgetLeftThisMonthDTO.expensesPercentage;
    const budgetRemainingPercentage = informations.budgetLeftThisMonthDTO.budgetLeftPercentage;

    const budgetLimitElement = document.querySelector("#budget-limit");
    budgetLimitElement.textContent = budgetLimit;
    const budgetSpentElement = document.querySelector("#budget-spent");
    budgetSpentElement.textContent = budgetSpent;
    const budgetRemainingElement = document.querySelector("#budget-remaining");
    budgetRemainingElement.textContent = budgetRemaining;

    const budgetSpentFillElement = document.querySelector("#budget-spent-fill");
    budgetSpentFillElement.style.width = budgetSpentPercentage + "%";
    const budgetLeftFillElement = document.querySelector("#budget-left-fill");
    budgetLeftFillElement.style.width = budgetRemainingPercentage + "%";

    if(budgetRemaining === 0)
    {
        budgetRemainingElement.style.color = "#ff7878";
    }
}