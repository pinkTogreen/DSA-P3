'use client';

const APP_KEY = "17b530ac3aaeb0a8ef3db162733ad849";
const APP_ID = "90dadc9b";

export const getResults = async (profiles) => {
    const q = [];
    const diet = [];
    const health = [];

    for (const profile of Object.values(profiles)) {
        // Gathering up all the information
        q.push(...[profile["food"]]);
        diet.push(...profile["diet"]);
        health.push(...profile["health"]);

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

        const response = await fetch(URL);
        let result = await response.json();
        console.log(result);

        return;

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
    }

    return 0;
}

export const filterResults = async (results) => {

}