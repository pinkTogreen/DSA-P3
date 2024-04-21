'use client';

import styles from "./page.module.css";
import Profile from "./ui/Profile/Profile";
import AddProfile from "./ui/AddProfile/AddProfile";
import { useState, useEffect } from "react";
import { getResults } from "./lib/edamam";

export default function Page() {
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
    getResults(profiles);
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