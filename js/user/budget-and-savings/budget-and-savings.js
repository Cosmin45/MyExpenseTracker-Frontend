async function loadBudgetAndSavingsInfo() 
{
    const token = localStorage.getItem("jwt");

    if (!token) 
    {
        window.location.href = "/index.html";
        return;
    }

    try 
    {
        const response = await fetch("http://localhost:8080/budget-and-savings/info", 
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

        // Expenses

        updateBudgetContainer(informations);

        updateSavingsContainer(informations);

    } 
    catch (e) 
    {
        console.error("Error loading user", e);
    }
}
window.addEventListener("DOMContentLoaded", loadBudgetAndSavingsInfo);