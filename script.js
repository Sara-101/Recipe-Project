// Add an event listener to the form to handle the survey submission
document.getElementById("surveyForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission (refresh)

    // Get the values from the survey form
    const dietaryRestrictions = document.getElementById("dietaryRestrictions").value;
    const spiceLevel = document.getElementById("spiceLevel").value;
    const allergies = document.getElementById("allergies").value;
    const mealType = document.getElementById("mealType").value;

    // Display survey results
    document.getElementById("surveyResults").innerHTML = `
        <h3>Your Survey Results:</h3>
        <p><strong>Dietary Restrictions:</strong> ${dietaryRestrictions}</p>
        <p><strong>Spice Level:</strong> ${spiceLevel}</p>
        <p><strong>Allergies:</strong> ${allergies}</p>
        <p><strong>Meal Type:</strong> ${mealType}</p>
    `;

    // Generate recipe recommendations based on the survey results
    const recipes = getRecommendedRecipes(dietaryRestrictions, spiceLevel, allergies, mealType);

    // Display the recommended recipes
    displayRecommendedRecipes(recipes);
});

// Function 
function getRecommendedRecipes(dietaryRestrictions, spiceLevel, allergies, mealType) {
    // Example recipes 
    const allRecipes = [
        { name: "Vegetarian Chili", image: "https://www.simplyrecipes.com/thmb/z7gUkI9iw9V0erP_IGn0hjg9jCw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2018__12__Vegetarian-Chili-LEAD-4-29aaa5363fbd495090de1c9dbfefd4e9.jpg", url: "https://www.simplyrecipes.com/recipes/easy_vegetarian_chili_with_mushrooms/", dietary: "Vegetarian", spice: "Medium", allergens: "None", type: "Dinner" },
        { name: "Butter Chicken ", image: "https://via.placeholder.com/300x200?text=Chicken+Curry", url: "https://example.com/chicken-curry", dietary: "None", spice: "Spicy", allergens: "Dairy", type: "Dinner" },
        { name: "Green Goddess Salad", image: "https://via.placeholder.com/300x200?text=Vegan+Salad", url: "https://example.com/vegan-salad", dietary: "Vegan", spice: "Mild", allergens: "None", type: "Lunch" },
        { name: "Beef Tacos", image: "https://via.placeholder.com/300x200?text=Beef+Tacos", url: "https://example.com/beef-tacos", dietary: "None", spice: "Medium", allergens: "None", type: "Dinner" },
        { name: "Grilled Salmon", image: "https://via.placeholder.com/300x200?text=Grilled+Salmon", url: "https://example.com/grilled-salmon", dietary: "None", spice: "Mild", allergens: "None", type: "Lunch" },
        { name: "Gluten-Free Pancakes", image: "https://via.placeholder.com/300x200?text=Gluten-Free+Pancakes", url: "https://example.com/gluten-free-pancakes", dietary: "Gluten Free", spice: "Mild", allergens: "None", type: "Breakfast" },
        { name: "Spicy Vegan Stir-fry", image: "https://via.placeholder.com/300x200?text=Spicy+Vegan+Stir-fry", url: "https://example.com/spicy-vegan-stir-fry", dietary: "Vegan", spice: "Spicy", allergens: "None", type: "Dinner" },
        { name: "Shrimp Pasta", image: "https://via.placeholder.com/300x200?text=Shrimp+Pasta", url: "https://example.com/shrimp-pasta", dietary: "None", spice: "Medium", allergens: "Shellfish", type: "Dinner" },
        // Add more recipes as needed
    ];

    // Filt
    const filteredRecipes = allRecipes.filter(recipe => {
        e
        return (dietaryRestrictions === "None" || recipe.dietary === dietaryRestrictions) &&
               (spiceLevel === "None" || recipe.spice === spiceLevel) &&
               (allergies === "None" || !recipe.allergens.includes(allergies)) &&
               (mealType === "Any" || recipe.type === mealType);
    });

    return filteredRecipes;
}

// Function to display recommended recipes
function displayRecommendedRecipes(recipes) {
    const recipeListContainer = document.getElementById("recipeResults");
    recipeListContainer.innerHTML = ''; // Clear previous results

    if (recipes.length === 0) {
        recipeListContainer.innerHTML = '<p>No recipes found based on your survey results.</p>';
    } else {
        const recipeList = document.createElement("div");
        recipeList.classList.add("recipe-list");

        recipes.forEach(recipe => {
            const recipeCard = document.createElement("div");
            recipeCard.classList.add("recipe");

            recipeCard.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.name}">
                <h3>${recipe.name}</h3>
                <a href="${recipe.url}" target="_blank">View Recipe</a>
            `;
            recipeList.appendChild(recipeCard);
        });

        recipeListContainer.appendChild(recipeList);
    }
}
