import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const AthletesWorkout = () => {
    const { athleteId } = useParams();
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/athletes/${athleteId}/workouts`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Failed to fetch workout");
            })
            .then((data) => {
                setWorkouts(data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [athleteId]);
    console.log("athleteId:", athleteId);


    // Loading and error handling before render
    if (loading) return <p>Loading workouts...</p>;
    if (error) return <p>Error loading workouts: {error.message}</p>;

    return (
        <div>
            <h2 style={{fontWeight: "bold"}}>Workouts</h2>
            <div>
                <ul>
                    {workouts.map((workout, i) => (
                        <li key={i}  style={{border: "1px solid black"}}>
                            <div style={{textAlign: "left"}}>
                                {workout.sport}
                            </div>
                            <div style={{textAlign: "center"}}>
                                {workout.startPoint} - {workout.endPoint}
                            </div>
                            <div style={{textAlign: "right"}}>
                                {workout.averageHF}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>


    );
};
export default AthletesWorkout