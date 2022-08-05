import "./Watchlater.css";
import {useDocumentTitle} from "../../customhooks";
import axios from "axios";
import {useEffect,useState} from "react";
import {Link} from "react-router-dom";
import {Default} from "../../components";
import DeleteIcon from '@mui/icons-material/Delete';
import {useData} from "../../contexts";
import {deleteFromWatchlaterHandler} from "../../services";

function Watchlater(){
    const {videosDispatch} = useData();
    useDocumentTitle("Stream In | Watchlater");
    const [videosInWatchlater, setVideosInWatchlater] = useState([])
    const encodedToken = localStorage.getItem("token")
    

    const getAllVideoInWatchlater = async () => {
        try {
            const data = await axios.get("/api/user/watchlater", {
                headers: { authorization: encodedToken }
            })
            setVideosInWatchlater(data.data.watchlater)
            console.log(data.data.watchlater)
        } catch (error) {
            console.log(error)
        }
    }





    useEffect(() => {
        getAllVideoInWatchlater()
    })


    return(
        <div>
            <h1>Watchlater</h1>
            <div className="videos-container">
                
                {videosInWatchlater.map(item => 
                <div className="watchlater-video-card" key={item._id}>
                    <div className="watchlater-video-card-container-1">
                        <img src={item.thumbnail} className="thumbnail" alt={item.categoryName} />
                        <span className="duration">{item.duration}</span>
                    </div>
                    <div className="watchlater-video-card-container-1">
                        <h3>{item.title} </h3>
                        
                        <div className="creator-details">
                            <img src={item.avatar} className="avatar" alt="avatar" />
                            <h3>{item.creator}</h3>  
                        </div>
                        <Link to={`/video/${item._id}`}>Go to video</Link>
                    </div>
                    <DeleteIcon className="delete-icon" onClick={()=>deleteFromWatchlaterHandler(item._id,videosDispatch,encodedToken)}></DeleteIcon>
                </div>
                 )}
                {videosInWatchlater.length===0 && <Default/>}
            </div>
        </div>
    )
}

export {Watchlater};