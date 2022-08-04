import axios from "axios";
import { triggerToast } from "./trigger-toast";




const addvideoToLiked = async(video, videosDispatch, encodedToken) => {

    try {
        const data = await axios.post("/api/user/likes", { video }, { headers: { authorization: encodedToken } });
        triggerToast("success", "Video liked");
        videosDispatch({ type: "VIDEO_LIKED", payload: data.data.likes })
    } catch (error) {
        console.log(error)
    }

}

const deleteFromLikedHandler = async(_id, videosDispatch, encodedToken) => {
    try {
        const data = await axios.delete(`/api/user/likes/${_id}`, {
            headers: { authorization: encodedToken }
        });
        videosDispatch({ type: "VIDEO_UNLIKED", payload: data.data.likes })
        triggerToast("warning", "Video unliked")
    } catch (error) {
        console.log(error)
    }
}

export { addvideoToLiked, deleteFromLikedHandler };