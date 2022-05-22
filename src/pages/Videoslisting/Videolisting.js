import "./Videolisting.css";
import {useData} from "../../contexts";

function Videolisting(){

    const {filteredVideos,videosDispatch} = useData();    

    return(
        <div>
            <button onClick={() => videosDispatch({type:"FILTER",payload:"Tollywood"})}>Tollywood</button>
            <h1>Videos</h1>
        <div className="videos-container">
            {filteredVideos.map(item => 
            <div className="video-card">
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
            </div>
            )}
        </div>
        </div>
    )
}

export {Videolisting};