import styles from './AddProfile.module.css';
import { useState, useEffect } from 'react';

export default function AddProfile(props) {

    const [formData, setFormData] = useState({
        "name": "",
        "food": "",
        "diet": [],
        "health": []
    });

    
    const handleChange = (event) => {
        const {name, value} = event.target;

        // multi valued inputs
        if (name == "diet" || name == "health") {
            if (formData[name].includes(value)) {
                //deselect
                console.log("\tDeselect");
                console.log("\tValue to Remove: " + value);
                let indexOfValue = formData[name].indexOf(value)
                let updatedArray = formData[name].slice(0, indexOfValue).concat(formData[name].slice(indexOfValue + 1));
                console.log("\tNew Array w/o Element: ", updatedArray);
                setFormData({...formData, [name]: updatedArray});
            }
            else {
                //select
                setFormData({...formData, [name]: formData[name].concat([value])});
            }
        }
        else {
            // single valued inputs
            setFormData({...formData, [name]: value});
        }
    }

    const add = () => {
        props.addProfile(formData.name, formData);
        props.close();
    }

    useEffect(() => {
        console.log(formData);
    }, [formData])

    return (
        <div className={styles.profile}>
            <div onClick={props.close}>x</div>
            <h2>Add Profile</h2>
            <div className={styles.inputContainer}>
                <label>Name</label>
                <input onChange={handleChange} type="text" name="name"></input>
            </div>
            <div className={styles.inputContainer}>
                <label>Food</label>
                <input onChange={handleChange} type="text" name="food"></input>
            </div>
            <div className={styles.inputContainer}>
                <label>Diet</label>
                <select onChange={handleChange} name="diet" multiple>
                    <option value="balanced">Balanced</option>
                    <option value="high-fiber">High-Fiber</option>
                    <option value="high-protein">High-Protein</option>
                    <option value="low-carb">Low-Carb</option>
                    <option value="low-fat">Low-Fat</option>
                    <option value="low-sodium">Low-Sodium</option>
                </select>
            </div>
            <div className={styles.inputContainer}>
                <label>Health</label>
                <select onChange={handleChange} name="health" multiple>
                    <option value="alcohol-cocktail">Alcohol-Cocktail</option>
                    <option value="alcohol-free">Alcohol-Free</option>
                    <option value="celery-free">Celery-Free</option>
                    <option value="dairy-free">Dairy-Free</option>
                    <option value="egg-free">Egg-Free</option>
                    <option value="gluten-free">Gluten-Free</option>
                </select>
            </div>
            <button onClick={add}>Save</button>
            <button onClick={props.close}>Cancel</button>
        </div>
    )
}