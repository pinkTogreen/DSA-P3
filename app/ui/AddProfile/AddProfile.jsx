import styles from './AddProfile.module.css';
import { useState, useEffect } from 'react';

export default function AddProfile(props) {
    // This represents the data contained in this form, that is the name of the profile, the ingredients or foods, the diet, and the health.
    // I've initialized the data this is form is going to take in.
    const [formData, setFormData] = useState({
        name: "",
        // Food is not going to be an array because we're not loading in values, the user will just enter in a list.
        food: "",
        diet: [],
        health: []
    });

    // This represents all the types of diet the API provides.
    // Inside of the array are arrays with two values.
    // The first value in the inner array represents the value that the API recognizes.
    // The second value in the inner array represents the value that we want to show to the screen.
    // For example: [[100, "strawberry"], [101, "oranges"]].
    // https://developer.edamam.com/edamam-docs-recipe-api
    const dietTypes = [
        ["balanced", "Balanced"], 
        ["high-fiber", "High-Fiber"], 
        ["high-protein", "High-Protein"], 
        ["low-carb", "Low-Carb"], 
        ["low-fat", "Low-Fat"], 
        ["low-sodium", "Low-Sodium"]
    ];

    // This is the same as dietTypes, but for types of health.
    // There's a lot of health types and I do not feel like typing everything out.
    // Feel free to add in the rest. I've added what I believe to be the most popular.
    // https://developer.edamam.com/edamam-docs-recipe-api
    const healthTypes = [
        ["alcohol-free", "Alcohol-Free"], 
        ["dairy-free", "Dairy-Free"], 
        ["DASH", "DASH"],
        ["egg-free", "Egg-Free"],
        ["fish-free", "Fish-Free"],
        ["gluten-free", "Gluten-Free"],
        ["peanut-free", "Peanut-Free"],
        ["red-meat-free", "Red-Meat-Free"],
        ["vegan", "Vegan"],
        ["vegetarian", "Vegetarian"]
    ];

    // This function will be called every time a single-value input (name, food) is changed.
    // This function will basically update the variable formData.
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    }

    // This function will be called every time a multiple-value input (diet, health) is changed.
    // This function will also update the variable formData.
    const handleMultipleInputChange = (event) => {
        const {name, value} = event.target;

        // If the data for the input (identified by name) already includes the value,
        // that must mean the user is trying to remove the value. So, we remove the value.
        // Else, this must mean the user is trying to add the value.
        let updatedValues = [];
        let found = false;
        for (let i = 0; i < formData[name].length; i++) {
            // The existing values already contain the value -> remove.
            if (formData[name][i][0] == value[0]) {
                found = true;
            }
            else {
                updatedValues.push(formData[name][i]);
            }
        }
        // The existing values do not contain the value -> add.
        if (!found) {
            updatedValues.push(value);
        }
        
        let newFormData = {...formData, [name]: updatedValues};
        if (found) {
            delete newFormData[`range-${value[0]}`];
        }
        else {
            newFormData[`range-${value[0]}`] = 0;
        }
        setFormData(newFormData);
    }

    // When the user clicks the "Add Profile" button, this function will be called.
    // This function will used the function passed in by the parent to update the profiles.
    // We will also close the form.
    const addProfile = (event) => {
        if (formData["name"] == null || formData["name"] == "") {
            alert("Please enter name.");
            return;
        }
        props.addProfile(formData);
        props.close(false);
    }

    // Delete a profile, felt like this was nice to have.
    const deleteProfile = (event) => {
        props.deleteProfile(formData["name"]);
        props.close(false);
    }

    // Anytime the formData variable changes, it will be logged to the console (look in your browser).
    useEffect(() => {
        // console.log(formData);
    }, [formData]);

    // When editing a profile.
    useEffect(() => {
        if (props.data != null) {
            setFormData(props.data);
        }
    }, [])

    return (
        <div className={styles.container}>
            <h2>
                {props.data != null ? `Edit ${formData["name"]}'s` : "Add"} Profile
                <svg onClick={deleteProfile} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
            </h2>
            <div className={styles.textInput}>
                <label>Name</label>
                <input required onChange={handleInputChange} name="name" value={formData["name"]} placeholder="Enter name" type="text"/>
            </div>
            <div className={styles.textInput}>
                <label>Food</label>
                <input required onChange={handleInputChange} name="food" value={formData["food"]} placeholder="Enter comma separated list of foods" type="text"/>
            </div>
            <div className={styles.multipleInput}>
                <label>Diet</label>
                <div className={styles.checkboxContainer}>
                    {
                        dietTypes.map((type) => (
                            <div className={styles.checkbox}>
                                <input checked={formData["diet"].findIndex((i) => i[0] == type[0]) != -1} onChange={e => handleMultipleInputChange({target: {name: "diet", value: type}})} name="diet" value={type[0]} type="checkbox" id={type[0]}/>
                                <label name="diet" for={type[0]}>{type[1]}</label>
                            </div>
                        ))
                    }
                </div>
            </div>
            {
                formData["diet"].length > 0 &&
                <div className={styles.rangeInput}>
                    <label>Diet Ratings</label>
                        {
                            formData["diet"].sort((a, b) => a[1].localeCompare(b[1])).map((d) => (
                                <div className={styles.range}>
                                    <span>{`Enter Rating for ${d[1]}`}</span>
                                    <div>
                                        <input onChange={handleInputChange} value={formData[`range-${d[0]}`]} name={`range-${d[0]}`} type="range" id="points" min="0" max="5"/>
                                        <span>{formData[`range-${d[0]}`] == null ? 0 : formData[`range-${d[0]}`]}</span>
                                    </div>
                                </div>
                            ))
                        }
                </div>
            }
            <div className={styles.multipleInput}>
                <label>Health</label>
                <div className={styles.checkboxContainer}>
                    {
                        healthTypes.map((type) => (
                            <div className={styles.checkbox}>
                                {/* Possibly a bit confusing to understand, but we're mimicking an event type. */}
                                <input checked={formData["health"].findIndex((i) => i[0] == type[0]) != -1} onChange={e => handleMultipleInputChange({target: {name: "health", value: type}})} name="health" value={type[0]} type="checkbox" id={type[0]}/>
                                <label name="health" for={type[0]}>{type[1]}</label>
                            </div>
                        ))
                    }
                </div>
            </div>
            {formData["health"].length > 0 && 
                <div className={styles.rangeInput}>
                <label>Health Ratings</label>
                    {
                        formData["health"].sort((a, b) => a[1].localeCompare(b[1])).map((d) => (
                            <div className={styles.range}>
                                <span>{`Enter Rating for ${d[1]}`}</span>
                                <div>
                                    <input value={formData[`range-${d[0]}`]} onChange={handleInputChange} name={`range-${d[0]}`} type="range" id="points" min="0" max="5"/>
                                    <span>{formData[`range-${d[0]}`] == null ? 0 : formData[`range-${d[0]}`]}</span>
                                </div>
                            </div>
                        ))
                    }
            </div>
            }
            
            <div className={styles.buttons}>
                <button onClick={e => addProfile(e)} className={styles.create}><p>{props.data != null ? `Save` : "Add"}</p></button>
                <button className={styles.cancel} onClick={e => props.close(false)}><p>Cancel</p></button>
            </div>
        </div>
    )
}