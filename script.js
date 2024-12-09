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
        instructions: "For full instructions, visit: <a href='https://www.foodnetwork.com/recipes/giada-de-laurentiis/spaghetti-aglio-e-olio-recipe-1943819' target='_blank'>Food Network</a>",
        image: "data:image/jpeg;base64,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"
    },
    {
        name: "Vegan Stir-fry",
        dietary: "vegan",
        spice: "mild",
        ingredients: ["tofu", "soy sauce", "carrots", "broccoli", "rice"],
        instructions: "For full instructions, visit: <a href='https://minimalistbaker.com/easy-vegan-stir-fry/' target='_blank'>Minimalist Baker</a>",
        image: "https://via.placeholder.com/400x300?text=Vegan+Stir-fry"
    },
    {
        name: "Grilled Chicken Salad",
        dietary: "none",
        spice: "hot",
        ingredients: ["chicken", "lettuce", "tomato", "cucumber", "hot sauce"],
        instructions: "For full instructions, visit: <a href='https://www.allrecipes.com/recipe/229960/grilled-chicken-salad/' target='_blank'>All Recipes</a>",
        image: "https://via.placeholder.com/400x300?text=Grilled+Chicken+Salad"
    },
    {
        name: "Vegetarian Tacos",
        dietary: "vegetarian",
        spice: "medium",
        ingredients: ["tortillas", "beans", "lettuce", "tomato", "cheese", "salsa"],
        instructions: "For full instructions, visit: <a href='https://www.loveandlemons.com/vegetarian-tacos/' target='_blank'>Love and Lemons</a>",
        image: "https://via.placeholder.com/400x300?text=Vegetarian+Tacos"
    },
    {
        name: "Gluten-Free Pancakes",
        dietary: "gluten-free",
        spice: "mild",
        ingredients: ["gluten-free flour", "eggs", "milk", "baking powder"],
        instructions: "For full instructions, visit: <a href='https://www.simplyrecipes.com/recipes/gluten_free_pancakes/' target='_blank'>Simply Recipes</a>",
        image: "https://via.placeholder.com/400x300?text=Gluten-Free+Pancakes"
    },
    {
        name: "Spicy Bean Chili",
        dietary: "vegan",
        spice: "hot",
        ingredients: ["kidney beans", "black beans", "tomatoes", "chili powder", "onions", "garlic"],
        instructions: "For full instructions, visit: <a href='https://www.delish.com/cooking/recipe-ideas/a19665885/vegan-chili-recipe/' target='_blank'>Delish</a>",
        image: "https://via.placeholder.com/400x300?text=Spicy+Bean+Chili"
    },
    {
        name: "Chicken Alfredo",
        dietary: "none",
        spice: "mild",
        ingredients: ["chicken", "fettuccine", "heavy cream", "parmesan cheese", "butter"],
        instructions: "For full instructions, visit: <a href='https://www.foodnetwork.com/recipes/ree-drummond/chicken-alfredo-2283843' target='_blank'>Food Network</a>",
        image: "https://via.placeholder.com/400x300?text=Chicken+Alfredo"
    },
    {
        name: "Vegan Buddha Bowl",
        dietary: "vegan",
        spice: "mild",
        ingredients: ["quinoa", "chickpeas", "avocado", "cucumber", "spinach"],
        instructions: "For full instructions, visit: <a href='https://www.feastingathome.com/vegan-buddha-bowl/' target='_blank'>Feasting at Home</a>",
        image: "https://via.placeholder.com/400x300?text=Vegan+Buddha+Bowl"
    },
    {
        name: "Vegetarian Lasagna",
        dietary: "vegetarian",
        spice: "mild",
        ingredients: ["lasagna noodles", "ricotta cheese", "spinach", "tomato sauce", "mozzarella cheese"],
        instructions: "For full instructions, visit: <a href='https://www.allrecipes.com/recipe/21353/vegetarian-lasagna/' target='_blank'>All Recipes</a>",
        image: "https://via.placeholder.com/400x300?text=Vegetarian+Lasagna"
    },
    {
        name: "Beef Stir-Fry",
        dietary: "none",
        spice: "medium",
        ingredients: ["beef", "soy sauce", "ginger", "garlic", "bell peppers", "onions"],
        instructions: "For full instructions, visit: <a href='https://www.bonappetit.com/recipe/beef-and-broccoli-stir-fry' target='_blank'>Bon Appetit</a>",
        image: "https://via.placeholder.com/400x300?text=Beef+Stir-Fry"
    },
    {
        name: "Vegan Pizza",
        dietary: "vegan",
        spice: "mild",
        ingredients: ["pizza dough", "tomato sauce", "vegan cheese", "olives", "onions", "bell peppers"],
        instructions: "For full instructions, visit: <a href='https://www.delish.com/cooking/recipe-ideas/a26267689/vegan-pizza-recipe/' target='_blank'>Delish</a>",
        image: "https://via.placeholder.com/400x300?text=Vegan+Pizza"
    },
    {
        name: "Eggplant Parmesan",
        dietary: "vegetarian",
        spice: "mild",
        ingredients: ["eggplant", "tomato sauce", "mozzarella cheese", "parmesan cheese", "breadcrumbs"],
        instructions: "For full instructions, visit: <a href='https://www.simplyrecipes.com/recipes/eggplant_parmesan/' target='_blank'>Simply Recipes</a>",
        image: "https://via.placeholder.com/400x300?text=Eggplant+Parmesan"
    },
    {
        name: "Grilled Shrimp Skewers",
        dietary: "none",
        spice: "medium",
        ingredients: ["shrimp", "garlic", "lemon", "olive oil", "skewers"],
        instructions: "For full instructions, visit: <a href='https://www.foodnetwork.com/recipes/grilled-shrimp-skewers-recipe-1945827' target='_blank'>Food Network</a>",
        image: "https://via.placeholder.com/400x300?text=Grilled+Shrimp+Skewers"
    },
    {
        name: "Chickpea Salad",
        dietary: "vegan",
        spice: "mild",
        ingredients: ["chickpeas", "cucumber", "tomato", "onions", "olive oil", "lemon"],
        instructions: "For full instructions, visit: <a href='https://www.loveandlemons.com/chickpea-salad/' target='_blank'>Love and Lemons</a>",
        image: "https://via.placeholder.com/400x300?text=Chickpea+Salad"
    },
    {
        name: "Chicken Curry",
        dietary: "none",
        spice: "hot",
        ingredients: ["chicken", "coconut milk", "curry powder", "onions", "garlic", "ginger"],
        instructions: "For full instructions, visit: <a href='https://www.bbcgoodfood.com/recipes/chicken-curry' target='_blank'>BBC Good Food</a>",
        image: "https://via.placeholder.com/400x300?text=Chicken+Curry"
    },
    {
        name: "Sweet Potato Fries",
        dietary: "vegan",
        spice: "mild",
        ingredients: ["sweet potatoes", "olive oil", "paprika", "garlic powder", "salt"],
        instructions: "For full instructions, visit: <a href='https://www.delish.com/cooking/recipe-ideas/a19988707/baked-sweet-potato-fries-recipe/' target='_blank'>Delish</a>",
        image: "https://via.placeholder.com/400x300?text=Sweet+Potato+Fries"
    },
    {
        name: "Pulled Pork Sandwiches",
        dietary: "none",
        spice: "medium",
        ingredients: ["pork", "bbq sauce", "buns", "coleslaw"],
        instructions: "For full instructions, visit: <a href='https://www.foodnetwork


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
