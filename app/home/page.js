'use client';

import styles from "../home.module.css";
import { useState, useEffect } from "react";
import AddProfile from "../ui/AddProfile/AddProfile";
import Profile2 from "../ui/Profile2/Profile2";
import { getResults } from "../lib/edamam";
import Heapsort from "../Heapsort/Heapsort";
import Mergesort from "../Mergesort/Mergesort";

export default function Page() {
    // Used to toggle the form to add a profile.
    // When it's true, the form will show. When it's false, the form will not.
    const [showAddProfile, setShowAddProfile] = useState(false);

    // Contains an array of objects that represent profiles.
    const [profiles, setProfiles] = useState([]);

    // Contains the name of the profile to be edited
    const [editProfileName, setEditProfileName] = useState("");

    // Recipes that resulted from generation are stored in this array,
    // where they can be printed to the screen.
    const [recipes, setRecipes] = useState(null);

    // For looking through each of the recipes.
    const [recipeIndex, setRecipeIndex] = useState(0);

    // How long it took to generate the results,
    // I couldn't think of a better name
    const [generationTime, setGenerationTime] = useState(null);
    const [heapsortTime, setHeapsortTime] = useState(null);
    const [mergesortTime, setMergesortTime] = useState(null);

    // For the more/less calories, and more/less ingredients options
    const [moreCalories, setMoreCalories] = useState(true);
    const [moreIngredients, setMoreIngredients] = useState(false);

    const [showInformation, setShowInformation] = useState(false);

    const incrementIndex = () => {
        if (recipeIndex + 1 >= recipes.length) {
            setRecipeIndex(0);
        }
        else {
            setRecipeIndex(recipeIndex + 1);
        }
    }

    const decrementIndex = () => {
        if (recipeIndex - 1 < 0) {
            setRecipeIndex(recipes.length - 1);
        }
        else {
            setRecipeIndex(recipeIndex - 1);
        }
    }

    // The AddProfile component will call this to add a profile.
    const addProfile = (profile) => {
        setProfiles({...profiles, [profile.name]: profile});
    }

    // The AddProfile component will also call this to add a profile.
    const deleteProfile = (name) => {
        let prev = profiles;
        delete prev[name];
        setProfiles(prev);
    }

    // Function called when the user presses the generate result button.
    const generateResults = async () => {
        if (profiles.length == 0) {
            alert("Please enter at least one profile to generate results.");
            return;
        }
        const start = new Date();
        const rankedRecipes = await getResults(profiles, moreCalories, moreIngredients);
        const end = new Date();
        const millisecondsElapsed = end - start;
        setGenerationTime(millisecondsElapsed);

        // This is where the sorting would come in.
        // Like we'd sort it by the ranks (second element in the index).
        // To find out more, check the console.log.
        const start2 = new Date();
        Heapsort(rankedRecipes);
        const end2 = new Date();
        const millisecondsElapsed2 = end2 - start2;
        setHeapsortTime(millisecondsElapsed2);

        const start3 = new Date();
        Mergesort(rankedRecipes);
        const end3 = new Date();
        const millisecondsElapsed3 = end3 - start3;
        setMergesortTime(millisecondsElapsed3);

        console.log("After Recipe Sorting", rankedRecipes);
        // Finally, display results to the screen
        setRecipes(rankedRecipes);
    }

    return (
        <div className={styles.wrapper}>
            {showAddProfile && <AddProfile addProfile={addProfile} deleteProfile={deleteProfile} close={setShowAddProfile} data={profiles[editProfileName]}/>}
            {/* Navigation Bar */}
            <nav className={styles.nav}>
                <div>
                    <span>Nutrient Nexus</span>
                </div>
                <div>
                    <span>Alana BW</span>
                    <span>Jaidyn H</span>
                    <span>Hailey P</span>
                </div>
            </nav>
            <button className={styles.collapseButton} onClick={e => {setShowInformation(!showInformation)}}>⌄ Project Information ⌄</button>
            <InformationDisplay
                isDisplayed={showInformation}
            />
            <div className={styles.body}>
                {/* Bar to Show Profiles */}
                <div className={styles.sidebar}>
                    <h3 className={styles.header}>Profiles</h3>
                    {
                        Object.keys(profiles).length == 0 &&
                        <div className={styles.profileMessage}>
                            <p>BUT FIRST!</p>
                            <p>{"Make a profile (or more) to get great recipes."}</p>
                        </div>
                    }
                    {
                        Object.keys(profiles).length != 0 &&
                        <div className={styles.profileWrapper}>
                            {
                                Object.keys(profiles).length != 0 &&
                                <div className={styles.profileContainer}>
                                    {Object.values(profiles).map((p) => (
                                        <Profile2 edit={e => {setEditProfileName(p.name); setShowAddProfile(true)}} profile={p}/>
                                    ))}
                                </div>
                            }
                        </div>
                    }
                    <div className={styles.options}>
                        <label className={moreCalories ? styles.selectedOption : ""} onClick={e => setMoreCalories(true)}>More Calories</label>
                        <label className={!moreCalories ? styles.selectedOption : ""} onClick={e => setMoreCalories(false)}>Less Calories</label>
                    </div>
                    <div className={styles.options}>
                        <label className={moreIngredients ? styles.selectedOption : ""} onClick={e => setMoreIngredients(true)}>More Ingredients</label>
                        <label className={!moreIngredients ? styles.selectedOption : ""} onClick={e => setMoreIngredients(false)}>Less Ingredients</label>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button onClick={setShowAddProfile} className={styles.addButton}><p>Add Profile</p></button>
                        <button onClick={generateResults} className={styles.generateButton}><p>Generate Results</p></button>
                        {generationTime != null && <span>Generated results in {generationTime}ms</span>} <br></br>
                        {heapsortTime != null && <span>Heapsort in {heapsortTime}ms</span>} <br></br>
                        {mergesortTime != null && <span>Mergesort in {heapsortTime}ms</span>}
                    </div>
                </div>
                {/* Result Section */}
                <div className={styles.outputContainer}>
                    {recipes != null &&
                    <div className={styles.result}>
                        <h3>Result</h3>
                        <div className={styles.recipe}>
                            <div onClick={decrementIndex}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                                </svg>
                            </div>
                            <div className={styles.recipeView}>
                                <span>{recipeIndex+1}/{recipes == null ? 0 : recipes.length} Recipes</span>
                                <img src={recipes[recipeIndex] != null ? recipes[recipeIndex][2].image : ""}></img>
                                <h4>{recipes[recipeIndex] != null && recipes[recipeIndex][2].label}</h4>
                            </div>
                            <div onClick={incrementIndex}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                                </svg>
                            </div>
                        </div>
                        <div className={styles.recipeInformation}>
                            <h5>{recipes[recipeIndex] != null && recipes[recipeIndex][2].label}</h5>
                            <p>Calories: {recipes[recipeIndex] != null && recipes[recipeIndex][2].calories.toPrecision(5)}</p>
                            <p>Number of Ingredients: {recipes[recipeIndex] != null && recipes[recipeIndex][2].ingredientLines.length}</p>
                            <p>Ingredients: {recipes[recipeIndex] != null && recipes[recipeIndex][2].ingredientLines.join(", ")}</p>
                            <p>Diet Labels: {recipes[recipeIndex] != null && recipes[recipeIndex][2].dietLabels.join(", ")}</p>
                            <p>Health Labels: {recipes[recipeIndex] != null && recipes[recipeIndex][2].healthLabels.join(", ")}</p>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

function InformationDisplay({isDisplayed}) {
    if (isDisplayed) {
      return <div className={styles.projectInfo}>
        <p className={styles.mainText}>
            <b>Nutrition Nexus</b> is a program to search for the most compatible recipes for multiple people!
            Each person's profile can specify food preferences, allergies, and dietary restrictions or diets.
            Then you can generate the results with your profiles to get recipes which are best suited to all.
            Add a profile to get started!
        </p>
        <p className={styles.subtext}>
            This is a project by Alana Walters, Jaidyn Holt, and Hailey Pham <br></br>
            for COP 3530 Data Structures and Algorithms, April 2024. <br></br>
            <br></br>
            It uses <a href="https://nextjs.org/" target="_blank">Next.js</a> bootstrapped with
            <a href="https://github.com/vercel/next.js/tree/canary/packages/create-next-app" target="_blank">`create-next-app`</a>
              and the <a href="https://developer.edamam.com/edamam-recipe-api" target="_blank">Edamam Recipe Search API</a>.
        </p>
      </div>
    }
    return <div></div>
  }