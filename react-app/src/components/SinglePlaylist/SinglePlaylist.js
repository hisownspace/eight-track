import { useParams, useHistory, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare, faPlay } from '@fortawesome/free-solid-svg-icons'
import { myPlaylists, addSongToPlaylist, clearPlaylist, loadPlaylist, removePlaylist, getAllPlaylists } from '../../store/playlist';
import { addSongToPlayer } from "../../store/player";
import './SinglePlaylist.css';


function SinglePlaylist() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { playlistId }  = useParams();
    const id = +playlistId
    const userId = useSelector(state => state.session.user?.id);
    const playlists = useSelector(state => state.playlist.allPlaylists);
    const [loaded, setLoaded] = useState(false);
    const [authorized, setAuthorized] = useState(false);
    const player = useSelector(state => state.player.player);
    const playState = useSelector(state => state?.player.playing);



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

        player.current.audio.current.pause();
        player.current.audio.current.currentTime = 0;
        
        dispatch(clearPlaylist());
        dispatch(loadPlaylist(songIds));
        dispatch(addSongToPlayer(songIds[0]))
        .then(() => player.current.audio.current.play());
    };

    const handleDelete = async idx => {
        const confirm = window.confirm("Are you sure you want to delete this playlist?")
        if (confirm) {
            await dispatch(removePlaylist(playlists[id].id));
            await dispatch(myPlaylists(userId));
            history.push('/playlists');
        }
    };

    useEffect(() => {
        if (loaded && !playlists[id]) {
            history.push('/playlists');
        }
    }, [loaded, playlists, history, id]);

    const handleEdit = (idx) => {
        const playlistId = playlists[id].id
        history.push(`/playlists/${playlistId}/edit`)
    };

    if (loaded) {
    return (
        <div>
            <div style={{ marginTop: "10px" }}>
                <h1>
                    {playlists[id]?.name}
                </h1>
            </div>
            <ul>

            {playlists[id]?.songs.map((song, idx) => {
                return (
                    <li
                        key={song.id.toString() + playlists[id]?.id + idx}
                        className="playlist-item-container">
                            <div className='playlist-item'>
                                <div
                                    className="playlist-thumbnail"
                                >
                                    <Link to={`/songs/${song.id}`}>
                                    <img
                                        alt={song.title}
                                        src={song.image_url || "https://eta-photobucket.s3.amazonaws.com/play-button.svg"}
                                        ></img>
                                        </Link>
                                </div>
                                    <Link to={`/songs/${song.id}`}>
                                <div className="playlist-text-side">
                                    <div className='playlist-song-title'>{song.title}</div>
                                    <div className="playlist-artist-name">- {song.artist}</div>
                                </div>
                                        </Link>
                            </div>
                    </li>
                )
            })}
            </ul>
            <button className="playlist-buttons" onClick={() => handlePlay()}><FontAwesomeIcon className="fa-solid" icon={faPlay} /></button>

            {authorized ? <>
                <button className="playlist-buttons" onClick={() => handleEdit()}><FontAwesomeIcon className="fa-solid" icon={faPenToSquare} /></button>
                <button className="playlist-buttons" onClick={() => handleDelete()}><FontAwesomeIcon className="fa-solid" icon={faTrashCan} /></button></>  : null}
            
        </div>)
    } else {
        return null;
    }
}

export default SinglePlaylist;