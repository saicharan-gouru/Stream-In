import "./Navbar.css";
import {Link,useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts";
import LiveTvIcon from '@mui/icons-material/LiveTv';

import {triggerToast} from "../../services";


function Navbar(){

    const {user,setUser} = useAuth();
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("token");
        setUser(null);
        triggerToast("success","logout successsful")
        navigate("/");
      };

    return(
        <div className="nav-bar">
            <Link to="/" className="title"><h1><LiveTvIcon></LiveTvIcon> StreamIn </h1></Link>
            {user ? <button className="button primary-red" onClick={logoutHandler} >Logout</button> : <Link to="/login"><button className="button primary-green">Login</button></Link>}
        </div>
    )
}

export {Navbar};