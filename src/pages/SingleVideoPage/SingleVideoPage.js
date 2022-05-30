import "./SingleVideoPage.css";
import {useEffect} from "react";
import {useData} from "../../contexts";
import {useParams,Link} from "react-router-dom";
import {useDocumentTitle} from "../../customhooks";
import axios from "axios";

function SingleVideoPage(){
    const { videos } = useData();
    const { _id } = useParams();
    const video = videos.filter((item) => item._id===_id)[0];
    const getSingleVideo = video;
    useDocumentTitle(getSingleVideo.title);
    let getSimilarVideos = videos.filter((item) => item.categoryName === getSingleVideo.categoryName);
    getSimilarVideos = getSimilarVideos.filter((item) => item._id !== _id);
    const encodedToken = localStorage.getItem('token');
 
    
    const addVideoToHistory = async () => {
        try {
            await axios.post("/api/user/history", { video },
                { headers: { authorization: encodedToken } })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
    
    addVideoToHistory();
        
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