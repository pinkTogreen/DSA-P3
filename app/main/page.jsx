'use client';

import styles from '@/app/page.module.css';
import { useState, useEffect } from 'react';
import AddProfile from '../ui/AddProfile/AddProfile';
import Profile from '../ui/Profile/Profile';

const APP_KEY = "17b530ac3aaeb0a8ef3db162733ad849";
const APP_ID = "90dadc9b";

export let jsonResponse;

export default function Page() { // entry point
    const [showAddProfile, setShowAddProfile] = useState(false);
    const [profiles, setProfiles] = useState({});
    const [result, setResult] = useState("");

    const addProfile = (name, profile) => { // takes input from each user and stores them in profiles
        setProfiles({...profiles, [name]: profile});
    }

    const generateResults = async () => { // gets parameters from each user and places them into the api search
        const q = [];
        const diet = [];
        const health = [];

        for (const profile of Object.values(profiles)) { // after adding all profiles, insert them into the parameters
            q.push(...[profile["food"]]);
            diet.push(...profile["diet"]);
            health.push(...profile["health"]);
        }


        const parameters = {//function to append input into URL
            "q": q.join('%20'),
            "diet": diet.join('&diet='),
            "health": health.join('&health=')
        }

        let URL = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`;
        for (const key of Object.keys(parameters)) {
            if (parameters[key] != "") // we only want to add exising parameters
                URL += `&${key}=${parameters[key]}`; 
        }

    
        console.log(URL); // just for testing

        const response = await fetch(URL); // "await" keyword prevents successive code from executing while we are making the API requests
        let result = await response.json();
        console.log(result); // just for testing, prints the response to the console
        

        while (true) {
            if (Object.hasOwn(result, "_links") && Object.hasOwn(result["_links"], "next")) {
                console.log(result["_links"]["next"]);
                let _response = await fetch(result["_links"]["next"]["href"]);
                let _result = await _response.json();
                result = _result;
                console.log(result);
            }
            else {
                break;
            }
        }

    }

    useEffect(() => { // gets input from the site and records it in the profiles
        console.log(profiles);
    }, [profiles]);

    return ( // the page we return
        <div>
            <h1>Nutrition Nexus</h1>
            {showAddProfile && 
                <AddProfile
                    addProfile={addProfile}
                    close={() => setShowAddProfile(false)}
                />
            }
            <div className={styles.profiles}>
                {
                    Object.keys(profiles).map((profile, index) => (
                        <Profile key={index} info={profiles[profile]}/>
                    ))
                }
            </div>
            <button onClick={(e) => setShowAddProfile(true)} className={styles.button}>Add a Profile</button>
            <button onClick={generateResults}>Generate Results</button>
            <div>{result}</div>
        </div>
    )
}