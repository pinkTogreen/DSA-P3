'use client';

import styles from '@/app/page.module.css';
import { useState, useEffect } from 'react';
import AddProfile from '../ui/AddProfile/AddProfile';
import Profile from '../ui/Profile/Profile';

const APP_KEY = "17b530ac3aaeb0a8ef3db162733ad849";
const APP_ID = "90dadc9b";

export default function Page() {
    const [showAddProfile, setShowAddProfile] = useState(false);
    const [profiles, setProfiles] = useState({});
    const [result, setResult] = useState("");

    const addProfile = (name, profile) => {
        setProfiles({...profiles, [name]: profile});
    }

    const generateResults = async () => {
        const q = [];
        const diet = [];
        const health = [];

        for (const profile of Object.values(profiles)) {
            console.log(q);
            console.log(profile["food"]);
            q.push(...[profile["food"]]);
            console.log(q);
            diet.push(...profile["diet"]);
            health.push(...profile["health"]);
        }

        console.log(q.join('%20'));

        const parameters = {
            "q": q.join('%20'),
            "diet": diet.join('&diet='),
            "health": health.join('&health=')
        }
        console.log(parameters);

        let URL = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`;
        for (const key of Object.keys(parameters)) {
            if (parameters[key] != "")
                URL += `&${key}=${parameters[key]}`; 
        }

    
        console.log(URL);

        const response = await fetch(URL);
        let result = await response.json();
        console.log(result);

        while (true) {
            console.log(":o");
            if (Object.hasOwn(result, "_links") && Object.hasOwn(result["_links"], "next")) {
                console.log(result["_links"]["next"]);
                let _response = await fetch(result["_links"]["next"]["href"]);
                let _result = await _response.json();
                result = _result;
                console.log(result);
            }
            else {
                console.log("!!!");
                break;
            }
        }
        console.log(":-<");

    }

    useEffect(() => {
        console.log(profiles);
    }, [profiles]);

    return (
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