function clearAll()
{
    const loginError = document.querySelector("#login-error");

    loginError.innerHTML = "";
}

async function loginOnClick()
{
    clearAll();

    const loginButton = document.querySelector("#login-button");
    loginButton.disabled = true;
    loginButton.textContent = "Loading...";

    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    // if(username === "" || password === "")
    // {
    //     const error = document.querySelector("#login-error");
    //     error.textContent = "Empty fields!";
    //     error.style.display = "block";

    //     loginButton.textContent = "LOGIN";
    //     loginButton.disabled = false;

    //     return;
    // }

    try
    {
        const response = await fetch("http://localhost:8080/auth/login",
            {
                method: "POST",
                headers: 
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify
                ({
                    username: username,
                    password: password
                })
            });

        if(!response.ok)
        {
            const error = document.querySelector("#login-error");
            const data = await response.json();

            error.textContent = data.message || "Username or password incorrect";
            error.style.display = "block";

            return;
        }
        
        const data = await response.json();
        localStorage.setItem("jwt", data.token);

        window.location.href = "dashboard.html";
    }
    catch(Error)
    {
        const serverError = Error.message.json() || "Error...";

        const error = document.querySelector("#login-error");
        error.textContent = serverError;
        error.style.display = "block";
    }
    finally
    {
        loginButton.textContent = "LOGIN";
        loginButton.disabled = false;
    }
}