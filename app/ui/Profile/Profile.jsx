import styles from './Profile.module.css';

export default function Profile(props) {
    return (
        <div className={styles.profile}>
            <p>{props.info.name}</p>
            <p>{props.info.food}</p>
            <p>{props.info.diet}</p>
            <p>{props.info.health}</p>
        </div>
    )
}