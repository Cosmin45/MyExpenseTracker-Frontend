function addPaymentOnClick()
{
    window.location.href = "/pages/user/payments/add-payment.html";
}

function editPaymentOnClick(id)
{
    window.location.href = "/pages/user/payments/edit-payment.html?id=" + id;
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
            <button class="payment-card-edit-button" onclick="editPaymentOnClick(${payment.id})"></button>
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

            <div class="payment-card-middle-section-container">
                <p class="payment-card-marchant">${payment.merchant}</p>
                <p class="payment-card-payment-method">${payment.paymentMethod}</p>
            </div>

            <p class="payment-card-bottom-note">
                <span>Note: </span>
                ${payment.note}
            </p>

        </div>
    `;

    container.appendChild(card);

    const amount = card.querySelector(".payment-card-value");

    if(payment.expenseType === "EXPENSE")
    {
        amount.textContent = "-" + payment.amount;
        amount.style.color = "#ff7878";
    }
    else
    {
        amount.textContent = "+" + payment.amount;
        amount.style.color = "#4bb36f";
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

const typeSelect = document.getElementById("payment-type-select");
const categorySelect = document.getElementById("payment-category-select");
const timeSelect = document.getElementById("payment-time-select");
const sortBySelect = document.getElementById("payments-sort-by-select");

typeSelect.addEventListener("change", applyFilters);
categorySelect.addEventListener("change", applyFilters);
timeSelect.addEventListener("change", applyFilters);
sortBySelect.addEventListener("change", applyFilters);

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
    const sortBy = sortBySelect.value;

    const params = new URLSearchParams();
    if(type !== "All") params.append("type", type);
    if(category !== "All") params.append("category", category);
    if(time !== "All") params.append("time", time);
    if(sortBy !== "date-desc") params.append("sortBy", sortBy);

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