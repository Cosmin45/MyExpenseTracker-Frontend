function updateProgressBarContainer(informations)
{
    const goal = informations.savingsProgress.goal;
    const savingsValue = informations.savingsProgress.savingsValue;
    const savingsPercentageProgress = informations.savingsProgress.savingsPercentageProgress;

    const goalElement = document.querySelector("#goal-value");
    goalElement.textContent = goal;

    const savingsValueElement = document.querySelector("#savings-value");
    savingsValueElement.textContent = savingsValue;

    const progressContainer = document.querySelector("#progress");
    progressContainer.style.width = savingsPercentageProgress + "%";

    const goalContainer = document.querySelector("#goal");
    goalContainer.style.width = (100 - savingsPercentageProgress) + "%";

}