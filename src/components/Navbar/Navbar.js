import "./Navbar.css";
import {Link} from "react-router-dom";

function Navbar(){
    return(
        <div className="nav-bar">
            <Link to="/" className="title"><h1>Stream In</h1></Link>
            <Link to="/login" className="login-btn">Login/Signup</Link>
        </div>
    )
}

export {Navbar};