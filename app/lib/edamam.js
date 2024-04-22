'use client';

const APP_KEY = "17b530ac3aaeb0a8ef3db162733ad849";
const APP_ID = "90dadc9b";

// Given the profiles, we are going to get the results
// the results will initially be in JSON file.
export const getResults = async (profiles, moreCalories = false, moreIngredients = false, maxResults) => {
    const q = [];
    const diet = [];
    const health = [];

    // This will contain all the diet labels
    // all the users have entered. It will also
    // contain the user's rankings. For example,
    // ['keto', 4]
    // means that a user has ranked the keto diet with a 4.
    // You can guess what userHealthLabels represents.
    // Correct -- it stores all the user's names.
    // Just kidding, it stores what you think it would store.
    // There is one thing to note: these arrays could have duplicate labels.
    // For example, if one user has ranked the keto diet with a 4, and
    // another user has ranked the keto diet with a 3, the values
    // [['keto', 4], ['keto', 3]]
    // This isn't necessarily a problem. If it is, you could take the averages.
    // But I don't want to do that right now!
    // Also the algorithms, functions, etc. are probably not efficient, but I am also rushing.
    const userDietLabels = [];
    const userHealthLabels = [];

    for (const profile of Object.values(profiles)) {
        // Updating the query parameters (for the URL)
        q.push(...[profile["food"]]);

        // Commenting this out because if this is included,
        // we wouldn't have a reason to rank anything because
        // all the recipes would satisfy all the user's requirements.
        // diet.push(...profile["diet"].map((d) => (d[0])));
        // health.push(...profile["health"].map((h) => (h[0])));

        // Updating userDietLabels
        profile["diet"].forEach((d) => {
            userDietLabels.push([d[1], parseInt(profile[`range-${d[0]}`])]);
        });

        // Updating healthDietLabels
        profile["health"].forEach((h) => {
            userHealthLabels.push([h[1], parseInt(profile[`range-${h[0]}`])]);
        })
    }

    // Creating the parameters for the URL
    const parameters = {
        "q": q.join('%20'),
        "diet": diet.join('&diet='),
        "health": health.join('&health')
    }

    // URL
    let URL = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`;
    for (const key of Object.keys(parameters)) {
        if (parameters[key] != "") {
            URL += `&${key}=${parameters[key]}`;
        }
    }

    // Stores all the recipes in an array.
    // NEW: We've introduced a weight to create more variety in the ranking vector.
    //  If the user wants more calories, we set the weight to the number of calories.
    //  If the user wants less calories, we set the weight to the inverse number of calories.
    //  If the user wants more ingredients, we multiply the current weight by the number of ingredients.
    //  If the user wants less calories, we multiply the current weight by the inverse number of ingredients.
    // Format: [[recipeName, recipeDietLabels, recipeHealthLabels, recipeWeight]]
    // Also known as the "labels vector".
    const allRecipes = [];
    const recipeRanking = [];

    // Let's normalize the weights so we don't have like infinity for some reason.
    let maxWeight = 0;

    do {
        // Get Response and Parse Response
        const response = await fetch(URL);
        const result = await response.json();
        result.hits.forEach(({recipe}) => {
            // If we haven't found a recipe with the same name,
            // add the recipe.
            if (allRecipes.find((element) => element[0] === recipe.label) == undefined) {
                let rWeight = (moreCalories ? recipe.calories : 1 / recipe.calories) * (moreIngredients ? recipe.ingredients.length : 1 / recipe.ingredients.length);
                allRecipes.push([recipe.label, recipe.dietLabels, recipe.healthLabels, rWeight, recipe]);
                recipeRanking.push([recipe.label, 0, recipe]);
                maxWeight = Math.max(maxWeight, rWeight);
            }
            
        });

        // Get Next 20 Recipes
        // After this executes, the URL will be updated, the while loop will (unless we've reached max already) loop again
        // and the new URL will be called. The 'new' URL will have 20 more recipes.
        // It's like a linked list of URLS, where each node in the linked list contains <= 20 recipes.
        if (Object.hasOwn(result, "_links") && Object.hasOwn(result["_links"], "next")) {
            URL = result["_links"]["next"]["href"];
        }
        else {
            break;
        }
    }
    while (allRecipes.length < maxResults);

    // Normalize the weights
    allRecipes.forEach((recipe) => {
        recipe[3] = (recipe[3] / maxWeight) * 100;
    });

    // console.log("All Recipes", allRecipes);
    // console.log("Recipe Ranking Before", recipeRanking);
    // console.log("User Diet Labels", userDietLabels);
    // console.log("User Health Labels", userHealthLabels);
    // console.log("Profiles", profiles);

    // Creating the Ratings Vector
    // Each recipe is initialized to a value of 0.
    // When a recipe has a diet or health label that a user has specified, we increase the rating of that recipe
    // by the preference the user specified.
    // When a recipe does not have a diet or health label that a user has specified, we decrease the rating of that recipe
    // by the preference the user specified.
    // Example:
    // Labels Vector: [Strawberry, ['Low-Carb'], ['Peanut-Free']]
    // Ratings Vector: [Strawberry, 0]
    // Aggregate (All) User Diet Preferences: [['Low-Carb', 5], ['Keto', 2]]
    // Aggregate (All) User Health Preferences: [['Peanut-Free', 4], ['Egg-Free', 2]]
    // Because a strawberry is low-carb, we add 5 to its rating.
    // Because a strawberry is not keto, we subtract 2 from its rating.
    // Because a strawberry is peanut-free, we add 4 to its rating.
    // Because a strawberry is not egg-free, we subtract 2 from its rating.
    // (After) Ratings Vector: 5 - 2 + 4 - 2 = 5
    // We will do this for each recipe
    // This is O(n^2) *around there* but it is ok for the purposes of this assignment.
    for (const recipe of allRecipes) {
        // Updating the recipe's rank for diet labels
        // NEW: Weights. So, what do we do with weights?
        // If the recipe has a greater weight, we penalize it less and reward it more.
        // If the recipe has a lesser weight, we penalize it more and reward it less.
        // That would look like dividing the rank by the weight when subtracting,
        // and multiplying it by the weight when adding.
        // I'm not sure if I'm overlooking a factor that throws off the correctness of the results.
        // However, using the weight does indeed introduce variety.
        for (const dietLabel of userDietLabels) {
            if (recipe[1].includes(dietLabel[0])) {
                (recipeRanking.find((element) => element[0] === recipe[0]))[1] += recipe[3] * dietLabel[1];
            }
            else {
                (recipeRanking.find((element) => element[0] === recipe[0]))[1] -= (1.0 / recipe[3]) * dietLabel[1];
            }
        }

        // Updating the recipe's rank for health labels
        for (const healthLabel of userHealthLabels) {
            if (recipe[2].includes(healthLabel[0])) {
                (recipeRanking.find((element) => element[0] === recipe[0]))[1] += recipe[3] * healthLabel[1];
            }
            else {
                (recipeRanking.find((element) => element[0] === recipe[0]))[1] -= (1.0 / recipe[3]) * healthLabel[1];
            }
        }
    }

    // We return the recipe ranking to the merge sort or heap sort function
    // to be sorted. Then we show it to the screen.
    return recipeRanking;
}
