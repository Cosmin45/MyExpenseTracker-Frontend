function updateSavingsContainer(informations)
{
    const savingTarget = informations.savingsProgressDTO.goal;
    const saved = informations.savingsProgressDTO.savingsValue;
    const savingRemaining = informations.savingsProgressDTO.goalLeft;

    const savedPercentage = informations.savingsProgressDTO.savingsPercentageProgress;
    const savingRemainingPercentage = informations.savingsProgressDTO.goalLeftPercentage;

    const savingTargetElement = document.querySelector("#saving-target");
    savingTargetElement.textContent = savingTarget;
    const savedElement = document.querySelector("#saved-value");
    savedElement.textContent = saved;
    const savingRemainingElement = document.querySelector("#saving-remaining");
    savingRemainingElement.textContent = savingRemaining;

    const savedFillElement = document.querySelector("#saved-fill");
    savedFillElement.style.width = savedPercentage + "%";
    const savingLeftFillElement = document.querySelector("#saving-left-fill");
    savingLeftFillElement.style.width = savingRemainingPercentage + "%";

    if(savingRemaining === 0)
    {
        budgetRemainingElement.style.color = "#4bb36f";
    }
}