import "./Navbar.css";
import {Link,useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts";


function Navbar(){

    const {user,setUser} = useAuth();
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
      };

    return(
        <div className="nav-bar">
            <Link to="/" className="title"><h1>🎞️🍿 Stream In  👀📽</h1></Link>
            {user ? <button className="button primary-green hover-effect logout-btn" onClick={logoutHandler} >Logout</button> : <Link to="/login" className="login-btn">Login/Signup</Link>}
        </div>
    )
}

export {Navbar};