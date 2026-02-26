function clearAll()
{
    const resetError = document.querySelectorAll(".message");

    resetError.forEach(element => {
        element.style.display = "none";
        element.innerHTML = "";
    });
}

async function signupOnClick()
{
    clearAll();

    const resetButton = document.querySelector("#signup");
    resetButton.disabled = true;
    resetButton.textContent = "Loading...";

    const email = document.querySelector("#signup-email").value;
    const fullname = document.querySelector("#signup-fullname").value;
    const username = document.querySelector("#signup-username").value;
    const password = document.querySelector("#signup-password").value;


    try
    {
        const response = await fetch("http://localhost:8080/auth/signup",
            {
                method: "POST",
                headers: 
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify
                ({
                    email: email,
                    fullName: fullname,
                    username: username,
                    password: password
                })
            });

        if(!response.ok)
        {
            const error = document.querySelector("#signup-nok");
            const data = await response.json();

            error.textContent = data.message || "Something got wrong";
            error.style.display = "block";

            return;
        }
        
        const mainContainer = document.querySelector("#signup-container");
        const successContainer = document.querySelector("#signup-success");
        const success = document.querySelector("#signup-ok");

        mainContainer.style.display = "none";
        successContainer.style.display = "flex";

        success.textContent = "Account succesfully created. Please verify your email before log in.";
        success.style.display = "block";
    }
    catch(Error)
    {
        const serverError = Error.message.json() || "Error...";

        const error = document.querySelector("#signup-nok");
        error.textContent = serverError.message;
        error.style.display = "block";
    }
    finally
    {
        resetButton.textContent = "SIGNUP";
        resetButton.disabled = false;
    }
}