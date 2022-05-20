import "./Videolisting.css";
import {useData} from "../../contexts";

function Videolisting(){

    const {videos} = useData();    

    return(
        <div>
            <h1>Videos</h1>
            {videos.map(item => <li>{item.title}</li>)}
        </div>
    )
}

export {Videolisting};