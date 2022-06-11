import "./Default.css";
import {Link} from "react-router-dom";

function Default(){
    return(
        <div className="default-container">
            <h1 className="default-text">No videos here, To explore <Link to="/videos">click here</Link></h1>
        </div>
    )
}

export {Default};