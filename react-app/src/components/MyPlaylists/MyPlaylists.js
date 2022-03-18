import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { myPlaylists } from '../../store/playlist';

function MyPlaylists() {
    const dispatch = useDispatch()
    const myPlaylists = useSelector(state => state.playlists?.playlists)


    useEffect(() => {
        dispatch(myPlaylists(1));
    }, [dispatch, myPlaylists])

    return (
        <div>
            <h1>My Playlists</h1>
            <h2>Under Construction</h2>
            {}
            <Link to="/playlists/add">Create a playlist!</Link>
        </div>
    )
}

export default MyPlaylists;