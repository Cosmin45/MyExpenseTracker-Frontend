async function loadUserSavingGoal() 
{
    const token = localStorage.getItem("jwt");

    if (!token) 
        {
        window.location.href = "/index.html";
        return;
    }

    try 
    {
        const response = await fetch("http://localhost:8080/savings/goal", 
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
        const savingsGoal = user.goal;

        const currentSavingsObject = document.querySelector("#change-savings-goal-middle-container input");
        currentSavingsObject.value = savingsGoal || "Please login in first";

    } 
    catch (e) 
    {
        console.error("Error loading user info", e);
    }
}
window.addEventListener("DOMContentLoaded", loadUserSavingGoal);


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
    const saveButton = document.querySelector("#change-savings-goal-save-button");
    saveButton.disabled = true;
    saveButton.textContent = "Loading...";

    const newSavingsGoal = document.querySelector("#change-savings-goal-new-savings-goal").value;

    try
    {
        const token = localStorage.getItem("jwt");

        if(!token)
        {
            window.location.href = "/index.html";
            return;
        }

        if(!newSavingsGoal)
        {
            const error = document.querySelector("#change-savings-goal-message-nok");
            error.textContent = "Please complete new savings goal field.";
            error.style.display = "block";

            return;
        }
        
        if(!isNumber(newSavingsGoal))
        {
            const error = document.querySelector("#change-savings-goal-message-nok");
            error.textContent = "Invalid savings goal format.";
            error.style.display = "block";

            return;
        }

        const response = await fetch("http://localhost:8080/savings/goal",
            {
                method: "PUT",
                headers: getAuthHeader(),
                body: JSON.stringify
                ({
                    newSavingsGoal: newSavingsGoal,
                })
            });

        if(!response.ok)
        {
            const error = document.querySelector("#change-savings-goal-message-nok");
            const data = await response.json();

            error.textContent = data.message || "Something got wrong";
            error.style.display = "block";

            return;
        }
        
        const success = document.querySelector("#change-savings-goal-message-ok");
        success.textContent = "Your savings goal has been changed successfully.";
        success.style.display = "block";

        const currentSavingsGoal = document.querySelector("#change-savings-goal-current-savings-goal");
        currentSavingsGoal.value = newSavingsGoal;
    }
    catch(Error)
    {
        const error = document.querySelector("#change-savings-goal-message-nok");
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