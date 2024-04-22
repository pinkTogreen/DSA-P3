'use client';

const APP_KEY = "17b530ac3aaeb0a8ef3db162733ad849";
const APP_ID = "90dadc9b";

export const getResults = async (profiles, numResultsPerProfile) => {
    // declare the URL parameters
    const q = [];
    const diet = [];
    const health = [];

    // declare the map for the results and their ratings
    var ratingsMap = new Map();
    var rating = 1;

    // for each profile, call the api to get the maxResults number of hits
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
    
        // Creating the parameters for the URL
        const parameters = {
            // FIXME: will not return a valid URL if there is a comma separated list in q
            "q": q.join(''),
            "diet": diet.join('&diet='),
            "health": health.join('&health=')
        }

        // creating the URL
        let URL = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`;
        for (const key of Object.keys(parameters)) {
            if (parameters[key] != "") {
                URL += `&${key}=${parameters[key]}`;
            }
        }
        console.log("URL: " + URL);

        // calling the api
        const request = new Request(URL)
        const response = await fetch(request);
        const result = await response.json();
        console.log(result);

        // iterate through the recipe results in JSON
        for (const recipe of result.hits) {
            // FIXME: calculate ratings
            const newRating = rating + 1;
            rating = rating + 1;
            // map the rating to the object
            ratingsMap.set(newRating, recipe);
        }
        // keep iterating through the results making successive calls to the api
        // to go to the next page (only 20 are stored per page), until the maxResult is reached or we run out of results
        while (ratingsMap.size < numResultsPerProfile) {
            if (Object.hasOwn(result["_links"], "next")) {
                console.log("Next URL: " + result["_links"]["next"]);
                let _response = await fetch(result["_links"]["next"]["href"]);
                let _result = await _response.json();
                console.log(result);

                // iterate through the recipe results in JSON
                for (const recipe of _result.hits) {
                    // calculate ratings
                    const newRating = rating + 1;
                    rating = rating + 1;
                    // map the rating to the object
                    ratingsMap.set(newRating, recipe);
                }
            }
            else {
                break;
            }
        }
    }

    // returns the map from the setRatings function
    return ratingsMap;
}