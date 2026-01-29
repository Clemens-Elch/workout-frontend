import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import DeleteWorkout from "./DeleteWorkout.jsx";

const AthletesWorkout = () => {
    const {athleteId} = useParams();
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mode, setMode] = useState("comp");
    const [intensities, setIntensities] = useState({});


    useEffect(() => {
        fetch(`/api/athletes/${athleteId}/workouts`)
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

    useEffect(() => {
        if (workouts.length === 0) return;

        const fetchIntensities = async () => {
            const newIntensities = {};

            for (const workout of workouts) {
                try {
                    const res = await fetch(
                        `/api/athletes/${athleteId}/workouts/${workout.workoutId}/intensity?mode=${mode}`
                    );
                    if (!res.ok) throw new Error("Failed to fetch intensity");
                    const value = await res.json();
                    console.log(`Workout ${workout.workoutId} - Intensity (${mode}):`, value);
                    newIntensities[workout.workoutId] = value;
                } catch (err) {
                    console.error("Intensity fetch error:", err);
                    newIntensities[workout.workoutId] = null;
                }
            }

            setIntensities(newIntensities);
        };

        fetchIntensities();
    }, [workouts, mode, athleteId]);


    const getDeleteButton = (id) => (
        <DeleteWorkout
            athleteId={athleteId}
            workoutId={id}
            onDelete={() => {
                setWorkouts((prev) => prev.filter((w) => w.workoutId !== id));
            }}
        />
    );

    // Loading and error handling before render
    if (loading) return <p>Loading workouts...</p>;
    if (error) return <p>Error loading workouts: {error.message}</p>;

    const getIntensityColor = (intensity) => {
        switch (intensity) {
            case "HIGH":
                return "red";
            case "MEDIUM":
                return "lightyellow";
            case "LOW" :
                return "lightgreen";
            default:
                return "grey"
        }
    };


        return (
            <div>
                <h2 style={{fontWeight: "bold"}}>Workouts</h2>
                <div style={{ marginBottom: "1rem", marginLeft: "40px" }}>
                    <strong>Intensity Mode: </strong>
                    <label style={{ marginRight: "1rem" }}>
                        <input
                            type="radio"
                            value="comp"
                            checked={mode === "comp"}
                            onChange={() => setMode("comp")}
                        />
                        Complex
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="simp"
                            checked={mode === "simp"}
                            onChange={() => setMode("simp")}
                        />
                        Simple
                    </label>
                </div>

                <div>
                    <ul style={{listStyleType: "none"}}>
                        {workouts.map((workout) => (
                            <li key={workout.workoutId} style={{
                                border: "1px solid black", marginRight: "40px", marginLeft: "40px",
                                backgroundColor: getIntensityColor(intensities[workout.workoutId])
                            }}>
                                <div style={{display: "flex", "justifyContent": "space-between", alignItems: "center"}}>
                                    <div style={{flex: 2, textAlign: "left", marginLeft: "20px", fontWeight: "bold"}}>
                                        {workout.sport}
                                    </div>
                                    <div style={{textAlign: "center", flex: 4}}>
                                        {workout.startPoint} - {workout.endPoint}
                                    </div>
                                    <div className="badge, bg-secondary rounded-pill text-white p-2"
                                         style={{textAlign: "center", marginRight: "1rem"}}>
                                        {workout.averageHF}
                                    </div>
                                    <div style={{textAlign: "right", marginRight: "20px", flex: 2, padding: "15px"}}>
                                        {getDeleteButton(workout.workoutId)}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>


        );
    };
    export default AthletesWorkout