const params = new URLSearchParams(window.location.search);
const token = params.get("token");

function clearAll()
{
    const resetError = document.querySelectorAll(".message");

    resetError.forEach(element => {
        element.style.display = "none";
        element.innerHTML = "";
    });
}

async function resetOnClick()
{
    clearAll();

    const resetButton = document.querySelector("#reset-password-confirm");
    resetButton.disabled = true;
    resetButton.textContent = "Loading...";

    const newPassword = document.querySelector("#reset-password-new-password").value;
    const confirmPassword = document.querySelector("#reset-password-confirm-password").value;

    try
    {
        const response = await fetch("http://localhost:8080/auth/password-reset/confirm",
            {
                method: "POST",
                headers: 
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify
                ({
                    token: token,
                    newPassword: newPassword,
                    confirmPassword: confirmPassword
                })
            });

        if(!response.ok)
        {
            const error = document.querySelector("#reset-password-confirm-nok");
            const data = await response.json();

            error.textContent = data.message || "Something got wrong";
            error.style.display = "block";

            return;
        }
        
        const mainContainer = document.querySelector("#reset-password-confirm-container");
        const success = document.querySelector("#reset-password-confirm-ok");

        mainContainer.style.display = "none";

        success.textContent = "Password reset successfully. You can close this window.";
        success.style.display = "block";
    }
    catch(Error)
    {
        const serverError = Error.message.json() || "Error...";

        const error = document.querySelector("#reset-password-confirm-nok");
        error.textContent = serverError.message;
        error.style.display = "block";
    }
    finally
    {
        resetButton.textContent = "RESET";
        resetButton.disabled = false;
    }
}