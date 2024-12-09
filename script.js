document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form submission

    // Get form data
    const dietaryRestrictions = document.getElementById('dietaryRestrictions').value;
    const spiceTolerance = document.getElementById('spiceTolerance').value;
    const allergies = Array.from(document.querySelectorAll('input[name="allergies"]:checked')).map(el => el.value);

    // Send data to the recommendation function
    generateRecipeRecommendations(dietaryRestrictions, spiceTolerance, allergies);
});

function generateRecipeRecommendations(dietaryRestrictions, spiceTolerance, allergies) {
    // Example predefined recipes (in a real app, this might come from a server or API)
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

    // Filter recipes based on survey answers
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
                <button onclick="viewRecipeDetails(${JSON.stringify(recipe)})">View Details</button>
            `;
            recipeList.appendChild(li);
        });
    }

    document.getElementById('recipeRecommendations').style.display = 'block';
}

function viewRecipeDetails(recipe) {
    alert(`Recipe: ${recipe.name}\n\nIngredients: ${recipe.ingredients.join(', ')}\n\nInstructions: ${recipe.instructions}`);
}
