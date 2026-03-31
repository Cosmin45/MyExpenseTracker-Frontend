const alertButtons = document.querySelectorAll("#alert-on-off-buttons-container .type-button");
const currentActiveAlertsButton = document.querySelector("#alert-on-off-buttons-container .type-button.active");
alertButtons.forEach(button => {
    button.addEventListener("click", () => {
        if(button.classList.contains("active"))
        {
            return;
        }

        alertButtons.forEach(b => b.classList.remove("active"));
        button.classList.add("active");

        showIfAllowsAlerts();
    });
});


function showIfAllowsAlerts()
{
    const button = document.querySelector("#alert-on-off-buttons-container .type-button.active");
    if(button.id.includes("alert-on"))
    {
        changeAlertsTo("enable");
    }
    else if(button.id.includes("alert-off"))
    {
        changeAlertsTo("disable");
    }
    else
    {
        alert("None on existing buttons active");
    }
}

function getAuthHeader()
{
    const token = localStorage.getItem("jwt");

    return{
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    };
}

async function changeAlertsTo(command)
{
    try
    {
        const token = localStorage.getItem("jwt");

        if(!token)
        {
            window.location.href = "/index.html";
            return;
        }

        const response = await fetch("http://localhost:8080/alerts/" + command,
            {
                method: "PUT",
                headers: getAuthHeader()
            });

        if(!response.ok)
        {
            alertButtons.forEach(button => button.classList.remove("active"));
            currentActiveAlertsButton.classList.add("active")
            return;
        }
    }
    catch(Error)
    {
        console.log("Couldn't connect to server. Try again later.");
    }
}