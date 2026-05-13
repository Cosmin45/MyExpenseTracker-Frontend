window.addEventListener("DOMContentLoaded", applyFilters);

function createLogRow(log)
{
    const container = document.querySelector("#audit-table-container tbody");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td style="font-weight: bold;">${log.id}</td>
        <td>${log.userId}</td>
        <td>${log.adminId}</td>
        <td>${log.requestId}</td>
        <td>${log.username}</td>
        <td>${log.action}</td>
        <td>${log.description}</td>
        <td>${log.createdAt}</td>
        <td>${log.ipAddress}</td>
        <td>${log.userAgent}</td>
        <td>${log.device}</td>
        <td>${log.os}</td>
        <td>${log.browser}</td>
    `;

    container.appendChild(row);
}

const actionSelect = document.getElementById("audit-select-by-action");
const dateSelect = document.getElementById("audit-select-by-date");
const deviceSelect = document.getElementById("audit-select-by-device");
const osSelect = document.getElementById("audit-select-by-os");
const browserSelect = document.getElementById("audit-select-by-browser");
const sortbySelect = document.getElementById("audit-select-sort-by");

actionSelect.addEventListener("change", applyFilters);
dateSelect.addEventListener("change", applyFilters);
deviceSelect.addEventListener("change", applyFilters);
osSelect.addEventListener("change", applyFilters);
browserSelect.addEventListener("change", applyFilters);
sortbySelect.addEventListener("change", applyFilters);

async function applyFilters()
{
    const token = localStorage.getItem("jwt");

    if(!token)
    {
        window.location.href = "/index.html";
        return
    }

    const action = actionSelect.value;
    const date = dateSelect.value;
    const device = deviceSelect.value;
    const os = osSelect.value;
    const browser = browserSelect.value;
    const sortBy = sortbySelect.value;

    const params = new URLSearchParams();
    if(action !== "all") params.append("action", action);
    if(date !== "all") params.append("date", date);
    if(device !== "all") params.append("device", device);
    if(os !== "all") params.append("os", os);
    if(browser !== "all") params.append("browser", browser);
    if(sortBy !== "id-asc") params.append("sortBy", sortBy);

    // console.log("------------------");
    // console.log("Action: " + action);
    // console.log("Date: " + date);
    // console.log("Device: " + device);
    // console.log("Os: " + os);
    // console.log("Browser: " + browser);
    // console.log("SortBy: " + sortBy);

    try 
    {
        const response = await fetch("http://localhost:8080/audit/filter-logs?" + params.toString(), 
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
        const container = document.querySelector("#audit-table-container tbody");
        container.innerHTML = "";

        informations.forEach(log => 
        {
            createLogRow(log);
        });
    } 
    catch (e) 
    {
        console.error("Error loading logs", e);
    }
}