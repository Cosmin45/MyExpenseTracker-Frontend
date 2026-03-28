const mfaButtons = document.querySelectorAll(".type-button");
const currentActiveButton = document.querySelector(".type-button.active");
mfaButtons.forEach(button => {
    button.addEventListener("click", () => {
        if(button.classList.contains("active"))
        {
            return;
        }

        mfaButtons.forEach(b => b.classList.remove("active"));
        button.classList.add("active");

        showIfRequiresMfa();
    });
});


function showIfRequiresMfa()
{
    const button = document.querySelector(".type-button.active");
    if(button.id.includes("mfa-on"))
    {
        console.log("ON!");
        changeMfaTo("enable");
    }
    else if(button.id.includes("mfa-off"))
    {
        console.log("OFF!");
        changeMfaTo("disable");
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

async function changeMfaTo(command)
{
    try
    {
        const token = localStorage.getItem("jwt");

        if(!token)
        {
            window.location.href = "/index.html";
            return;
        }

        const response = await fetch("http://localhost:8080/mfa/" + command,
            {
                method: "PUT",
                headers: getAuthHeader()
            });

        if(!response.ok)
        {
            mfaButtons.forEach(button => button.classList.remove("active"));
            currentActiveButton.classList.add("active")
            return;
        }
    }
    catch(Error)
    {
        console.log("Couldn't connect to server. Try again later.");
    }
}


function disableMfa()
{

}