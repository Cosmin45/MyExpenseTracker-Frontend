// async function loadUsers()
// {
//     const token = localStorage.getItem("jwt");

//     if (!token) 
//     {
//         window.location.href = "/index.html";
//         return;
//     }

//     try 
//     {
//         const response = await fetch("http://localhost:8080/admin/users", 
//         {
//             method: "GET",
//             headers: 
//             {
//                 "Authorization": "Bearer " + token
//             }
//         });

//         if (!response.ok) 
//         {
//             localStorage.removeItem("jwt");
//             window.location.href = "/index.html";
//             return;
//         }

//         const users = await response.json();

//         const container = document.querySelector("#users-table-container tbody");
//         container.innerHTML = "";

//         users.forEach(user => 
//         {
//             createUserRow(user);
//         });

//     } 
//     catch (e) 
//     {
//         console.error("Error loading user", e);
//     }
// }
window.addEventListener("DOMContentLoaded", applyUnexpectedErrorsFilter);

function createUserRow(user)
{
    const container = document.querySelector("#users-table-container tbody");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td style="font-weight: bold;">${user.id}</td>
        <td>${user.username}</td>
        <td>${user.fullName}</td>
        <td>${user.email}</td>
        <td>${user.createdAt}</td>
        <td>
            <select class="user-role">
                <option style="color: green;">USER</option>
                <option style="color: orange;">ADMIN</option>
            </select>
        </td>
        <td>
            <select class="user-status">
                <option style="color: green;">ENABLED</option>
                <option style="color: red;">DISABLED</option>
            </select>
        </td>
        <td>${user.emailVerified}</td>
        <td>${user.requiresMFA}</td>
        <td>${user.monthlyBudget}</td>
        <td>${user.monthlySavingsGoal}</td>
        <td>${user.allowsAlerts}</td>
        <td>
            <button class="delete">DELETE</button>
        </td>
    `;

    container.appendChild(row);

    const role = row.querySelector(".user-role");
    role.value = user.role;
    setColorByRole(role);

    const status = row.querySelector(".user-status");
    status.value = user.accountStatus;
    setColorByStatus(status);

    const deleteButton = row.querySelector(".delete");

    role.addEventListener("change", async function()
    {
        const oldRole = user.role;
        const newRole = this.value;

        this.disabled = true;
        const success = await editRole(user.id, this.value);
        this.disabled = false;

        if(success)
        {
            user.role = newRole;
        }
        else
        {
            this.value = oldRole;
        }
        setColorByRole(role);
    });

    status.addEventListener("change", async function()
    {
        const oldStatus = user.accountStatus;
        const newStatus = this.value;

        this.disabled = true;
        const success = await editStatus(user.id, this.value);
        this.disabled = false;

        if(success)
        {
            user.status = newStatus;
        }
        else
        {
            this.value = oldStatus;
        }
        setColorByStatus(status);
    });

    deleteButton.addEventListener("click", async function()
    {
        this.disabled = true;

        const success = await deleteOnClick(user.id, this)

        if(success)
        {

        }
        else
        {
            this.disabled = false;
        }
    });
}

function setColorByRole(role)
{
    if(role.value.toLowerCase() === "user")
    {
        role.style.color = "green";
    }
    else if(role.value.toLowerCase() === "admin")
    {
        role.style.color = "orange";
    }
}

function setColorByStatus(status)
{
    if(status.value.toLowerCase() === "enabled")
    {
        status.style.color = "green";
    }
    else if(status.value.toLowerCase() === "disabled")
    {
        status.style.color = "red";
    }
}

async function editRole(userId, newRole)
{
    const token = localStorage.getItem("jwt");

    if (!token) 
    {
        window.location.href = "/index.html";
        return;
    }

    try 
    {
        let response;

        if(newRole === "USER")
        {
            response = await fetch("http://localhost:8080/admin/demote-to-user/" + userId, 
            {
                method: "PUT",
                headers: 
                {
                    "Authorization": "Bearer " + token
                }
            });
        }
        else if(newRole === "ADMIN")
        {
            response = await fetch("http://localhost:8080/admin/promote-to-admin/" + userId, 
            {
                method: "PUT",
                headers: 
                {
                    "Authorization": "Bearer " + token
                }
            });
        }
        else
        {
            return false;
        }

        if (!response.ok) 
        {
            alert("Could not change user role. Error code " + response.status);

            return false;
        }

        return true;

    } 
    catch (e) 
    {
        console.error("Error changing user role", e);
        return false;
    }
}

async function editStatus(userId, newStatus)
{
    const token = localStorage.getItem("jwt");

    if (!token) 
    {
        window.location.href = "/index.html";
        return;
    }

    try 
    {
        let response;

        if(newStatus === "ENABLED")
        {
            response = await fetch("http://localhost:8080/admin/enable-user/" + userId, 
            {
                method: "PUT",
                headers: 
                {
                    "Authorization": "Bearer " + token
                }
            });
        }
        else if(newStatus === "DISABLED")
        {
            response = await fetch("http://localhost:8080/admin/disable-user/" + userId, 
            {
                method: "PUT",
                headers: 
                {
                    "Authorization": "Bearer " + token
                }
            });
        }
        else
        {
            return false;
        }

        if (!response.ok) 
        {
            alert("Could not change user status. Error code " + response.status);

            return false;
        }

        return true;

    } 
    catch (e) 
    {
        console.error("Error changing user status", e);
        return false;
    }
}

async function deleteOnClick(userId, button)
{
    const token = localStorage.getItem("jwt");

    if (!token) 
    {
        window.location.href = "/index.html";
        return;
    }

    try 
    {
        const response = await fetch("http://localhost:8080/admin/delete-user/" + userId, 
        {
            method: "DELETE",
            headers: 
            {
                "Authorization": "Bearer " + token
            }
        });

        if (response.status !== 204) 
        {
            alert("Could not delete user");
            return;
        }

        const row = button.closest("tr");
        row.remove();
    } 
    catch (e) 
    {
        console.error("Error deleting user", e);
    }
}

const roleSelect = document.getElementById("users-select-by-role");
const statusSelect = document.getElementById("users-select-by-status");
const emailSelect = document.getElementById("users-select-by-email-type");
const mfaSelect = document.getElementById("users-select-by-mfa");
const alertsSelect = document.getElementById("users-select-by-alerts");
const sortBySelect = document.getElementById("users-select-sort-by");

roleSelect.addEventListener("change", applyUnexpectedErrorsFilter);
statusSelect.addEventListener("change", applyUnexpectedErrorsFilter);
emailSelect.addEventListener("change", applyUnexpectedErrorsFilter);
mfaSelect.addEventListener("change", applyUnexpectedErrorsFilter);
alertsSelect.addEventListener("change", applyUnexpectedErrorsFilter);
sortBySelect.addEventListener("change", applyUnexpectedErrorsFilter);

async function applyUnexpectedErrorsFilter()
{
    const token = localStorage.getItem("jwt");

    if(!token)
    {
        window.location.href = "/index.html";
        return
    }

    const role = roleSelect.value;
    const status = statusSelect.value;
    const email = emailSelect.value;
    const mfa = mfaSelect.value;
    const alerts = alertsSelect.value;
    const sortBy = sortBySelect.value;

    const params = new URLSearchParams();
    if(role !== "all") params.append("role", role);
    if(status !== "all") params.append("status", status);
    if(email !== "all") params.append("email", email);
    if(mfa !== "all") params.append("mfa", mfa);
    if(alerts !== "all") params.append("alerts", alerts);
    if(sortBy !== "id-asc") params.append("sortBy", sortBy);

    try 
    {
        const response = await fetch("http://localhost:8080/admin/filter?" + params.toString(), 
        {
            method: "GET",
            headers: 
            {
                "Authorization": "Bearer " + token
            }
        });

        if (!response.ok) 
        {
            return;
        }

        const informations = await response.json();
        const container = document.querySelector("#users-table-container tbody");
        container.innerHTML = "";

        informations.forEach(user => 
        {
            createUserRow(user);
        });
    } 
    catch (e) 
    {
        console.error("Error loading user", e);
    }
}