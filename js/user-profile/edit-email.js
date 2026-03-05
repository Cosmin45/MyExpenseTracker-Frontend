async function loadUserInfo() 
{
    const token = localStorage.getItem("jwt");

    if (!token) 
        {
        window.location.href = "/index.html";
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
            window.location.href = "/index.html";
            return;
        }

        const user = await response.json();
        const email = user.email;

        const emailObject = document.querySelector("#edit-email-middle-container input");
        emailObject.value = email || "Please login in first";

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
    const saveButton = document.querySelector("#email-edit-save-button");
    saveButton.disabled = true;
    saveButton.textContent = "Loading...";

    const newEmail = document.querySelector("#edit-email-new-email").value;
    const confirmEmail = document.querySelector("#edit-email-confirm-email").value;

    try
    {
        const token = localStorage.getItem("jwt");

        if(!token)
        {
            window.location.href = "/index.html";
            return;
        }

        if(!(newEmail || confirmEmail))
        {
            const error = document.querySelector("#edit-email-message-nok");
            error.textContent = "Please complete all fields.";
            error.style.display = "block";

            return;
        }

        const response = await fetch("http://localhost:8080/user/change-email",
            {
                method: "PUT",
                headers: getAuthHeader(),
                body: JSON.stringify
                ({
                    newEmail: newEmail,
                    confirmEmail: confirmEmail
                })
            });

        if(!response.ok)
        {
            const error = document.querySelector("#edit-email-message-nok");
            const data = await response.json();

            error.textContent = data.message || "Something got wrong";
            error.style.display = "block";

            return;
        }
        
        const success = document.querySelector("#edit-email-message-ok");
        success.textContent = "Your email change request has been completed successfully.";
        success.style.display = "block";
    }
    catch(Error)
    {
        const error = document.querySelector("#edit-email-message-nok");
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