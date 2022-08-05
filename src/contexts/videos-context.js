import { useContext, createContext, useReducer, useEffect } from "react";
import { videosReducer } from "../reducers";
import axios from "axios";

const VideosContext = createContext();

function DataProvider({children}){

    const [{categories,videos,filteredVideos,currentCategory,videosInLiked,videosInWatchlater},videosDispatch] = useReducer(videosReducer,{categories:[],videos:[],filteredVideos:[],currentCategory:"ALL",videosInLiked:[],videosInWatchlater:[]})
    useEffect(()=>{ 
        async function FetchData(){
            try{
                const response1 = await axios.get("/api/categories");
                videosDispatch({type:"FETCH_CATEGORIES",payload:response1.data.categories})
                const response2 = await axios.get("/api/videos");
                videosDispatch({type:"FETCH_VIDEOS",payload:response2.data.videos})
            }
            catch(error){
                console.log(error);
            }
        }
        FetchData();
    },[]
    );

    return(
        <VideosContext.Provider value={{categories,videos,filteredVideos,videosDispatch,currentCategory,videosInLiked,videosInWatchlater}}>
            {children}
        </VideosContext.Provider>
    )
}

const useData = () => useContext(VideosContext);

export {DataProvider,useData}