const backContainer = document.querySelector("#top-bar-left-container");
const logoutContainer = document.querySelector("#top-bar-right-container");
const logoutAllButton = document.querySelector("#log-out-all-button");

backContainer.addEventListener("click", backOnClick);
logoutContainer.addEventListener("click", logout);
logoutAllButton.addEventListener("click", logoutAll);

async function logout()
{
    try
    {
        const token = localStorage.getItem("jwt");

        if(!token)
        {
            window.location.href = "/index.html";
            return;
        }

        const response = await fetch("http://localhost:8080/user/logout",
            {
                method: "POST",
                headers: getAuthHeader()
            });

        if(!response.ok)
        {
            return;
        }

        window.location.href = "/index.html";
    }
    catch(Error)
    {
    }
}

async function logoutAll()
{
    try
    {
        const token = localStorage.getItem("jwt");

        if(!token)
        {
            window.location.href = "/index.html";
            return;
        }

        const response = await fetch("http://localhost:8080/user/logout-all",
            {
                method: "POST",
                headers: getAuthHeader()
            });

        if(!response.ok)
        {
            console.log("Something was wrong in logout operation.");
            return;
        }

        console.log("Logout all successfully");
        window.location.href = "/index.html";
    }
    catch(Error)
    {
        console.log("Couldn't connect to server. Try again later.");
    }
}

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
            window.location.href = "/index.html";
            return;
        }

        const user = await response.json();
        const email = user.email;
        const fullname = user.fullname;
        const username = user.username;
        const requiresMFA = user.requiresMFA;
        const allowsAlerts = user.allowsAlerts;

        const emailObject = document.querySelector("#user-email-container p");
        const fullnameObject = document.querySelector("#user-fullname-container p");
        const usernameObject = document.querySelector("#user-username-container p");
        const mfaOnButton = document.querySelector("#mfa-on-button");
        const mfaOffButton = document.querySelector("#mfa-off-button");
        const alertOnButton = document.querySelector("#alert-on-button");
        const alertOffButton = document.querySelector("#alert-off-button");

        emailObject.textContent = email;
        fullnameObject.textContent = fullname;
        usernameObject.textContent = username;
        
        if(requiresMFA)
        {
            mfaOnButton.classList.add("active");
        }
        else
        {
            mfaOffButton.classList.add("active");
        }

        if(allowsAlerts)
        {
            alertOnButton.classList.add("active");
        }
        else
        {
            alertOffButton.classList.add("active");
        }
    } 
    catch (e) 
    {
        console.error("Error loading user", e);
    }
}
window.addEventListener("DOMContentLoaded", loadUserInfo);


function previewImage(event) 
{
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e) {
        document.getElementById("user-image").src = e.target.result;
    };

    reader.readAsDataURL(file);
}

function deleteAccountOnClick()
{
    window.location.href = "/pages/user-profile/delete-account.html";
}

function goToEditPage(page)
{
    window.location.href = "user-profile-edit-" + page + ".html"
}

function backOnClick()
{
    window.location.href = "../dashboard-v2.html";
}
