const params = new URLSearchParams(window.location.search);
const paymentId = params.get("id");

const paymentTypeButtons = document.querySelectorAll(".type-button");
paymentTypeButtons.forEach(button =>
{
    button.addEventListener("click", ()=>
    {
        paymentTypeButtons.forEach(b=>b.classList.remove("active"));

        button.classList.add("active");
    })
})

function clearAll()
{
    const paymentError = document.querySelectorAll(".message");

    paymentError.forEach(element => {
        element.style.display = "none";
        element.innerHTML = "";
    });
}

function getAuthHeader()
{
    const token = localStorage.getItem("jwt");

    return{
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    };
}

async function editPaymentOnClick()
{
    clearAll();

    const addPaymentButton = document.querySelector("#add-payment-button");
    addPaymentButton.disabled = true;
    addPaymentButton.textContent = "Loading...";

    const type = document.querySelector(".type-button.active")
                    .id.includes("income") ? "INCOME" : "EXPENSE";
    const date = document.querySelector("#date-property").value;
    const amount = document.querySelector("#amount-property").value;
    const category = document.querySelector("#category-property").value;
    const paymentMethod = document.querySelector("#payment-method-property").value;
    const merchant = document.querySelector("#merchant-property").value;
    const note = document.querySelector("#note-property").value;

    try
    {
        const token = localStorage.getItem("jwt");
        if(!token)
        {
            window.location.href = "/index.html";
            return;
        }

        if(!(type && date && amount && category && paymentMethod))
        {
            const error = document.querySelector("#add-payment-nok");
            error.textContent = "Please complete the mandatory fields.";
            error.style.display = "block";

            return;
        }

        const response = await fetch("http://localhost:8080/expenses/" + paymentId,
            {
                method: "PUT",
                headers: getAuthHeader(),
                body: JSON.stringify
                ({
                    expenseType: type,
                    date: date,
                    amount: amount,
                    category: category,
                    paymentMethod: paymentMethod,
                    merchant: merchant,
                    note: note
                })
            });

        if(!response.ok)
        {
            const error = document.querySelector("#add-payment-nok");
            const data = await response.json();

            error.textContent = data.message || "Something got wrong";
            error.style.display = "block";

            return;
        }
        
        const success = document.querySelector("#add-payment-ok");
        success.textContent = "Payment successfuly edited";
        success.style.display = "block";
    }
    catch(Error)
    {
        const error = document.querySelector("#add-payment-nok");
        error.textContent = "Couldn't connect to server. Try again later.";
        error.style.display = "block";
    }
    finally
    {
        addPaymentButton.textContent = "Edit Payment";
        addPaymentButton.disabled = false;
    }
}

function cancelNewPayment()
{
    window.location.href = "/pages/dashboard-v2.html";
}

async function loadPaymentProperties()
{
    clearAll();

    const addPaymentButton = document.querySelector("#add-payment-button");
    addPaymentButton.disabled = true;
    addPaymentButton.textContent = "Loading...";

    try
    {
        const token = localStorage.getItem("jwt");
        if(!token)
        {
            window.location.href = "/index.html";
            return;
        }

        const response = await fetch("http://localhost:8080/expenses/" + paymentId,
            {
                method: "GET",
                headers: getAuthHeader()
            });

        if(!response.ok)
        {
            const error = document.querySelector("#add-payment-nok");
            const data = await response.json();

            error.textContent = data.message || "Something got wrong";
            error.style.display = "block";

            return;
        }

        const payment = await response.json();

        const typeButtons = document.querySelectorAll(".type-button");
        const date = document.querySelector("#date-property");
        const amount = document.querySelector("#amount-property");
        const category = document.querySelector("#category-property");
        const paymentMethod = document.querySelector("#payment-method-property");
        const merchant = document.querySelector("#merchant-property");
        const note = document.querySelector("#note-property");

        typeButtons.forEach(b => b.classList.remove("active"));
        if(payment.expenseType === "INCOME")
        {
            document.getElementById("payment-type-income").classList.add("active");
        }
        else if(payment.expenseType === "EXPENSE")
        {
            document.getElementById("payment-type-expense").classList.add("active");
        }
        date.value = payment.date;
        amount.value = payment.amount;
        category.value = payment.category;
        paymentMethod.value = payment.paymentMethod;
        merchant.value = payment.merchant;
        note.value = payment.note;
    }
    catch(Error)
    {
        const error = document.querySelector("#add-payment-nok");
        error.textContent = "Couldn't connect to server. Try again later.";
        error.style.display = "block";
    }
    finally
    {
        addPaymentButton.textContent = "Edit Payment";
        addPaymentButton.disabled = false;
    }
}
window.addEventListener("DOMContentLoaded", loadPaymentProperties);