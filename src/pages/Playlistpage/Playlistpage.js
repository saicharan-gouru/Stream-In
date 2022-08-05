import "./Playlistpage.css";
import {useDocumentTitle} from "../../customhooks";
import {useState,useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import {Default} from "../../components";
import {triggerToast} from "../../services";

function Playlistpage(){
    useDocumentTitle("Stream In | Playlists");
    const [playlists, setPlaylists] = useState([])
    const encodedToken = localStorage.getItem("token")

    const getAllPlaylists = async () => {
        try {
            const data = await axios.get("/api/user/playlists", {
                headers: { authorization: encodedToken }
            })
            console.log(data.data.playlists);
            setPlaylists(data.data.playlists)
        } catch (error) {
            console.log(error)
        }
    }

    const deletePlaylist = async (_id) => {
        try{
            const data = await axios.delete(`/api/user/playlists/${_id}`, {
                headers: { authorization: encodedToken }
            });
            triggerToast("warning","Playlist deleted")
            setPlaylists(data.data.playlists)
        } catch(error){
            console.log(error)
        }
    }


    useEffect(() => {
        getAllPlaylists()
    })

    return(
        <div>
        <h1>Playlists</h1>
        <div className="playlists-container">
            {playlists.length === 0 && <Default />}

            {playlists.map(item => 
                <div>
                <Link className="playlist" to={`/playlists/${item._id}`}>
                    {item.title}
                </Link>
                <DeleteIcon className="icon-playlist-delete" onClick={()=>deletePlaylist(item._id)}></DeleteIcon>
                </div>
            )}
          
        </div>
        </div>
    )
}

export {Playlistpage};