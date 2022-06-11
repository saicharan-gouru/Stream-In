import "./Likespage.css";
import {useDocumentTitle} from "../../customhooks";
import {useEffect,useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { Default } from "../../components";
import DeleteIcon from '@mui/icons-material/Delete';




function Likespage(){
    useDocumentTitle("Stream In | Liked");
    const [videosInLiked, setVideosInLiked] = useState([])
    const encodedToken = localStorage.getItem("token")
    

    const getAllVideoInLiked = async () => {
        try {
            const data = await axios.get("/api/user/likes", {
                headers: { authorization: encodedToken }
            })
            setVideosInLiked(data.data.likes)
            console.log(data.data.likes)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteFromLikedHandler = async (_id) => {
        try{
            const data = await axios.delete(`/api/user/likes/${_id}`,{
                headers: {authorization: encodedToken}
            })
            setVideosInLiked(data.data.likes);
        }
        catch(error){
            console.log(error)
        }
    }


    useEffect(() => {
        getAllVideoInLiked()
    })


    return(
        <div>
            <h1>Liked videos</h1>
            <div className="videos-container">
                {videosInLiked.map(item => 
                <div className="liked-video-card" key={item._id}>
                    <div className="liked-video-card-container-1">
                        <img src={item.thumbnail} className="thumbnail" alt={item.categoryName} />
                        <span className="duration">{item.duration}</span>
                    </div>
                    <div className="liked-video-card-container-1">
                        <h3>{item.title} </h3>
                        
                        <div className="creator-details">
                            <img src={item.avatar} className="avatar" alt="avatar" />
                            <h3>{item.creator}</h3>  
                        </div>
                        <Link to={`/video/${item._id}`}>Go to video</Link>
                    </div>
                    <DeleteIcon className="delete-icon" onClick={()=>deleteFromLikedHandler(item._id)}></DeleteIcon>
                </div>
                 )}
                {videosInLiked.length===0 && <Default/>}
            </div>
        </div>
    )
}

export {Likespage};