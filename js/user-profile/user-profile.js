function backOnClick()
{
    window.location.href = "../dashboard.html";
}

function goToEditPage(page)
{
    window.location.href = "user-profile-edit-" + page + ".html"
}

async function loadUserInfo() 
{
    const token = localStorage.getItem("jwt");

    if (!token) 
        {
        window.location.href = "index.html";
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
            window.location.href = "index.html";
            return;
        }

        const user = await response.json();
        const email = user.email;
        const fullname = user.fullname;
        const username = user.username;

        const emailObject = document.querySelector("#user-email-container p");
        const fullnameObject = document.querySelector("#user-fullname-container p");
        const usernameObject = document.querySelector("#user-username-container p");

        emailObject.textContent = email;
        fullnameObject.textContent = fullname;
        usernameObject.textContent = username;
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