import "./Videolisting.css";
import {useData} from "../../contexts";

function Videolisting(){

    const {videos} = useData();    

    return(
        <div>
            <h1>Videos</h1>
        <div className="videos-container">
            {videos.map(item => 
            <div className="video-card">
                <img src={item.thumbnail} className="thumbnail" alt={item.categoryName} />
                <h3>{item.title} </h3>
                <small>{item.views} views</small>
                <div className="creator-details">
                    <img src={item.avatar} className="avatar" />
                    <h3>{item.creator}</h3>
                </div>
               
            </div>
            )}
        </div>
        </div>
    )
}

export {Videolisting};