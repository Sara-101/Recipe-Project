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
         image: "https://media.istockphoto.com/id/1411646705/photo/chicken-tikka-masala-cooked-marinated-chicken-in-spiced-curry-sauce.webp?a=1&b=1&s=612x612&w=0&k=20&c=0ppWx5zTOC6Mj1BE82hKUGNGPBiZZeHPFnQCI6uKbkM=",
         url: "https://www.allrecipes.com/recipe/141169/easy-indian-butter-chicken/", 
         dietary: "None", spice: "Spicy", allergens: "Shellfish", type: "Dinner" },
        
        { name: "Green Goddess Salad", 
         image: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2FsYWR8ZW58MHx8MHx8fDA%3D",
         url: "https://feelgoodfoodie.net/recipe/green-goddess-salad/", 
         dietary: "Vegan", spice: "Mild", allergens: "None", type: "Lunch" },
        
        { name: "Birria Tacos",
         image: "https://media.istockphoto.com/id/2021971495/photo/3-beef-birria-tacos-stacked-on-black-plate.webp?a=1&b=1&s=612x612&w=0&k=20&c=DouTJgvWyU9I23ciUoEXr2iRRjiOCw4QcCekpTj0KvM=",
         url: "https://iamafoodblog.com/birria-tacos-recipe/", 
         dietary: "None", spice: "Medium", allergens: "None", type: "Lunch" },
        
        { name: "Gluten-Free Pancakes",
         url: "https://www.mamaknowsglutenfree.com/easy-gluten-free-pancakes/", 
         image: "https://plus.unsplash.com/premium_photo-1672846027109-e2c91500afef?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGFuY2FrZXN8ZW58MHx8MHx8fDA%3D",
         dietary: "Gluten Free", spice: "Mild", allergens: "None", type: "Breakfast" },
        
        { name: "Cajun Shrimp Pasta", 
         url: "https://www.thekitchn.com/cajun-shrimp-pasta-recipe-23449288", 
         dietary: "None", spice: "Medium", allergens: "None", type: "Dinner" },
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
