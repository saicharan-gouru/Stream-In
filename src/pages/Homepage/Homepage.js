import "./Homepage.css";
import {Categories} from "./components/Categories";
import {Link} from "react-router-dom";

function Homepage(){

    return(
        <div>
            <div className="main">
                <p className="main-text">Music is the key thing in everyone's life, Which can change any kind of mood.</p>
                <Link to="/videos"><button className="button primary-blue">Explore music</button></Link>
                <p className="main-text">Explore,watch,listen and enjoy...😉</p>
            </div>
            <Categories />
        </div>
    )
}

export {Homepage};