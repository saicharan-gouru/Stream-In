import "./SingleVideoPage.css";
import {useEffect}from "react";
import {useData} from "../../contexts";
import {useParams,Link} from "react-router-dom";
import {useDocumentTitle} from "../../customhooks";
import axios from "axios";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useState } from "react";

function SingleVideoPage(){
    const { videos } = useData();
    const { _id } = useParams();
    const [videosInLiked, setVideosInLiked] = useState([]);
    const [liked,setLiked] = useState(false);
    const video = videos.find((item) => item._id===_id);
    const getSingleVideo = video;
    useDocumentTitle(getSingleVideo.title);
    let getSimilarVideos = videos.filter((item) => item.categoryName === getSingleVideo.categoryName);
    getSimilarVideos = getSimilarVideos.filter((item) => item._id !== _id);
    const encodedToken = localStorage.getItem('token');
    
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

    const isLiked = (video) => {
        if(videosInLiked.find(item => item._id === video._id))
        setLiked(true)
        else
        setLiked(false)
    }
    
    const addVideoToHistory = async () => {
        try {
            await axios.post("/api/user/history", { video },
                { headers: { authorization: encodedToken } })
        } catch (error) {
            console.log(error)
        }
    }

    const addvideoToLiked = async () => {
        try {
            await axios.post("/api/user/likes", { video },
                { headers: { authorization: encodedToken } })
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
    addVideoToHistory();
    isLiked(video); 
    getAllVideoInLiked();       
    })

    
    

    return(
        <div>
            <div key={getSingleVideo._id}>
                    <iframe
                    title="video"
                    className="video"
                    frameBorder="0"
                    src={getSingleVideo.src}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                    </iframe>    
                    <div className="video-details">
                        <h2>{getSingleVideo.title}</h2>
                        {liked ? <ThumbUpIcon className="like-icon" onClick={()=>deleteFromLikedHandler(video._id)}></ThumbUpIcon> : <ThumbUpOutlinedIcon className="like-icon" onClick={addvideoToLiked}></ThumbUpOutlinedIcon> }
                        <small>{getSingleVideo.views}+ views</small>
                        <p>{getSingleVideo.description}</p>
                        <div className="creator-details">
                            <img src={getSingleVideo.avatar} className="avatar" alt="avatar" />
                            <h3>{getSingleVideo.creator}</h3>  
                        </div>
                    </div>
                    <hr/>
                    <h1>similar videos</h1>
                    <div className="videos-container">
                    {
                        getSimilarVideos.map( 
                            item =>
                            <Link to={`/video/${item._id}`} className="video-card" key={item._id}>
                                <div>
                                    <img src={item.thumbnail} className="thumbnail" alt={item.categoryName} />
                                    <span className="duration">{item.duration}</span>
                                </div>
                                <h3>{item.title} </h3>
                                <small>{item.views} views</small>
                                <div className="creator-details">
                                    <img src={item.avatar} className="avatar" alt="avatar" />
                                    <h3>{item.creator}</h3>  
                                </div>
                            </Link>)
                    }
                    </div>
            </div>
        </div>
    );
}


export {SingleVideoPage};