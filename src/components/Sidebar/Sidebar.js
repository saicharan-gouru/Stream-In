import "./Sidebar.css";
import {Link} from "react-router-dom";
import {useData} from "../../contexts";


function Sidebar(){

    const {videosDispatch} = useData();

    return(
        <div className="sidebar">
            <Link className="nav-link" to="/">Home</Link>
            <Link onClick={()=>videosDispatch({type:"FILTER_ALL"})} className="nav-link" to="/videos">Explore</Link>
            <Link className="nav-link" to="/liked">Liked</Link>
            <Link className="nav-link" to="/playlists">Playlists</Link>
            <Link className="nav-link" to="/watchlater">Watchlater</Link>
            <Link className="nav-link" to="/history">History</Link>
        </div>
    )
}

export {Sidebar};