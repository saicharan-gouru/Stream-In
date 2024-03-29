import "./Videolisting.css";
import {useData} from "../../contexts";
import {Link} from "react-router-dom";
import {useDocumentTitle} from "../../customhooks";

function Videolisting(){
    useDocumentTitle("Stream In | Explore")
    const {filteredVideos,videosDispatch,currentCategory} = useData();    

    function setStyle(name){
        if(name === currentCategory)
        return {backgroundColor:"#f3652d",color:"white"}
    }

    return(
        <div>
            <div className="filters">
                <button className="filter-btn" style={setStyle("ALL")}  onClick={() => videosDispatch({type:"FILTER_ALL"})}>All</button>
                <button className="filter-btn" style={setStyle("Tollywood")} onClick={() => videosDispatch({type:"FILTER",payload:"Tollywood"})}>Tollywood</button>
                <button className="filter-btn" style={setStyle("Bollywood")} onClick={() => videosDispatch({type:"FILTER",payload:"Bollywood"})}>Bollywood</button>
                <button className="filter-btn" style={setStyle("Cartoon")} onClick={() => videosDispatch({type:"FILTER",payload:"Cartoon"})}>Cartoon</button>
            </div>
            <div className="videos-container">
                {filteredVideos.map( 
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
                </Link>
            )}
        </div>
        </div>
    )
}

export {Videolisting};