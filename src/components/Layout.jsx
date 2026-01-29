import {Link, Outlet} from "react-router-dom";
import '../App.css';

function Layout() {
    return (
        <div>
            <header>
                <div className="bg-primary text-white w-100" style={{ padding: "25px 0" }}>
                    <h1 className="m-0 text-center">WorkoutDB</h1>
                </div>
            </header>
        <div className="App container-fluid">

                {/* Start navigation bar */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">WorkoutDB</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/athletes">Athletes</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/newWorkout">New Workout</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {/* End navigation bar */}
                <main>
                    <Outlet/>
                </main>
            </div>
        </div>


    )
}

export default Layout;
