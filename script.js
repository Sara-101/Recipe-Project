// Listen for the form submission
document.getElementById("recipeSurvey").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent page reload

    // Collect user inputs
    const spiceLevel = document.getElementById("spiceLevel").value;
    const diet = document.getElementById("diet").value;
    const allergies = Array.from(document.getElementById("allergies").selectedOptions).map(option => option.value);

    // Example recipe data
    const recipes = [
        {
            name: "Spaghetti Aglio e Olio",
            spice: "medium",
            diet: "none",
            ingredients: ["spaghetti", "garlic", "chili flakes", "olive oil"],
            instructions: "<a href='https://www.foodnetwork.com/recipes/giada-de-laurentiis/spaghetti-aglio-e-olio-recipe-1943819' target='_blank'>Full Recipe</a>",
            image: "https://via.placeholder.com/400x250?text=Spaghetti+Aglio+e+Olio"
        },
        {
            name: "Vegan Tacos",
            spice: "medium",
            diet: "vegan",
            ingredients: ["tortillas", "beans", "avocado", "salsa"],
            instructions: "<a href='https://www.allrecipes.com/recipe/233087/vegan-tacos/' target='_blank'>Full Recipe</a>",
            image: "https://via.placeholder.com/400x250?text=Vegan+Tacos"
        },
        {
            name: "Vegetarian Chili",
            spice: "hot",
            diet: "vegetarian",
            ingredients: ["beans", "tomatoes", "chili powder", "onions", "garlic"],
            instructions: "<a href='https://www.allrecipes.com/recipe/16465/vegetarian-chili/' target='_blank'>Full Recipe</a>",
            image: "https://via.placeholder.com/400x250?text=Vegetarian+Chili"
        },
        // Add more recipes here
    ];

    // Filter recipes based on the user input
    const filteredRecipes = recipes.filter(recipe => {
        const spiceMatch = recipe.spice === spiceLevel || spiceLevel === "none";
        const dietMatch = recipe.diet === diet || diet === "none";
        const allergiesMatch = allergies.every(allergy => !recipe.ingredients.includes(allergy));

        return spiceMatch && dietMatch && allergiesMatch;
    });

    // Display the filtered recipes
    const resultDiv = document.getElementById("recipeList");
    resultDiv.innerHTML = filteredRecipes.length > 0 
        ? filteredRecipes.map(recipe => `
            <div class="recipe">
                <h3>${recipe.name}</h3>
                <img src="${recipe.image}" alt="${recipe.name}">
                <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
                <p>${recipe.instructions}</p>
            </div>
        `).join('')
        : "<p>No recipes found based on your preferences.</p>";
});
``
