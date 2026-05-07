window.addEventListener("DOMContentLoaded", applyUnexpectedErrorsFilter);

function createErrorRow(error)
{
    const container = document.querySelector("#unexpected-errors-table-container tbody");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>
            <select class="error-resolved">
                <option style="color: green;" value="yes">Yes</option>
                <option style="color: red;" value="no">No</option>
            </select>
        </td>
        <td style="font-weight: bold;">${error.id}</td>
        <td>${error.userId}</td>
        <td>${error.requestId}</td>
        <td>${error.status}</td>
        <td>${error.method}</td>
        <td>${error.errorCode}</td>
        <td>${error.path}</td>
        <td>${error.occurredAt}</td>
        <td>${error.ipAddress}</td>
        <td>
            <div class="cell-scroll">
                ${error.message}
            </div>
        </td>
        <td>
            <div class="cell-scroll">
                ${error.stackTrace}
            </div>
        </td>
        <td>${error.queryParams}</td>
        <td>${error.requestBody}</td>
        <td>${error.userAgent}</td>
        <td>${error.device}</td>
        <td>${error.os}</td>
        <td>${error.browser}</td>
    `;

    container.appendChild(row);

    const resolved = row.querySelector(".error-resolved");
    if(error.resolved === true)
    {
        resolved.value = "yes";
    }
    else
    {
        resolved.value = "no";
    }
    setColorByResolved(resolved);

    resolved.addEventListener("change", async function()
    {
        const oldResolved = error.resolved;
        const newResolved = this.value;

        this.disabled = true;
        const success = await editResolved(error.id, this.value);
        this.disabled = false;

        if(success)
        {
            error.resolved = newResolved;
        }
        else
        {
            this.value = oldResolved;
        }
        setColorByResolved(resolved);
    });

}

function setColorByResolved(resolved)
{
    if(resolved.value.toLowerCase() === "yes")
    {
        resolved.style.color = "green";
    }
    else if(resolved.value.toLowerCase() === "no")
    {
        resolved.style.color = "red";
    }
}

async function editResolved(errorId, newReserved)
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

        if(newReserved === "yes")
        {
            response = await fetch("http://localhost:8080/audit/set-unexpected-error-resolved/" + errorId, 
            {
                method: "PUT",
                headers: 
                {
                    "Authorization": "Bearer " + token
                }
            });
        }
        else if(newReserved === "no")
        {
            response = await fetch("http://localhost:8080/audit/set-unexpected-error-unresolved/" + errorId, 
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
            alert("Could not change reserved cell. Error code " + response.status);

            return false;
        }

        return true;

    } 
    catch (e) 
    {
        console.error("Error changing reserved cell", e);
        return false;
    }
}


const ue_resolvedSelect = document.getElementById("unexpected-errors-select-by-resolved");
const ue_statusSelect = document.getElementById("unexpected-errors-select-by-status");
const ue_methodSelect = document.getElementById("unexpected-errors-select-by-method");
const ue_dateSelect = document.getElementById("unexpected-errors-select-by-date");
const ue_deviceSelect = document.getElementById("unexpected-errors-select-by-device");
const ue_osSelect = document.getElementById("unexpected-errors-select-by-os");
const ue_browserSelect = document.getElementById("unexpected-errors-select-by-browser");
const ue_sortbySelect = document.getElementById("unexpected-errors-select-sort-by");

ue_resolvedSelect.addEventListener("change", applyUnexpectedErrorsFilter);
ue_statusSelect.addEventListener("change", applyUnexpectedErrorsFilter);
ue_methodSelect.addEventListener("change", applyUnexpectedErrorsFilter);
ue_dateSelect.addEventListener("change", applyUnexpectedErrorsFilter);
ue_deviceSelect.addEventListener("change", applyUnexpectedErrorsFilter);
ue_osSelect.addEventListener("change", applyUnexpectedErrorsFilter);
ue_browserSelect.addEventListener("change", applyUnexpectedErrorsFilter);
ue_sortbySelect.addEventListener("change", applyUnexpectedErrorsFilter);

async function applyUnexpectedErrorsFilter()
{
    const token = localStorage.getItem("jwt");

    if(!token)
    {
        window.location.href = "/index.html";
        return
    }

    const resolved = ue_resolvedSelect.value;
    const status = ue_statusSelect.value;
    const method = ue_methodSelect.value;
    const date = ue_dateSelect.value;
    const device = ue_deviceSelect.value;
    const os = ue_osSelect.value;
    const browser = ue_browserSelect.value;
    const sortBy = ue_sortbySelect.value;

    const params = new URLSearchParams();
    if(resolved !== "all") params.append("resolved", resolved);
    if(status !== "all") params.append("status", status);
    if(method !== "all") params.append("method", method);
    if(date !== "all") params.append("date", date);
    if(device !== "all") params.append("device", device);
    if(os !== "all") params.append("os", os);
    if(browser !== "all") params.append("browser", browser);
    if(sortBy !== "id-asc") params.append("sortBy", sortBy);

    console.log("------------------");
    console.log("Resolved: " + resolved);
    console.log("Status: " + status);
    console.log("Method: " + method);
    console.log("Date: " + date);
    console.log("Device: " + device);
    console.log("Os: " + os);
    console.log("Browser: " + browser);
    console.log("SortBy: " + sortBy);

    try 
    {
        const response = await fetch("http://localhost:8080/audit/filter-unexpected-errors?" + params.toString(), 
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
        const container = document.querySelector("#unexpected-errors-table-container tbody");
        container.innerHTML = "";

        informations.forEach(error => 
        {
            createErrorRow(error);
        });
    } 
    catch (e) 
    {
        console.error("Error loading unexpected errors", e);
    }
}