const categoryImages = 
{
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

function updateRecentPaymentsAddedContainer(informations)
{
    const recentFiveExpenses = informations.recentFiveExpenses;

    for(let i = 0; i < recentFiveExpenses.length; i++)
    {
        addPaymentToRecentPaymentsContainer(recentFiveExpenses[i], i);
    }
}

function addPaymentToRecentPaymentsContainer(payment, position)
{
    const payments = document.querySelectorAll(".payments");
    const container = payments[position];

    const image = container.querySelector("img");
    const category = container.querySelector(".payment-category");
    const amount = container.querySelector(".payment-amount");
    
    image.src = assignLogoByCategory(payment.category);
    category.textContent = payment.category;
    if(payment.expenseType === "EXPENSE")
    {
        amount.textContent = "-" + payment.amount;
        amount.style.color = "red";
    }
    else
    {
        amount.textContent = "+" + payment.amount;
        amount.style.color = "green";
    }
}

function assignLogoByCategory(category)
{
    return categoryImages[category] || categoryImages[OTHER];
}