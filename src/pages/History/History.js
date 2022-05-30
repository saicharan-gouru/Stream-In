import "./History.css";
import {useState,useEffect} from "react";
import axios from "axios";

function History(){

    const [videosInHistory, setVideosInHistory] = useState([])
    const encodedToken = localStorage.getItem("token")
    console.log(videosInHistory)

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


    return(
        <div>
            <h1>History</h1>
            {videosInHistory.map(item => <li>{item.title}</li>)}
        </div>
    )
}

export {History};