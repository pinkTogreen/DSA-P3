'use client';

const APP_KEY = "17b530ac3aaeb0a8ef3db162733ad849";
const APP_ID = "90dadc9b";

export const getResults = async (profiles) => {
    const q = [];
    const diet = [];
    const health = [];

    for (const profile of Object.values(profiles)) {
        // Gathering up all the information
        q.push(...profile["food"]);
        // pushing the names of the diets and health (the second element in the subarrays)
        for (const dietGrouping of profile["diet"]) {
            diet.push(dietGrouping[1]);
        }
        for (const healthGrouping of profile["health"]) {
            health.push(healthGrouping[1]);
        }
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
    console.log("URL: " + URL);

    const MAX_RESULTS = 20;
    const allResults = [];

    const request = new Request(URL)
    const response = await fetch(request);
    const result = await response.json();
    console.log(result);

    /*
    while (true) {
        if (Object.hasOwn(result, _links) && Object.hasOwn(result["_links"], "next")) {
            console.log("Next URL: " + result["_links"]["next"]);
            let _response = await fetch(result["_links"]["next"]["href"]);
            let _result = await _response.json();
            console.log(result);
        }
        else {
            break;
        }
    }
    */

    // returns the map from the setRatings function
    return TestParsingJSON(result);

    //return SetRatings(result, q, diet, health);
}

function TestParsingJSON(resultsObj) {
    return resultsObj.from;
    const section = document.querySelector("section");
    const recipes = resultsObj;

    for (const recipe of recipes) {
      const myArticle = document.createElement("article");
      const name = document.createElement("h2");
      //const diets = document.createElement("ul");
      //const health = document.createElement("ul");
      const ingredients = document.createElement("ul");

      name.textContent = recipe.name;
      //diets.textContent = `Secret identity: ${hero.secretIdentity}`;
      //myPara2.textContent = `Age: ${hero.age}`;
      //myPara3.textContent = "Superpowers:";

      const ingredientsList = recipe.ingredients;
      for (const ingredient of ingredientsList) {
        const listItem = document.createElement("li");
        listItem.textContent = ingredient;
        ingredients.appendChild(listItem);
      }

      myArticle.appendChild(name);
      myArticle.appendChild(ingredients);

      section.appendChild(myArticle);
    }
}

// given the combined food, diets, and health of all profiles (compiled by the getResults function)
// map a rating to each results and return the map
function SetRatings(resultsObj, q, diet, health) {
    const ratingsMap = new Map();
    rating = 0;

    // iterate through the recipe results in JSON
    const recipes = resultsObj.hits;
    for (const recipe of recipes) {
        // calculate ratings
        const newRating = rating;
        rating = rating+1;

        // map the rating to the object
        ratingsMap.set(newRating, recipe);
    }
    return ratingsMap;
}