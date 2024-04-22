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
    const dietTypes = [[0, "low-carb"], [1, "low-sodium"], [2, "low-fat"], [3, "high-fiber"]]; //More kinds of diets and health types can be added later

    // This is the same as dietTypes, but for types of health.
    const healthTypes = [[4, "alcohol-free"], [5, "dairy-free"], [6, "gluten-free"], [7, "kosher"], [8, "paleo"], [9, "pescaterian"], [10, "vegan"], [11, "vegetarian"]];

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

    // Anytime the formData variable changes, it will be logged to the console (look in your browser).
    useEffect(() => {
        console.log(formData);
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
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                    <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/>
                </svg>
                {props.data != null ? `Edit ${formData["name"]}` : "Add"} Profile
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
                <button onClick={e => addProfile(e)} className={styles.create}>{props.data != null ? `Save` : "Add"}</button>
                <button className={styles.cancel} onClick={e => props.close(false)}>Cancel</button>
            </div>
        </div>
    )
}