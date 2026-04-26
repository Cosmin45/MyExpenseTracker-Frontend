async function loadUsers()
{
    const token = localStorage.getItem("jwt");

    if (!token) 
    {
        window.location.href = "/index.html";
        return;
    }

    try 
    {
        const response = await fetch("http://localhost:8080/admin/users", 
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

        const users = await response.json();

        const container = document.querySelector("#users-table-container tbody");
        container.innerHTML = "";

        users.forEach(user => 
        {
            createUserRow(user);
        });

    } 
    catch (e) 
    {
        console.error("Error loading user", e);
    }
}
window.addEventListener("DOMContentLoaded", loadUsers);

function createUserRow(user)
{
    const container = document.querySelector("#users-table-container tbody");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.username}</td>
        <td>${user.fullName}</td>
        <td>${user.email}</td>
        <td>${user.createdAt}</td>
        <td>
            <select class="user-role">
                <option>USER</option>
                <option>ADMIN</option>
            </select>
        </td>
        <td>
            <select class="user-status">
                <option>ENABLED</option>
                <option>DISABLED</option>
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

    const status = row.querySelector(".user-status");
    status.value = user.accountStatus;

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
    });

    status.addEventListener("change", async function()
    {
        const oldStatus = user.status;
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

const typeSelect = document.getElementById("payment-type-select");
const categorySelect = document.getElementById("payment-category-select");
const timeSelect = document.getElementById("payment-time-select");
const sortBySelect = document.getElementById("payments-sort-by-select");

typeSelect.addEventListener("change", applyFilters);
categorySelect.addEventListener("change", applyFilters);
timeSelect.addEventListener("change", applyFilters);
sortBySelect.addEventListener("change", applyFilters);

async function applyFilters()
{
    const token = localStorage.getItem("jwt");

    if(!token)
    {
        window.location.href = "/index.html";
        return
    }

    const type = typeSelect.value;
    const category = categorySelect.value;
    const time = timeSelect.value;
    const sortBy = sortBySelect.value;

    const params = new URLSearchParams();
    if(type !== "All") params.append("type", type);
    if(category !== "All") params.append("category", category);
    if(time !== "All") params.append("time", time);
    if(sortBy !== "date-desc") params.append("sortBy", sortBy);

    try 
    {
        const response = await fetch("http://localhost:8080/expenses/filter?" + params.toString(), 
        {
            method: "GET",
            headers: 
            {
                "Authorization": "Bearer " + token
            }
        });

        if (!response.ok) 
        {
            // localStorage.removeItem("jwt");
            // window.location.href = "/index.html";
            return;
        }

        const informations = await response.json();
        const container = document.getElementById("payments-container");
        container.innerHTML = "";

        informations.forEach(payment => 
        {
            createPaymentCard(payment);
        });
    } 
    catch (e) 
    {
        console.error("Error loading user", e);
    }
}