import "./Sidebar.css";
import {Link} from "react-router-dom";
import {useData} from "../../contexts";
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ListIcon from '@mui/icons-material/List';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import HistoryIcon from '@mui/icons-material/History';

function Sidebar(){

    const {videosDispatch} = useData();

    return(
        <div className="sidebar">
            <Link className="nav-link" to="/"><HomeIcon></HomeIcon>Home</Link>
            <Link onClick={()=>videosDispatch({type:"FILTER_ALL"})} className="nav-link" to="/videos"><ExploreIcon></ExploreIcon>Explore</Link>
            <Link className="nav-link" to="/liked"><ThumbUpAltIcon></ThumbUpAltIcon>Liked</Link>
            <Link className="nav-link" to="/playlists"><ListIcon></ListIcon>Playlists</Link>
            <Link className="nav-link" to="/watchlater"><WatchLaterIcon></WatchLaterIcon>Watchlater</Link>
            <Link className="nav-link" to="/history"><HistoryIcon></HistoryIcon>History</Link>
        </div>
    )
}

export {Sidebar};