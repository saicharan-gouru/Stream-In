import "./SingleVideoPage.css";
import {useEffect}from "react";
import {useData,useAuth} from "../../contexts";
import {useParams,Link,useNavigate} from "react-router-dom";
import {useDocumentTitle} from "../../customhooks";
import axios from "axios";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import PlaylistPlayOutlinedIcon from '@mui/icons-material/PlaylistPlayOutlined';
import { useState } from "react";



function SingleVideoPage(){
    const { videos } = useData();
    const navigate = useNavigate();
    const {user} = useAuth();
    const { _id } = useParams();
    const [videosInLiked, setVideosInLiked] = useState([]);
    const [videosInWatchlater,setVideosInWatchlater] = useState([]);
    const [watchlater,setWatchlater] = useState(false);
    const [liked,setLiked] = useState(false);
    const video = videos.find((item) => item._id===_id);
    const getSingleVideo = video;
    useDocumentTitle(getSingleVideo.title);
    let getSimilarVideos = videos.filter((item) => item.categoryName === getSingleVideo.categoryName);
    getSimilarVideos = getSimilarVideos.filter((item) => item._id !== _id);
    const encodedToken = localStorage.getItem('token');
    const [display,setDisplay] = useState("none");
    const [title,setTitle] = useState("");
    const [playlists, setPlaylists] = useState([]);


    const getAllVideoInLiked = async () => {
        try {
            const data = await axios.get("/api/user/likes", {
                headers: { authorization: encodedToken }
            })
            setVideosInLiked(data.data.likes)
        } catch (error) {
            // console.log(error)
        }
    }

    const getAllVideoInWatchlater = async () => {
        try {
            const data = await axios.get("/api/user/watchlater", {
                headers: { authorization: encodedToken }
            })
            setVideosInWatchlater(data.data.watchlater)
         
        } catch (error) {
            console.log(error)
        }
    }

    const isInWatchlater = (video) => {
        if(videosInWatchlater.find(item => item._id === video._id))
        setWatchlater(true)
        else
        setWatchlater(false)
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
            // console.log(error)
        }
    }

    const addvideoToLiked = async () => {
        if(user)
        {
        try {
            await axios.post("/api/user/likes", { video },
                { headers: { authorization: encodedToken } })
        } catch (error) {
            console.log(error)
        }
        }
        else{
            navigate("/login")
        }
    }

    const addVideoToWatchlater = async () => {
        if(user)
        {
        try {
            await axios.post("/api/user/watchlater", { video },
                { headers: { authorization: encodedToken } })
        } catch (error) {
            console.log(error)
        }
        }
        else{
            navigate("/login")
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

    const deleteFromWatchlaterHandler = async (_id) => {
        try{
            const data = await axios.delete(`/api/user/watchlater/${_id}`,{
                headers: {authorization: encodedToken}
            })
            setVideosInWatchlater(data.data.watchlater);
        }
        catch(error){
            console.log(error)
        }
    }

    const createPlaylist = async () => {
        if(user)
        {
        try {
            await axios.post("/api/user/playlists", {playlist:{title}},
                { headers: { authorization: encodedToken } })
            setTitle("")
        } catch (error) {
            console.log(error)
        }
        }
        else{
            navigate("/login")
        }
    }

    const getAllPlaylists = async () => {
        try {
            const data = await axios.get("/api/user/playlists", {
                headers: { authorization: encodedToken }
            })
            setPlaylists(data.data.playlists)
        } catch (error) {
            console.log(error)
        }
    }

    const addVideoToPlaylist = async (_id) => {
        try {
            const data = await axios.post(`/api/user/playlists/${_id}`, { video },
                { headers: { authorization: encodedToken } })
            console.log(data.data)
        } catch (error) {
            console.log(error)
        }
        
    }



    useEffect(() => {
    addVideoToHistory();
    isLiked(video); 
    isInWatchlater(video);
    getAllVideoInLiked(); 
    getAllVideoInWatchlater();   
    getAllPlaylists();   
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
                        <div>
                            {liked ? <ThumbUpIcon className="like-icon" onClick={()=>deleteFromLikedHandler(video._id)}></ThumbUpIcon> : <ThumbUpOutlinedIcon className="like-icon" onClick={addvideoToLiked}></ThumbUpOutlinedIcon> }
                            {watchlater ? <WatchLaterIcon className="watchlater-icon" onClick={()=>deleteFromWatchlaterHandler(video._id)}></WatchLaterIcon> : <WatchLaterOutlinedIcon className="watchlater-icon" onClick={addVideoToWatchlater} ></WatchLaterOutlinedIcon> }
                        </div>
                        <button className="button-playlist" onClick={()=>setDisplay("block")}><PlaylistPlayOutlinedIcon></PlaylistPlayOutlinedIcon>Add to playlist</button>
                        <div className="modal" style={{display:display}}>
                            <div className="modal-content">
                                <span onClick={()=>setDisplay("none")} class="close">&times;</span>
                                <input type="text" onChange={(e)=>setTitle(e.target.value)} value={title}/>
                                <button onClick={createPlaylist}>create</button>
                                <div>
                                    {playlists.map(item => <><span>{item.title}</span> <button onClick={()=>addVideoToPlaylist(item._id)}>Add</button></>)}
                                </div>
                            </div>
                        </div>
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