import { useEffect, useState } from "react";

const formatDate = (input) => {
    const date = new Date(input);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

const CreateWorkout = () => {
    const [athletes, setAthletes] = useState([]);
    const [selectedAthlete, setSelectedAthlete] = useState("");
    const [sport, setSport] = useState("");
    const [avgHeartRate, setAvgHeartRate] = useState(0);
    const [startPoint, setStartPoint] = useState("");
    const [endPoint, setEndPoint] = useState("");
    const [status, setStatus] = useState(null);

    // Load athletes on mount

    useEffect(() => {
        fetch("/api/athletes")
            .then((res) => res.json())
            .then((data) => setAthletes(data))
            .catch((err) => console.error("Failed to load athletes", err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedAthlete) return;

        // Validate time logic
        if (new Date(endPoint) <= new Date(startPoint)) {
            setStatus("error");
            alert("End time must be after start time.");
            return;
        }

        const payload = {
            sport,
            averageHF: Number(avgHeartRate),
            startPoint: formatDate(startPoint),
            endPoint: formatDate(endPoint),
        };


        fetch(`/api/athletes/${selectedAthlete}/workouts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Create failed");
                setStatus("success");
                // Reset form
                setSelectedAthlete("");
                setSport("");
                setAvgHeartRate("");
                setStartPoint("");
                setEndPoint("");
            })
            .catch((err) => {
                console.error(err);
                setStatus("error");
            });
    };

    return (
        <div className="container">
            <h2 className="fw-bold">Create a New Workout</h2>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-md-4">
                        <label className="form-label">Athlete:</label>
                        <select
                            className="form-select"
                            value={selectedAthlete}
                            onChange={(e) => setSelectedAthlete(e.target.value)}
                            required
                        >
                            <option value="">Select athlete</option>
                            {athletes.map((athlete) => (
                                <option key={athlete.athleteId} value={athlete.athleteId}>
                                    {athlete.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Sport:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={sport}
                            onChange={(e) => setSport(e.target.value)}
                            required
                        />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Average Heart Rate:</label>
                        <input
                            type="number"
                            className="form-control"
                            value={avgHeartRate}
                            onChange={(e) => setAvgHeartRate(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Start Point:</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            value={startPoint}
                            onChange={(e) => setStartPoint(e.target.value)}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">End Point:</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            value={endPoint}
                            onChange={(e) => setEndPoint(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Save</button>

                {status === "success" && (
                    <div className="text-success mt-2">Workout created successfully!</div>
                )}
                {status === "error" && (
                    <div className="text-danger mt-2">Failed to create workout.</div>
                )}
            </form>
        </div>
    );
};

export default CreateWorkout;
