async function loadUserInfo() 
{
    const token = localStorage.getItem("jwt");

    if (!token) 
        {
        window.location.href = "index.html";
        return;
    }

    try 
    {
        const response = await fetch("http://localhost:8080/user/info", 
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
            window.location.href = "index.html";
            return;
        }

        const user = await response.json();
        const username = user.username;

        const usernameObject = document.querySelector("#edit-username-middle-container input");
        usernameObject.value = username || "Please login in first";

    } 
    catch (e) 
    {
        console.error("Error loading user", e);
    }
}
window.addEventListener("DOMContentLoaded", loadUserInfo);


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
    const saveButton = document.querySelector("#username-edit-save-button");
    saveButton.disabled = true;
    saveButton.textContent = "Loading...";

    const newusername = document.querySelector("#edit-username-new-username").value;

    try
    {
        const token = localStorage.getItem("jwt");

        if(!token)
        {
            window.location.href = "index.html";
            return;
        }

        if(!newusername)
        {
            const error = document.querySelector("#edit-username-message-nok");
            error.textContent = "Please complete new username field.";
            error.style.display = "block";

            return;
        }

        const response = await fetch("http://localhost:8080/user/change-username",
            {
                method: "PUT",
                headers: getAuthHeader(),
                body: JSON.stringify
                ({
                    newUsername: newusername,
                })
            });

        if(!response.ok)
        {
            const error = document.querySelector("#edit-username-message-nok");
            const data = await response.json();

            error.textContent = data.message || "Something got wrong";
            error.style.display = "block";

            return;
        }
        
        const success = document.querySelector("#edit-username-message-ok");
        success.textContent = "Your username has been changed successfully.";
        success.style.display = "block";
    }
    catch(Error)
    {
        const error = document.querySelector("#edit-username-message-nok");
        error.textContent = "Couldn't connect to server. Try again later.";
        error.style.display = "block";
    }
    finally
    {
        saveButton.textContent = "Save Changes";
        saveButton.disabled = false;
    }
}

function backOnClick()
{
    window.location.href = "/pages/user-profile/user-profile.html"
}