const usernameElement = document.querySelector("#dashboard-user-profile-container p");
const imageElement = document.querySelector("#dashboard-user-profile-container img");

usernameElement.addEventListener("click", userProfileOnClick);
imageElement.addEventListener("click", userProfileOnClick);

async function loadDashboardInfo() 
{
    const token = localStorage.getItem("jwt");

    if (!token) 
    {
        window.location.href = "/index.html";
        return;
    }

    try 
    {
        const response = await fetch("http://localhost:8080/dashboard", 
        {
            method: "GET",
            headers: 
            {
                "Authorization": "Bearer " + token
            }
        });

        if (!response.ok) 
        {
            localStorage.removeItem("jwt");
            window.location.href = "/index.html";
            return;
        }

        const informations = await response.json();

        updateUsername(informations);

        updateCards(informations);

        updateExpenseVsIncomeChart(informations);

        updateSavingsPerMonthPerMonthChart(informations);

        // updateRecentPaymentsAddedContainer(informations);

        // updateExpensesDistributionChart(informations);

    } 
    catch (e) 
    {
        console.error("Error loading user", e);
    }
}
window.addEventListener("DOMContentLoaded", loadDashboardInfo);

function updateUsername(informations)
{
    const userString = informations.username;
    const userArray = userString.split("");

    const userName = document.querySelector("#dashboard-user-profile-container p");

    if(userArray.length > 15)
    {
        userName.textContent = userString.slice(0, 15) + "...";
    }
    else
    {
        userName.textContent = userString;
    }
}

function updateCards(informations)
{
    const monthlyAverageIncomes = informations.monthlyAverageIncomes.average;
    const averageIncomesCard = document.querySelector("#card-one-value")
    averageIncomesCard.textContent = monthlyAverageIncomes;

    const monthlyAverageExpenses = informations.monthlyAverageExpenses.average;
    const averageExpensesCard = document.querySelector("#card-second-value")
    averageExpensesCard.textContent = monthlyAverageExpenses;

    const savingsThisMonth = informations.savingsThisMonth.savings;
    const savingsThisMonthCard = document.querySelector("#card-third-value")
    savingsThisMonthCard.textContent = savingsThisMonth;

    const budgetLeftThisMonth = informations.budgetLeftThisMonth;
    const budgetLeftCard = document.querySelector("#card-forth-value")
    budgetLeftCard.textContent = budgetLeftThisMonth.budgetLeft;
}

function addPaymentOnClick()
{
    window.location.href = "/pages/add-payment.html";
}

function userProfileOnClick()
{
    window.location.href = "/pages/user-profile/user-profile.html";
}

function paymentsOnClick()
{
    window.location.href = "/pages/payments.html";
}

function statisticsOnClick()
{
    window.location.href = "/pages/statistics.html";
}