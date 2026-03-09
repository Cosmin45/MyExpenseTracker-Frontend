const categoryImages = {
    FOOD: "/images/categories-images/food.png",
    TRANSPORT: "/images/categories-images/transport.png",
    ENTERTAINMENT: "/images/categories-images/entertainment.png",
    BILLS: "/images/categories-images/bill.png",
    HEALTH: "/images/categories-images/health.png",
    SHOPPING: "/images/categories-images/shopping.png",
    SALARY: "/images/categories-images/salary.png",
    FREELANCE: "/images/categories-images/freelance.png",
    GROCERIES: "/images/categories-images/groceries.png",
    UTILITIES: "/images/categories-images/utilities.png",
    DINING_OUT: "/images/categories-images/dining-out.png",
    CLOTHING: "/images/categories-images/clothing.png",
    TRANSFER: "/images/categories-images/transfer.png",
    OTHER: "/images/categories-images/other.png"
};

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

    } 
    catch (e) 
    {
        console.error("Error loading user", e);
    }
}
window.addEventListener("DOMContentLoaded", loadDashboardInfo);

function addPaymentToRecentPaymentsContainer(payment, position)
{
    const payments = document.querySelectorAll(".payments");
    const container = payments[position];

    const image = container.querySelector("img");
    const category = container.querySelector(".payment-category");
    const amount = container.querySelector(".payment-amount");
    
    image.src = assignLogoByCategory(payment.category);
    category.textContent = payment.category;
    amount.textContent = payment.amount;
}

function assignLogoByCategory(category)
{
    return categoryImages[category] || categoryImages[OTHER];
}

function updateUsername(informations)
{
    const userString = informations.username;
    const userArray = userString.split("");

    const userName = document.querySelector("#user-profile-button");

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
    const monthlyAverageIncomes = informations.monthlyAverageIncomes;
    const averageIncomesCard = document.querySelector("#monthly-average-incomes .card-sum")
    averageIncomesCard.textContent = monthlyAverageIncomes;

    const monthlyAverageExpenses = informations.monthlyAverageExpenses;
    const averageExpensesCard = document.querySelector("#monthly-average-expenses .card-sum")
    averageExpensesCard.textContent = monthlyAverageExpenses;

    const savingsThisMonth = informations.savingsThisMonth;
    const savingsThisMonthCard = document.querySelector("#savings-this-month .card-sum")
    savingsThisMonthCard.textContent = savingsThisMonth;

    const budgetLeftThisMonth = informations.budgetLeftThisMonth;
    const budgetLeftCard = document.querySelector("#budget-left-this-month .card-sum")
    budgetLeftCard.textContent = budgetLeftThisMonth;

    const recentFiveExpenses = informations.recentFiveExpenses;

    for(let i = 0; i < recentFiveExpenses.length; i++)
    {
        addPaymentToRecentPaymentsContainer(recentFiveExpenses[i], i);
    }
}

function addPaymentOnClick()
{
    window.location.href = "/pages/add-payment.html";
}

function userProfileOnClick()
{
    window.location.href = "/pages/user-profile/user-profile.html";
}