const params = new URLSearchParams(window.location.search);
const username = params.get("username");

function clearAll()
{
    const resetError = document.querySelectorAll(".message");

    resetError.forEach(element => {
        element.style.display = "none";
        element.innerHTML = "";
    });
}

async function mfaOnClick()
{
    clearAll();

    const loginButton = document.querySelector("#mfa-authentication");
    loginButton.disabled = true;
    loginButton.textContent = "Loading...";

    const code = document.querySelector("#mfa-code").value;
    try
    {
        const response = await fetch("http://localhost:8080/auth/mfa-verify",
            {
                method: "POST",
                headers: 
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify
                ({
                    username: username,
                    code: code
                })
            });

        if(!response.ok)
        {
            const error = document.querySelector("#mfa-nok");
            const data = await response.json();

            error.textContent = data.message || "Something got wrong";
            error.style.display = "block";

            return;
        }

        const data = await response.json();
        localStorage.setItem("jwt", data.token);

        window.location.href = "dashboard.html"
    }
    catch(Error)
    {
        const serverError = Error.message.json() || "Error...";

        const error = document.querySelector("#mfa-nok");
        error.textContent = serverError.message;
        error.style.display = "block";
    }
    finally
    {
        loginButton.textContent = "LOGIN";
        loginButton.disabled = false;
    }
}