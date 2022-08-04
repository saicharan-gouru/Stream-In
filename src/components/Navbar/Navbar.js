import "./Navbar.css";
import {Link,useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
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
            {user ? <LogoutIcon className="logout-btn" onClick={logoutHandler} >Logout</LogoutIcon> : <Link to="/login" className="login-btn"><LoginIcon></LoginIcon></Link>}
        </div>
    )
}

export {Navbar};