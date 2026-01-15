import {useState} from "react";

const DeleteWorkout = ({athleteId, workoutId, onDelete}) => {

    const [status, setStatus] = useState(null);

    const handleDelete = () => {
        console.log("Deleting:", athleteId, workoutId); // Log IDs

        fetch(`/api/athletes/${athleteId}/workouts/${workoutId}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Delete failed");
                }
                setStatus("success")
                setTimeout(() => {
                    onDelete();
                }, 800);
            })
            .catch((error) => {
                console.error(error);
                setStatus("error");
            });
    }

    return(
        <div>
            <button onClick={handleDelete}>Delete</button>
            {status === "success" && <span style={{ color: "green" }}>Deleted</span>}
            {status === "error" && <span style={{ color: "red" }}>Error</span>}
        </div>
    )
}

export default DeleteWorkout;