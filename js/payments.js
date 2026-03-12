function backOnClick()
{
    window.location.href = "/pages/dashboard.html";
}

function addPaymentOnClick()
{
    window.location.href = "/pages/add-payment.html";
}

async function loadAllPayments()
{
    const token = localStorage.getItem("jwt");

    if (!token) 
    {
        window.location.href = "/index.html";
        return;
    }

    try 
    {
        const response = await fetch("http://localhost:8080/payments", 
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
        console.log(informations);

        const informationsExpensesList = informations.expensesList;
        const container = document.getElementById("payments-container");
        container.innerHTML = "";

        informationsExpensesList.forEach(payment => 
        {
            createPaymentCard(payment);
        });

    } 
    catch (e) 
    {
        console.error("Error loading user", e);
    }
}
window.addEventListener("DOMContentLoaded", loadAllPayments);

function createPaymentCard(payment)
{
    const container = document.getElementById("payments-container");

    const card = document.createElement("div");
    card.className = "payment-card-container";

    card.innerHTML = `
        <div class="payments-edit-and-delete-container">
            <button class="payment-card-edit-button""></button>
            <button class="payment-card-delete-button" onclick="deleteOnClick(${payment.id}, this)"></button>
        </div>

        <div class="payment-informations-container">
            <div class="payment-card-top-section-container">
                <div class="payment-card-time-and-category-container">
                    <p class="payment-card-time">${payment.date}</p>
                    <p class="payment-card-category">${payment.category}</p>
                </div>

                <p class="payment-card-value">${payment.amount}</p>
            </div>

            <div class="payment-card-bottom-section-container">
                <p class="payment-card-marchant">${payment.merchant}</p>
                <p class="payment-card-payment-method">${payment.paymentMethod}</p>
            </div>
        </div>
    `;

    container.appendChild(card);

    const amount = card.querySelector(".payment-card-value");

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

async function deleteOnClick(paymentId, button)
{
    const token = localStorage.getItem("jwt");

    if (!token) 
    {
        window.location.href = "/index.html";
        return;
    }

    try 
    {
        const response = await fetch("http://localhost:8080/expenses/" + paymentId, 
        {
            method: "DELETE",
            headers: 
            {
                "Authorization": "Bearer " + token
            }
        });

        if (response.status !== 204) 
        {
            alert("Could not delete expense");
            return;
        }

        const card = button.closest(".payment-card-container");
        card.remove();

    } 
    catch (e) 
    {
        console.error("Error deleting expense", e);
    }
}


// async function filterPaymentsBytype(type)
// {
//     const token = localStorage.getItem("jwt");

//     if (!token) 
//     {
//         window.location.href = "/index.html";
//         return;
//     }

//     try 
//     {
//         const response = await fetch("http://localhost:8080/expenses/type/" + type, 
//         {
//             method: "GET",
//             headers: 
//             {
//                 "Authorization": "Bearer " + token
//             }
//         });

//         if (!response.ok) 
//         {
//             localStorage.removeItem("jwt");
//             window.location.href = "/index.html";
//             return;
//         }

//         const informations = await response.json();
//         const container = document.getElementById("payments-container");
//         container.innerHTML = "";

//         informations.forEach(payment => 
//         {
//             createPaymentCard(payment);
//         });
//     } 
//     catch (e) 
//     {
//         console.error("Error loading user", e);
//     }
// }


const typeSelect = document.getElementById("payment-type-select");
const categorySelect = document.getElementById("payment-category-select");
const timeSelect = document.getElementById("payment-time-select");

typeSelect.addEventListener("change", applyFilters);
categorySelect.addEventListener("change", applyFilters);
timeSelect.addEventListener("change", applyFilters);

async function applyFilters()
{
    const token = localStorage.getItem("jwt");

    if(!token)
    {
        window.location.href = "/index.html";
        return
    }

    const type = typeSelect.value;
    const category = categorySelect.value;
    const time = timeSelect.value;

    const params = new URLSearchParams();
    if(type !== "All") params.append("type", type);
    if(category !== "All") params.append("category", category);
    if(time !== "All") params.append("time", time);

    try 
    {
        const response = await fetch("http://localhost:8080/expenses/filter?" + params.toString(), 
        {
            method: "GET",
            headers: 
            {
                "Authorization": "Bearer " + token
            }
        });

        if (!response.ok) 
        {
            // localStorage.removeItem("jwt");
            // window.location.href = "/index.html";
            return;
        }

        const informations = await response.json();
        const container = document.getElementById("payments-container");
        container.innerHTML = "";

        informations.forEach(payment => 
        {
            createPaymentCard(payment);
        });
    } 
    catch (e) 
    {
        console.error("Error loading user", e);
    }
}