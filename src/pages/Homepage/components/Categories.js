import {useData} from "../../../contexts";
import "./Categories.css";
import {Link } from "react-router-dom";


function Categories(){

    const {categories,videosDispatch} = useData();

    return(
        <div className="categories-container">
            <h1>Categories</h1>
            <div className="categories">
            {
                categories.map(item => 
                <Link to="/videos" className="category-card" onClick={()=> videosDispatch({type:"FILTER",payload:item.categoryName})} >
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