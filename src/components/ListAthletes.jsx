import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const ListAthletes = () => {

        const [athletes, setAthletes] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
            fetch("http://localhost:8080/athletes")
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error("Failed to fetch athletes");
                })
                .then((data) => {
                    setAthletes(data);
                })
                .catch((error) => {
                    console.error("Error fetching data: ", error);
                    setError(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }, []);
        // The empty array [] ensures this useEffect runs only once

        //  Loading and error handling before render
        if (loading) return <p>Loading athletes...</p>;
        if (error) return <p>Error loading athletes: {error.message}</p>;

        return (
            <div>
                <h2 style={{fontWeight: "bold"}}>Athletes</h2>
                <div>
                    <ul>
                        {athletes.map((athlete, index) => (
                            <li key={index}  style={{border: "1px solid black"}}>
                                <div style={{textAlign: "center"}}>
                                    {athlete.name} ({athlete.dateOfBirth})
                                </div>
                                <div style={{textAlign: "right"}}>
                                    <Link to={`/athletes/${athlete.athleteId}/workouts`}>Show Workouts</Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                </div>


        );
    };

export default ListAthletes;