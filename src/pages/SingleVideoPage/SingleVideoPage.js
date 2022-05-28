import "./SingleVideoPage.css";
import {useData} from "../../contexts";
import {useParams,Link} from "react-router-dom";

function SingleVideoPage(){

    const { videos } = useData();
    const { _id } = useParams();
    const getSingleVideo = videos.filter((item) => item._id===_id);
    let getSimilarVideos = videos.filter((item) => item.categoryName === getSingleVideo[0].categoryName);
    getSimilarVideos = getSimilarVideos.filter((item) => item._id !== _id);

    return(
        <div>
            {
                getSingleVideo.map(item =>
                <div key={item._id}>
                    <iframe
                    title="video"
                    className="video"
                    src={item.src}
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                    </iframe>    
                    <div className="video-details">
                        <h2>{item.title}</h2>
                        <small>{item.views}+ views</small>
                        <p>{item.description}</p>
                        <div className="creator-details">
                            <img src={item.avatar} className="avatar" alt="avatar" />
                            <h3>{item.creator}</h3>  
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
                )
            }
        </div>
    );
}


export {SingleVideoPage};