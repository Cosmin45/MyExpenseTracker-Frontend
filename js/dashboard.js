async function loadUserInfo() 
{
    const token = localStorage.getItem("jwt");

    if (!token) 
        {
        window.location.href = "/index.html";
        return;
    }

    try 
    {
        const response = await fetch("http://localhost:8080/user/info", 
        {
            method: "GET",
            headers: 
            {
                "Authorization": "Bearer " + token
            }
        });

        if (!response.ok) 
            {
            localStorage.removeItem("jwt");
            window.location.href = "//index.html";
            return;
        }

        const user = await response.json();
        const userString = user.username;
        const userArray = userString.split("");

        const userName = document.querySelector("#user-profile-button");
        if(userArray.length > 15)
        {
            userName.textContent = userString.slice(0, 15) + "...";
        }
        else
        {
            userName.textContent = user.username;
        }


    } 
    catch (e) 
    {
        console.error("Error loading user", e);
    }
}

window.addEventListener("DOMContentLoaded", loadUserInfo);


function addPaymentOnClick()
{
    window.location.href = "/pages/add-payment.html";
}

function userProfileOnClick()
{
    window.location.href = "/pages/user-profile/user-profile.html";
}