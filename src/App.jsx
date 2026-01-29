import './App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Layout from "./components/Layout.jsx";
import Home from "./components/Home.jsx";
import ListAthletes from "./components/ListAthletes.jsx";
import AthletesWorkout from "./components/AthletesWorkout.jsx";
import CreateWorkout from "./components/CreateWorkout.jsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="athletes" element={<ListAthletes />}/>
                    <Route path="athletes/:athleteId/workouts" element={<AthletesWorkout />}/>
                    <Route path="newWorkout" element={<CreateWorkout />}/>
                </Route>
            </Routes>
        </BrowserRouter>

    )
}

export default App
