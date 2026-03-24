function updateProgressBarContainer(informations)
{
    const goal = informations.savingsProgress.goal;
    const savingsValue = informations.savingsProgress.savingsValue;
    const savingsPercentageProgress = informations.savingsProgress.savingsPercentageProgress;
    const goalLeftPercentage = informations.savingsProgress.goalLeftPercentage;

    const goalElement = document.querySelector("#goal-value");
    goalElement.textContent = goal;

    const savingsValueElement = document.querySelector("#savings-value");
    savingsValueElement.textContent = savingsValue;

    const progressContainer = document.querySelector("#savings-progress");
    progressContainer.style.width = savingsPercentageProgress + "%";

    const goalLeftContainer = document.querySelector("#savings-goal");
    goalLeftContainer.style.width = goalLeftPercentage + "%";

}