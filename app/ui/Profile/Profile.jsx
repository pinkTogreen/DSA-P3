import styles from './Profile.module.css';
import { useEffect } from 'react';
export default function Profile(props) {
    useEffect(() => {
        // console.log("Profile Info: ", props);
    }, []);

    const handleEdit = (e) => {
        // console.log("ABC");
        props.edit();
    }

    return (
        <div onClick={e => handleEdit()} className={styles.profile}>
            <div className={styles.header}>
                <div className={styles.picture}></div>
                <label className={styles.name}>{props.profile.name}</label>
            </div>
            <div className={styles.blocks}>
                <div className={styles.block}>
                    <label>Food</label>
                    <div>
                        {/* Loading alll the Food Selections */}
                        {
                            props.profile.food.split(", ").map((f) => (
                                <span>{f.charAt(0).toUpperCase() + f.slice(1)}</span>
                            ))
                        }
                    </div>
                </div>
                <div className={styles.block}>
                    <label>Diet</label>
                    <div>
                        {/* Loading all the Diet Selections */}
                        {
                            props.profile.diet.map((d) => (
                                <span>{d[1]}</span>
                            ))
                        }
                    </div>
                </div>
                <div className={styles.block}>
                    <label>Health</label>
                    <div>
                        {/* Loading all the Health Selections */}
                        {
                            props.profile.health.map((h) => (
                                <span>{h[1]}</span>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}