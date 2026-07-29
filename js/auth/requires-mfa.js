const params = new URLSearchParams(window.location.search);
const username = params.get("username");
const role = localStorage.getItem("role");

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

        if(role === "USER")
        {
            window.location.href = "/pages/user/dashboard-user.html";
        }
        else if(role === "ADMIN")
        {
            window.location.href = "/pages/admin/dashboard-admin.html";
        }
        else
        {
            console.log("Role unknown");
        }
    }
    catch(Error)
    {
        const error = document.querySelector("#mfa-nok");
        error.textContent = "Couldn't connect to server. Try again later.";
        error.style.display = "block";
    }
    finally
    {
        loginButton.textContent = "LOGIN";
        loginButton.disabled = false;
    }
}