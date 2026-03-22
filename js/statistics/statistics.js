function backOnClick()
{
    window.location.href = "/pages/dashboard.html";
}


async function loadStatisticsInfo() 
{
    const token = localStorage.getItem("jwt");

    if (!token) 
    {
        window.location.href = "/index.html";
        return;
    }

    try 
    {
        const response = await fetch("http://localhost:8080/analytics/info", 
        {
            method: "GET",
            headers: 
            {
                "Authorization": "Bearer " + token
            }
        });

        if (!response.ok) 
        {
            return;
        }

        const informations = await response.json();

        // Expenses

        updateExpenseTotalPerMonthChart(informations);

        updateTopSpendingCategoriesChart(informations);

        updateExpensesByPaymentMethodChart(informations);

        updateExpensesAveragePerCategoryChart(informations);

        updateExpensesByMerchantChart(informations);

        updateExpensesMiniContainers(informations)

        updateNormalContainers(informations);


        // Incomes

        updateIncomesTotalPerMonthChart(informations);

        updateIncomesAveragePerMonthChart(informations);

        updateIncomesMiniContainers(informations);


        // Cashflow

        updateExpenseVsIncomeChart(informations);

        updateExpenseVsBudgetChart(informations);

        updateExpVsIncVsBudVsSavChart(informations);

        // Choose which container to show based on button "active" class

        showActiveInformationContainer();


    } 
    catch (e) 
    {
        console.error("Error loading user", e);
    }
}
window.addEventListener("DOMContentLoaded", loadStatisticsInfo);


const statisticsButtons = document.querySelectorAll(".type-button");
statisticsButtons.forEach(button => {
    button.addEventListener("click", () => {
        if(button.classList.contains("active"))
        {
            return;
        }

        statisticsButtons.forEach(b => b.classList.remove("active"));
        button.classList.add("active");

        showActiveInformationContainer();
    });
});


function showActiveInformationContainer()
{
    const informationContainers = document.querySelectorAll(".informations-container");
    informationContainers.forEach(container => container.classList.remove("active"));

    const button = document.querySelector(".type-button.active");
    if(button.id.includes("expenses"))
    {
        document.querySelector("#statistics-expenses-main-container").classList.add("active");
    }
    else if(button.id.includes("incomes"))
    {
        document.querySelector("#statistics-incomes-main-container").classList.add("active");
    }
    else if(button.id.includes("cashflow"))
    {
        document.querySelector("#statistics-cashflow-main-container").classList.add("active");
    }
    else
    {
        alert("None on existing buttons active");
    }
}


