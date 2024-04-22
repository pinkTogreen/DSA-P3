'use client';

import styles from "./page.module.css";
import Profile from "./ui/Profile/Profile";
import AddProfile from "./ui/AddProfile/AddProfile";
import { useState, useEffect } from "react";
import { getResults, setRatings } from "./lib/edamam";
import Heapsort from "./Heapsort/Heapsort";
import Mergesort from "./Mergesort/Mergesort";

export default function Page() {
  const [showInformation, setShowInformation] = useState(true);

  // Used to toggle the form to add a profile.
  // When it's true, the form will show. When it's false, the form will not.
  const [showAddProfile, setShowAddProfile] = useState(false);

  // Contains an array of objects that represent profiles.
  const [profiles, setProfiles] = useState({});

  // Contains the name of the profile to be edited
  const [editProfileName, setEditProfileName] = useState("");

  // The AddProfile component will call this to add a profile.
  const addProfile = (profile) => {
    setProfiles({...profiles, [profile.name]: profile});
  }

  useEffect(() => {
    console.log(profiles);
  }, [profiles]);

  const generateResults = () => {
    // get results: calls api to get results for every profile
    getResults(profiles);

    // sorts the results according to ratings and outputs them
    //Heapsort(ratedMap);
    //Mergesort(ratedMap);

  }

  useEffect(() => {
    console.log(editProfileName);
  }, [editProfileName])

  return (
    <section>
      {/* We're passing in the function to set showAddProfile so that we can close the form from inside the form by setting setShowAddProfile to false. */}
      {/* We also pass in the function to set the profiles so that the component can call it to add a profile when the 'Add Profile' button is clicked. */}
      {showAddProfile && <AddProfile addProfile={addProfile} close={setShowAddProfile} reset={setEditProfileName} data={profiles[editProfileName]}/>}
      <nav className={styles.nav}>
        <h1>
          Nutrition Nexus
        </h1>
        <div>
          <span>Jaidyn Holt</span>
          <span>Hailey Pham</span>
          <span>Alana Belnavis-Walters</span>
        </div>
      </nav>

      {/* Display the project information with button for toggling */}
      <button className={styles.collapseButton} onClick={e => {setShowInformation(!showInformation)}}>⌄ Project Information ⌄</button>
      <InformationDisplay
        isDisplayed={showInformation}
      />
      
      <div className={styles.container}>
        <div className={styles.profileContainer}>
          <div className={styles.header}>
            <h2>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
              </svg>Profiles
            </h2>
          </div>
          <div className={styles.profiles}>
            {
              Object.values(profiles).map((p) => (
                <Profile edit={e => {setEditProfileName(p.name); setShowAddProfile(true)}} profile={p}/>
              ))
            }
          </div>
          <button onClick={setShowAddProfile}>Add Profile</button>
          <button onClick={generateResults} className={styles.launch}>
            <label>Launch</label>
          </button>
        </div>
        <div className={styles.result}>
          <div>
            <h2>Results</h2>
            <div className={styles.resultBox}>
              <div>
                <h3>Merge Sort</h3>
              </div>
              <div>
                <h3>Heap Sort</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
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