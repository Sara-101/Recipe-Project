document.getElementById("surveyForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    
    const dietaryRestrictions = document.getElementById("dietaryRestrictions").value;
    const spiceLevel = document.getElementById("spiceLevel").value;
    const allergies = document.getElementById("allergies").value;
    const mealType = document.getElementById("mealType").value;

    document.getElementById("surveyResults").innerHTML = `
        <h3>Your Survey Results:</h3>
        <p><strong>Dietary Restrictions:</strong> ${dietaryRestrictions}</p>
        <p><strong>Spice Level:</strong> ${spiceLevel}</p>
        <p><strong>Allergies:</strong> ${allergies}</p>
        <p><strong>Meal Type:</strong> ${mealType}</p>
    `;

    
    const recipes = getRecommendedRecipes(dietaryRestrictions, spiceLevel, allergies, mealType);

    
    displayRecommendedRecipes(recipes);
});


function getRecommendedRecipes(dietaryRestrictions, spiceLevel, allergies, mealType) {
    
    const allRecipes = [
        { name: "Vegetarian Chili", 
         image: "https://www.simplyrecipes.com/thmb/z7gUkI9iw9V0erP_IGn0hjg9jCw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2018__12__Vegetarian-Chili-LEAD-4-29aaa5363fbd495090de1c9dbfefd4e9.jpg",
         url: "https://www.simplyrecipes.com/recipes/easy_vegetarian_chili_with_mushrooms/", 
         dietary: "Vegetarian", spice: "Medium", allergens: "None", type: "Dinner" },
        { name: "Butter Chicken ", 
         url: "https://www.allrecipes.com/recipe/141169/easy-indian-butter-chicken/", 
         dietary: "None", spice: "Spicy", allergens: "Dairy", type: "Dinner" },
        { name: "Green Goddess Salad", 
         url: "https://feelgoodfoodie.net/recipe/green-goddess-salad/", 
         dietary: "Vegan", spice: "Mild", allergens: "None", type: "Lunch" },
        { name: "Birria Tacos",
         url: "https://www.dinneratthezoo.com/grilled-salmon/", 
         dietary: "None", spice: "Mild", allergens: "None", type: "Lunch" },
        { name: "Gluten-Free Pancakes",
         url: "https://www.gimmesomeoven.com/sizzlin-spicy-szechuan-stir-fry/", 
         dietary: "Vegan", spice: "Spicy", allergens: "None", type: "Dinner" },
        { name: "Cajun Shrimp Pasta", 
         url: "https://www.thekitchn.com/cajun-shrimp-pasta-recipe-23449288", 
         dietary: "None", spice: "Medium", allergens: "Shellfish", type: "Dinner" },
 // Add more recipes

    ];

    
    const filteredRecipes = allRecipes.filter(recipe => {
        return (dietaryRestrictions === "None" || recipe.dietary === dietaryRestrictions) &&
               (spiceLevel === "Any" || recipe.spice === spiceLevel) &&
               (allergies === "None" || !recipe.allergens.includes(allergies)) &&
               (mealType === "Any" || recipe.type === mealType);
    });

    return filteredRecipes;
}


function displayRecommendedRecipes(recipes) {
    const recipeListContainer = document.getElementById("recipeResults");
    recipeListContainer.innerHTML = ''; 

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
