import axios from "axios";
import { triggerToast } from "./trigger-toast";

const addVideoToWatchlater = async(video, videosDispatch, encodedToken) => {
    try {
        const data = await axios.post("/api/user/watchlater", { video }, { headers: { authorization: encodedToken } });
        triggerToast("success", "Video added to watchlater");
        videosDispatch({ type: "ADD_VIDEO_TO_WATCHLATER", payload: data.data.watchlater })
    } catch (error) {
        console.log(error)
    }

}

const deleteFromWatchlaterHandler = async(_id, videosDispatch, encodedToken) => {
    try {
        triggerToast("warning", "Video removed from watchlater")
        const data = await axios.delete(`/api/user/watchlater/${_id}`, {
            headers: { authorization: encodedToken }
        })
        videosDispatch({ type: "REMOVE_VIDEO_FROM_WATCHLATER", payload: data.data.watchlater })
    } catch (error) {
        console.log(error)
    }
}

export { addVideoToWatchlater, deleteFromWatchlaterHandler }