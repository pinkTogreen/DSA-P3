'use client';

import { useState, useEffect } from "react";
import styles from '@/app/page.module.css';

const APP_KEY = "17b530ac3aaeb0a8ef3db162733ad849";
const APP_ID = "90dadc9b";

const createURL = async (parameters) => {
    let URL = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`;
    for (const key of Object.keys(parameters)) {
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

export default function Page() {
    const [formData, setFormData] = useState({
        "food": "",
        "diet": "",
        "health": ""
    });

    // [1, 2, 3]
    // [4, 5]
    // [1, 2, 3, ...[4, 5]]
    // [1, 2, 3, 4, 5]

    const handleChange = (event) => {
        const {name, value} = event.target;
        console.log(name);
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const parameters = {
            "q": formData["food"].replace(" ", "%20"),
            "diet": formData["diet"].replace(" ", "%20"),
            "health": formData["health"].replace(" ", "%20")
        };

        console.log(parameters);
        createURL(parameters);
    }

    useEffect(() => {
        console.log("Hello");
        console.log(formData);
    }, [formData])

    return (
        <div>
            <p>Enter Food:</p>
            <input name="food" onChange={(e) => handleChange(e)} type="text"/>
            <p>Enter Diet:</p>
            <input name="diet" onChange={(e) => handleChange(e)} type="text"/>
            <p>Enter Health:</p>
            <input name="health" onChange={(e) => handleChange(e)} type="text"/>
            <button className={styles.button} onClick={(e) => handleSubmit(e)}>Submit</button>
        </div>
    )
}