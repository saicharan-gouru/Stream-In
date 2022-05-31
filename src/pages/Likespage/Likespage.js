import "./Likespage.css";
import {useDocumentTitle} from "../../customhooks";

function Likespage(){
    useDocumentTitle("Stream In | Liked");
    return(
        <div>
            <h1>Likes</h1>
        </div>
    )
}

export {Likespage};