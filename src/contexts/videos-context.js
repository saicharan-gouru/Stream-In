import { useContext, createContext, useReducer, useEffect } from "react";
import { videosReducer } from "../reducers";
import axios from "axios";

const VideosContext = createContext();

function DataProvider({children}){

    const [{categories,videos},videosDispatch] = useReducer(videosReducer,{categories:[],videos:[]})

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
        <VideosContext.Provider value={{categories,videos}}>
            {children}
        </VideosContext.Provider>
    )
}

const useData = () => useContext(VideosContext);

export {DataProvider,useData}