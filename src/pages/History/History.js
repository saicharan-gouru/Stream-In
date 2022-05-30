import "./History.css";
import {useState,useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import ClearAllIcon from '@mui/icons-material/ClearAll';


function History(){

    const [videosInHistory, setVideosInHistory] = useState([])
    const encodedToken = localStorage.getItem("token")
    

    const getAllVideoInHistory = async () => {
        try {
            const data = await axios.get("/api/user/history", {
                headers: { authorization: encodedToken }
            })
            setVideosInHistory(data.data.history)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllVideoInHistory()
    },[])

    const clearHistoryHandler = async () =>{
        try{
            const data = await axios.delete("/api/user/history/all",{
                headers: {authorization: encodedToken}
            })
            setVideosInHistory(data.data.history);
        }
        catch(error){
            console.log(error)
        }
    }

    const deleteFromHistoryHandler = async (_id) => {
        try{
            const data = await axios.delete(`/api/user/history/${_id}`,{
                headers: {authorization: encodedToken}
            })
            setVideosInHistory(data.data.history);
        }
        catch(error){
            console.log(error)
        }
    }



    return(
        <div>
            <h1>History</h1>
            <ClearAllIcon className="delete-icon" onClick={clearHistoryHandler}></ClearAllIcon>
            <div className="videos-container">
                {videosInHistory.map(item => 
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
                    <DeleteIcon className="delete-icon" onClick={()=>deleteFromHistoryHandler(item._id)}></DeleteIcon>
                </div>
                 )}
            </div>
        </div>
    )
}

export {History};