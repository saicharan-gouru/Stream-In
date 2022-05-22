import "./Sidebar.css";
import {Link} from "react-router-dom";


function Sidebar(){
    return(
        <div className="sidebar">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/videos">Explore</Link>
            <Link className="nav-link" to="/liked">Liked</Link>
            <Link className="nav-link" to="/playlists">Playlists</Link>
            <Link className="nav-link" to="/watchlater">Watchlater</Link>
            <Link className="nav-link" to="/history">History</Link>
        </div>
    )
}

export {Sidebar};