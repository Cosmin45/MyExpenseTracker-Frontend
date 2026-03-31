async function loadUserBudget() 
{
    const token = localStorage.getItem("jwt");

    if (!token) 
        {
        window.location.href = "/index.html";
        return;
    }

    try 
    {
        const response = await fetch("http://localhost:8080/budget", 
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

        const user = await response.json();
        const budget = user.budget;

        const budgetObject = document.querySelector("#change-budget-middle-container input");
        budgetObject.value = budget || "Please login in first";

    } 
    catch (e) 
    {
        console.error("Error loading user info", e);
    }
}
window.addEventListener("DOMContentLoaded", loadUserBudget);


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

async function saveChangesOnClick()
{
    clearAll();
    const saveButton = document.querySelector("#change-budget-save-button");
    saveButton.disabled = true;
    saveButton.textContent = "Loading...";

    const newBudget = document.querySelector("#change-budget-new-budget").value;

    try
    {
        const token = localStorage.getItem("jwt");

        if(!token)
        {
            window.location.href = "/index.html";
            return;
        }

        if(!newBudget)
        {
            const error = document.querySelector("#change-budget-message-nok");
            error.textContent = "Please complete new budget field.";
            error.style.display = "block";

            return;
        }
        
        if(!isNumber(newBudget))
        {
            const error = document.querySelector("#change-budget-message-nok");
            error.textContent = "Invalid budget format.";
            error.style.display = "block";

            return;
        }

        const response = await fetch("http://localhost:8080/budget",
            {
                method: "PUT",
                headers: getAuthHeader(),
                body: JSON.stringify
                ({
                    newBudget: newBudget,
                })
            });

        if(!response.ok)
        {
            const error = document.querySelector("#change-budget-message-nok");
            const data = await response.json();

            error.textContent = data.message || "Something got wrong";
            error.style.display = "block";

            return;
        }
        
        const success = document.querySelector("#change-budget-message-ok");
        success.textContent = "Your budget has been changed successfully.";
        success.style.display = "block";

        const currentBudget = document.querySelector("#change-budget-current-budget");
        currentBudget.value = newBudget;
    }
    catch(Error)
    {
        const error = document.querySelector("#change-budget-message-nok");
        error.textContent = "Couldn't connect to server. Try again later.";
        error.style.display = "block";
    }
    finally
    {
        saveButton.textContent = "Save";
        saveButton.disabled = false;
    }
}

function isNumber(value)
{
    return /^\d+(\.\d+)?$/.test(value.trim());
}

function backOnClick()
{
    window.location.href = "/pages/user/dashboard-user.html"
}