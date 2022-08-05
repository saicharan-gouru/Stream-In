import { useState, useEffect } from "react";
import "./SinglePlaylistpage.css";
import axios from "axios";
import {useParams,Link} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import {Default} from "../../components";
import {triggerToast} from "../../services";


function SinglePlaylistpage(){
    const { _id } = useParams();

    const [videosInPlaylist,setVideosInPlaylist] = useState([]);
    const encodedToken = localStorage.getItem('token');


    const getAllVideoInPlaylist = async () => {
        try {
            const data = await axios.get(`/api/user/playlists/:${_id}`, {
                headers: { authorization: encodedToken }
            })
            setVideosInPlaylist(data.data.playlist.videos)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteFromPlaylist = async (_vid) => {
        try{
            const data = await axios.delete(`/api/user/playlists/${_id}/${_vid}`, {
                headers: { authorization: encodedToken }
            });
            triggerToast("warning","Video deleted from the current playlist")
            setVideosInPlaylist(data.data.playlist.videos)
        } catch(error){
            console.log(error)
        }
    }



    useEffect(()=>{
        getAllVideoInPlaylist();
    })



    return(
        <div>
            <h1>Single playlist page</h1>
            <div className="videos-container">
            {videosInPlaylist.length === 0 && <Default />}
            { videosInPlaylist.map(item => 
                <div className="history-video-card" key={item._id}>
                    <div className="history-video-card-container-1">
                        <img src={item.thumbnail} className="thumbnail" alt={item.categoryName} />
                        <span className="duration">{item.duration}</span>
                    </div>
                    <div className="history-video-card-container-1">
                        <h3>{item.title} </h3>
                        
                        <div className="creator-details">
                            <img src={item.avatar} className="avatar" alt="avatar" />
                            <h3>{item.creator}</h3>  
                        </div>
                        <Link to={`/video/${item._id}`}>Go to video</Link>
                    </div>
                    <DeleteIcon className="delete-icon" onClick={()=>deleteFromPlaylist(item._id)}></DeleteIcon>
                </div>
                 )}
            </div>
        </div>
    )
}

export {SinglePlaylistpage};