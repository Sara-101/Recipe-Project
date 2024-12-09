// Ensure that the DOM is fully loaded before attaching event listeners
document.addEventListener("DOMContentLoaded", function() {
    const surveyForm = document.getElementById('surveyForm');
    
    // Add event listener to the form
    surveyForm.addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent the form from submitting and refreshing the page
        
        // Get the values from the form
        const dietaryRestrictions = document.getElementById('dietaryRestrictions').value;
        const spiceTolerance = document.getElementById('spiceTolerance').value;
        const allergies = Array.from(document.querySelectorAll('input[name="allergies"]:checked')).map(el => el.value);

        // Call the function to generate recipe recommendations
        generateRecipeRecommendations(dietaryRestrictions, spiceTolerance, allergies);
    });
});

function generateRecipeRecommendations(dietaryRestrictions, spiceTolerance, allergies) {
    // Example predefined recipes (you can replace this with an API or database in the future)
    const recipes = [
        {
            name: "Spaghetti Aglio e Olio",
            dietary: "none",
            spice: "medium",
            ingredients: ["spaghetti", "garlic", "chili flakes", "olive oil"],
            instructions: "Cook spaghetti and toss with garlic, chili flakes, and olive oil.",
            image: "https://via.placeholder.com/400x300?text=Spaghetti+Aglio+e+Olio"
        },
        {
            name: "Vegan Stir-fry",
            dietary: "vegan",
            spice: "mild",
            ingredients: ["tofu", "soy sauce", "carrots", "broccoli", "rice"],
            instructions: "Stir-fry tofu and vegetables with soy sauce. Serve with rice.",
            image: "https://via.placeholder.com/400x300?text=Vegan+Stir-fry"
        },
        {
            name: "Grilled Chicken Salad",
            dietary: "none",
            spice: "hot",
            ingredients: ["chicken", "lettuce", "tomato", "cucumber", "hot sauce"],
            instructions: "Grill the chicken, toss with veggies, and drizzle with hot sauce.",
            image: "https://via.placeholder.com/400x300?text=Grilled+Chicken+Salad"
        }
    ];

    // Filter recipes based on the survey answers
    const filteredRecipes = recipes.filter(recipe => {
        const matchesDietary = dietaryRestrictions === "none" || recipe.dietary === dietaryRestrictions;
        const matchesSpice = recipe.spice === spiceTolerance;
        const matchesAllergies = !allergies.some(allergy => recipe.ingredients.includes(allergy));

        return matchesDietary && matchesSpice && matchesAllergies;
    });

    // Display filtered recipes
    const recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = '';  // Clear any previous results

    if (filteredRecipes.length === 0) {
        recipeList.innerHTML = '<li>No recipes match your preferences.</li>';
    } else {
        filteredRecipes.forEach(recipe => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${recipe.name}</strong>
                <img src="${recipe.image}" alt="${recipe.name}">
                <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
                <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            `;
            recipeList.appendChild(li);
        });
    }

    // Show the recipe recommendations section
    document.getElementById('recipeRecommendations').style.display = 'block';
}
