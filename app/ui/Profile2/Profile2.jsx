import { useEffect } from 'react';

export default function Profile2(props) {
    const handleEdit = (e) => {
        props.edit();
    }

    useEffect(() => {
        console.log(props);
    }, []);
    
    return (
        <div onClick={e => handleEdit()}>
            <h4>{props.profile.name}
            </h4>
            <div>
                <div>
                    <h5>Food</h5>
                    {/* Loading alll the Food Selections */}
                    {
                        props.profile.food.split(", ").map((f) => (
                            <p>{f.charAt(0).toUpperCase() + f.slice(1)}</p>
                        ))
                    }
                </div>
                <div>
                    <h5>Diet</h5>
                    {/* Loading all the Diet Selections */}
                    {
                        props.profile.diet.map((d) => (
                            <p>{`${d[1]} (${props.profile[`range-${d[0]}`]})`}</p>
                        ))
                    }
                </div>
                <div>
                    <h5>Health</h5>
                    {/* Loading all the Health Selections */}
                    {
                        props.profile.health.map((h) => (
                            <p>{`${h[1]} (${props.profile[`range-${h[0]}`]})`}</p>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}