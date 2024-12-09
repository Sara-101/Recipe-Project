document.getElementById('survey-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the form from refreshing the page

    // Capture the survey data
    const diet = document.getElementById('diet').value;
    const spiceLevel = document.getElementById('spice-level').value;
    const mealType = document.getElementById('meal-type').value;

    // Generate recipe recommendations based on the survey data
    generateRecipeSuggestions(diet, spiceLevel, mealType);
});

function generateRecipeSuggestions(diet, spiceLevel, mealType) {
    // Hardcoded recipe data (replace this with actual recipes)
    const recipes = [
        { name: 'Vegetarian Stir Fry', type: 'vegetarian', spice: 3, url: 'https://www.allrecipes.com/recipe/12345' },
        { name: 'Spicy Chicken Curry', type: 'non-vegetarian', spice: 5, url: 'https://www.allrecipes.com/recipe/67890' },
        { name: 'Gluten-Free Pancakes', type: 'gluten-free', spice: 1, url: 'https://www.allrecipes.com/recipe/23456' },
        // Add more recipes here
    ];

    // Filter recipes based on the user preferences
    const filteredRecipes = recipes.filter(recipe => {
        return recipe.type === diet && recipe.spice <= spiceLevel && recipe.name.toLowerCase().includes(mealType.toLowerCase());
    });

    // Show the filtered recipes
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = ''; // Clear previous results

    if (filteredRecipes.length > 0) {
        filteredRecipes.forEach(recipe => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${recipe.url}" target="_blank">${recipe.name}</a>`;
            recipeList.appendChild(li);
        });
        document.getElementById('recipe-results').style.display = 'block';
    } else {
        recipeList.innerHTML = '<li>No recipes found based on your preferences.</li>';
        document.getElementById('recipe-results').style.display = 'block';
    }
}

