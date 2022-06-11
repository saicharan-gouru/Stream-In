import "./Watchlater.css";
import {useDocumentTitle} from "../../customhooks";
import axios from "axios";
import {useEffect,useState} from "react";

function Watchlater(){

    useDocumentTitle("Stream In | Watchlater");
    const [videosInWatchlater, setVideosInWatchlater] = useState([])
    const encodedToken = localStorage.getItem("token")
    

    const getAllVideoInWatchlater = async () => {
        try {
            const data = await axios.get("/api/user/watchlater", {
                headers: { authorization: encodedToken }
            })
            setVideosInWatchlater(data.data.watchlater)
            console.log(data.data.watchlater)
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        getAllVideoInWatchlater()
    })


    return(
        <div>
            <h1>Watchlater</h1>
        </div>
    )
}

export {Watchlater};