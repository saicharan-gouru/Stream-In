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
import {triggerToast,addvideoToLiked,deleteFromLikedHandler,addVideoToWatchlater,deleteFromWatchlaterHandler} from "../../services";

function SingleVideoPage(){
    const { videos,videosInLiked,videosDispatch,videosInWatchlater } = useData();
    const navigate = useNavigate();
    const {user} = useAuth();
    const { _id } = useParams();
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


    const createPlaylist = async () => {
        if(user)
        {
        if(playlists.filter(item => item.title === title).length === 0)
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
            triggerToast("warning","playlist already exist")
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
                { headers: { authorization: encodedToken } });
                triggerToast("success","Video added to playlist")
            console.log(data.data);
        } catch (error) {
            if(error.message.indexOf("409") !== -1)
            triggerToast("warning","The video is already in your playlist")
        }
        
    }



    useEffect(() => {
    addVideoToHistory();
    isLiked(video); 
    isInWatchlater(video);  
    getAllPlaylists();   
    })

    function likeHandler()
    {
        if(user){
        addvideoToLiked(video,videosDispatch,encodedToken)
        }
        else{
            navigate("/login")
        }
    }

    function watchlaterHandler()
    {
        if(user){
        addVideoToWatchlater(video,videosDispatch,encodedToken)
        }
        else{
            navigate("/login")
        }
    }

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
                            {liked ? <ThumbUpIcon className="like-icon" onClick={()=>deleteFromLikedHandler(video._id,videosDispatch,encodedToken)}></ThumbUpIcon> : <ThumbUpOutlinedIcon className="like-icon" onClick={likeHandler}></ThumbUpOutlinedIcon> }
                            {watchlater ? <WatchLaterIcon className="watchlater-icon" onClick={()=>deleteFromWatchlaterHandler(video._id,videosDispatch,encodedToken)}></WatchLaterIcon> : <WatchLaterOutlinedIcon className="watchlater-icon" onClick={watchlaterHandler} ></WatchLaterOutlinedIcon> }
                        </div>
                        <button className="button-playlist" onClick={()=>setDisplay("block")}><PlaylistPlayOutlinedIcon></PlaylistPlayOutlinedIcon>Add to playlist</button>
                        <div className="modal" style={{display:display}}>
                            <div className="modal-content">
                                <span onClick={()=>setDisplay("none")} class="close">&times;</span>
                                <input className="playlist-title" type="text" onChange={(e)=>setTitle(e.target.value)} value={title}/>
                                <button className="playlist-create-btn" onClick={createPlaylist}>create</button>
                                <div className="existing-playlists">
                                    {playlists.map(item => <><span>{item.title}</span> <button className="playlist-add-btn" onClick={()=>addVideoToPlaylist(item._id)}>Add</button></>)}
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