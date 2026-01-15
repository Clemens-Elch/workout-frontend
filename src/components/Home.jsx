import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h3>Welcome to the workout!</h3>
            <p>Athletes:
                <Link to="/listAthletes" style={{marginLeft: "5px"}}>here</Link>
            </p>
        </div>
    )
};

export default Home;