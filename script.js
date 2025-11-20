document.addEventListener("DOMContentLoaded", () => {
    const calorieCounter = document.getElementById("calorie-counter");
    const budgetInput = document.getElementById("budget");
    const foodEntries = document.getElementById("food-entries");
    const exerciseEntries = document.getElementById("exercise-entries");
    const output = document.getElementById("output");
    const caloriesConsumed = document.getElementById("calories-consumed");
    const caloriesBurned = document.getElementById("calories-burned");
    const remainingCalories = document.getElementById("remaining-calories");
    const calorieStatus = document.getElementById("calorie-status");

    document.getElementById("add-food").addEventListener("click", () => addEntry(foodEntries, "food"));
    document.getElementById("add-exercise").addEventListener("click", () => addEntry(exerciseEntries, "exercise"));
    document.getElementById("clear").addEventListener("click", clearForm);
    calorieCounter.addEventListener("submit", calculateCalories);

    function addEntry(container, type) {
        const entryDiv = document.createElement("div");
        entryDiv.innerHTML = `
            <input type="text" placeholder="${type === 'food' ? 'Food' : 'Exercise'} Name">
            <input type="number" placeholder="Calories" min="0">
        `;
        container.appendChild(entryDiv);
    }

    function calculateCalories(e) {
        e.preventDefault();
        
        const budget = parseInt(budgetInput.value) || 0;
        const consumed = sumCalories(foodEntries);
        const burned = sumCalories(exerciseEntries);
        const netCalories = budget - consumed + burned;

        caloriesConsumed.textContent = consumed;
        caloriesBurned.textContent = burned;
        remainingCalories.textContent = netCalories;
        calorieStatus.textContent = netCalories >= 0 ? "Surplus" : "Deficit";
        calorieStatus.style.color = netCalories >= 0 ? "#acd157" : "#ffadad";

        output.classList.remove("hide");
    }

    function sumCalories(container) {
        let total = 0;
        container.querySelectorAll("input[type='number']").forEach(input => {
            total += parseInt(input.value) || 0;
        });
        return total;
    }

    function clearForm() {
        budgetInput.value = "";
        foodEntries.innerHTML = "";
        exerciseEntries.innerHTML = "";
        output.classList.add("hide");
    }
});
