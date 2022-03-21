import { useParams, useHistory, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { myPlaylists, clearPlaylist, loadPlaylist, removePlaylist, getAllPlaylists } from '../../store/playlist';
import { addSongToPlayer } from "../../store/player";

function SinglePlaylist() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { playlistId }  = useParams();
    const id = +playlistId
    const userId = useSelector(state => state.session.user?.id);
    const playlists = useSelector(state => state.playlist.allPlaylists);
    const minePlaylists = useSelector(state => state.playlist.myPlaylists)
    const [loaded, setLoaded] = useState(false);
    const [authorized, setAuthorized] = useState(false);


    useEffect(() => {
        dispatch(getAllPlaylists())
            .then(() =>dispatch(myPlaylists(userId)))
            .then(() => setLoaded(true));
    }, [dispatch, userId])

    useEffect(() => {
        if (loaded && (!playlists[id] || userId !== playlists[id].user_id)) {
            setAuthorized(false);
        } else {
            setAuthorized(true);
        }
    }, [id, userId, playlists, history, loaded]);

    const handlePlay = idx => {
        const songIds = playlists[id].songs.map(song => {
            return song.id
        });
        console.log(songIds);
        dispatch(clearPlaylist());
        dispatch(loadPlaylist(songIds));
        dispatch(addSongToPlayer(songIds[0]));
    };

    const handleDelete = async idx => {
        await dispatch(removePlaylist(playlists[id].id));
        await dispatch(myPlaylists(userId));
        history.push('/playlists');
    };

    const handleEdit = (idx) => {
        const playlistId = playlists[id].id
        history.push(`/playlists/${playlistId}/edit`)
    };

    if (loaded) {
    return (
        <div>
            <div style={{ marginTop: "10px" }}>
                {playlists[id]?.name}
            </div>
            {playlists[id]?.songs.map((song, idx) => {
                return (
                    <div key={song.id.toString() + playlists[id]?.id + idx}>
                        <Link to={`/songs/${song.id}`}>
                            <div>{song.title}</div>
                        </Link>
                        <div>- {song.artist}</div>
                    </div>
                )
            })}
            <button onClick={handlePlay}>Play</button>
            {authorized ?<>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button></>  : null}
            
        </div>)
    } else {
        return null;
    }
}

export default SinglePlaylist;