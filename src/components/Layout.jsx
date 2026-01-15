import {Link, Outlet} from "react-router-dom";
import '../App.css';

function Layout() {
    return (
        <div className="App container-fluid">
            <div>
                {/* Start navigation bar */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">WorkoutDB</a>
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
                            </ul>
                        </div>
                    </div>
                </nav>
                {/* End navigation bar */}
            </div>
        </div>
    )
}

export default Layout;
