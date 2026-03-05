function cancelOnClick()
{
    window.location.href = "/pages/user-profile/user-profile.html"
}

function clearAll()
{
    const message = document.querySelector("#delete-account-message-nok");

    message.innerHTML = "";
}

async function deleteOnClick()
{
    clearAll();

    const password = document.querySelector("#delete-account-password").value;

    if(!password)
    {
        const error = document.querySelector("#delete-account-message-nok");
        error.textContent = "Please complete password field.";
        error.style.display = "block";

        return;
    }

    const deleteButton = document.querySelector("#delete-account-delete-button");
    deleteButton.disabled = true;
    deleteButton.textContent = "Loading...";

    try
    {
        const token = localStorage.getItem("jwt");

        if (!token) 
        {
            window.location.href = "/index.html";
            return;
        }

        const response = await fetch("http://localhost:8080/user/delete-account",
            {
                method: "DELETE",
                headers: 
                {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify
                ({
                    password: password
                })
            });

        if(response.status !== 204)
        {
            const error = document.querySelector("#delete-account-message-nok");
            error.textContent = "Incorrect password";
            error.style.display = "block";

            return;
        }
        
        localStorage.removeItem("jwt");

        window.location.href = "/index.html";
    }
    catch(Error)
    {
        const error = document.querySelector("#delete-account-message-nok");
        error.textContent = "Couldn't connect to server. Try again later.";
        error.style.display = "block";
    }
    finally
    {
        deleteButton.textContent = "DELETE";
        deleteButton.disabled = false;
    }
}
