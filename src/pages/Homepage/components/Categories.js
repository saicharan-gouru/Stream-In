import {useData} from "../../../contexts";
import "./Categories.css";
import {Link } from "react-router-dom";


function Categories(){

    const {categories,videosDispatch} = useData();

    function generateType(categoryName){
        if(categoryName === "Tollywood")
        return "INCLUDE_TOLLYWOOD"
        if(categoryName === "Bollywood")
        return "INCLUDE_BOLLYWOOD"
        if(categoryName === "CARTOON")
        return "INCLUDE_CARTOON"
    }

    return(
        <div className="categories-container">
            <h1>Categories</h1>
            <div className="categories">
            {
                categories.map(item => 
                <Link to="/videos" className="category-card" key={item._id} onClick={()=>{videosDispatch({type:"CLEAR"});videosDispatch({type:generateType(item.categoryName)})}}>
                    <img className="category-image" src={item.img} alt="category"/>
                    <p className="category-name">{item.categoryName}</p>
                </Link>
                )
            }
            </div>
        </div>
    );
}

export { Categories }