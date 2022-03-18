import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { addSongToPlayer } from "../../store/player";
import { myPlaylists, loadPlaylist, clearPlaylist, removePlaylist } from '../../store/playlist';

function MyPlaylists() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector(state => state.session.user.id);
    const playlists = useSelector(state => state.playlist.playlists);

    const handlePlay = idx => {
        const songIds = playlists[idx].songs.map(song => {
            return song.id
        });
        dispatch(clearPlaylist());
        dispatch(loadPlaylist(songIds));
        dispatch(addSongToPlayer(songIds[0]));
    };

    const handleDelete = async idx => {
        await dispatch(removePlaylist(playlists[idx].id));
        await dispatch(myPlaylists(userId))
    };

    const handleEdit = (idx) => {
        const playlistId = playlists[idx].id
        history.push(`/playlists/${playlistId}`)
    };

    useEffect(() => {
        dispatch(myPlaylists(userId));
    }, [dispatch, userId])

    return (
        <div>
            <h1>My Playlists</h1>
            <h2>Under Construction</h2>
            <h3>Please excuse the dust</h3>
            {playlists?.map((playlist, idx) => {
                return (
                    <div key={idx}>
                        <div style={{marginTop: "10px"}}>
                            {playlist.name}
                            </div>
                    {playlist.songs.map(song => {
                    return (
                    <div key={song.id.toString() + playlist.id}>
                        <Link to={`/songs/${song.id}`}>
                            <div>{song.title}</div>
                        </Link>
                        <div>- {song.artist}</div>
                    </div>
                    )
                })}
                <button onClick={() => handlePlay(idx)}>Play</button>
                <button onClick={() => handleEdit(idx)}>Edit</button>
                <button onClick={() => handleDelete(idx)}>Delete</button>
                </div>)
            })}
            <Link to="/playlists/add">Create a playlist!</Link>
        </div>
    )
}

export default MyPlaylists;