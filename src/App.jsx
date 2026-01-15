import './App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Layout from "./components/Layout.jsx";
import Home from "./components/Home.jsx";
import ListAthletes from "./components/ListAthletes.jsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="athletes" element={<ListAthletes />}/>
                </Route>


            </Routes>
        </BrowserRouter>

    )
}

export default App
