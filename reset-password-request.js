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

    const resetButton = document.querySelector("#reset-password-request");
    resetButton.disabled = true;
    resetButton.textContent = "Loading...";

    const email = document.querySelector("#email").value;

    try
    {
        const response = await fetch("http://localhost:8080/auth/password-reset/request",
            {
                method: "POST",
                headers: 
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify
                ({
                    email: email,
                })
            });

        if(!response.ok)
        {
            const error = document.querySelector("#reset-password-request-nok");
            const data = await response.json();

            error.textContent = data.message || "Hmmm, inspect this...";
            error.style.display = "block";

            return;
        }
        
        const success = document.querySelector("#reset-password-request-ok");
        success.textContent = "If the email exists, a reset link was sent.";
        success.style.display = "block";
    }
    catch(Error)
    {
        const serverError = Error.message.json() || "Error...";

        const error = document.querySelector("#reset-password-request-nok");
        error.textContent = serverError.message;
        error.style.display = "block";
    }
    finally
    {
        resetButton.textContent = "RESET";
        resetButton.disabled = false;
    }
}