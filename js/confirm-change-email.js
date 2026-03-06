const params = new URLSearchParams(window.location.search);
const token = params.get("token");

async function confirmNewEmail()
{
    try
    {
        const response = await fetch("http://localhost:8080/public/confirm-change-email?token=" + token,
            {
                method: "GET",
                headers: 
                {
                    "Content-Type": "application/json"
                }
            });
        if(!response.ok)
        {
            const error = document.querySelector("#verify-email-message-nok");
            const data = await response.json();
            error.textContent = data.message || "Something got wrong";
            error.style.display = "block";
            return;
        }

        const success = document.querySelector("#verify-email-message-ok");
        success.style.display = "block";
    }
    catch(Error)
    {
        const error = document.querySelector("#verify-email-message-nok");
        error.textContent = "Couldn't connect to server. Try again later.";
        error.style.display = "block";
    }
}

window.addEventListener("DOMContentLoaded", confirmNewEmail);