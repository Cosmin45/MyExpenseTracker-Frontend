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

    const saveButton = document.querySelector("#password-edit-save-button");
    saveButton.disabled = true;
    saveButton.textContent = "Loading...";

    const currentpassword = document.querySelector("#edit-password-current-password").value;
    const newpassword = document.querySelector("#edit-password-new-password").value;
    const confirmpassword = document.querySelector("#edit-password-confirm-password").value;

    try
    {
        const token = localStorage.getItem("jwt");

        if(!token)
        {
            window.location.href = "/index.html";
            return;
        }

        if(!(currentpassword || newpassword || confirmpassword))
        {
            const error = document.querySelector("#edit-password-message-nok");
            error.textContent = "Please complete all fields.";
            error.style.display = "block";

            return;
        }

        const response = await fetch("http://localhost:8080/user/change-password",
            {
                method: "PUT",
                headers: getAuthHeader(),
                body: JSON.stringify
                ({
                    currentPassword: currentpassword,
                    newPassword: newpassword,
                    confirmPassword: confirmpassword
                })
            });

        if(!response.ok)
        {
            const error = document.querySelector("#edit-password-message-nok");
            const data = await response.json();

            error.textContent = data.message || "Something got wrong";
            error.style.display = "block";

            return;
        }
        
        const success = document.querySelector("#edit-password-message-ok");
        success.textContent = "Your password has been changed successfully.";
        success.style.display = "block";
    }
    catch(Error)
    {
        const error = document.querySelector("#edit-password-message-nok");
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