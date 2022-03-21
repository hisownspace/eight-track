import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { addSongToPlayer } from "../../store/player";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare, faPlay } from '@fortawesome/free-solid-svg-icons';
import { myPlaylists, loadPlaylist, clearPlaylist, removePlaylist } from '../../store/playlist';
import './MyPlaylists.css';

function MyPlaylists() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector(state => state.session.user.id);
    const playlists = useSelector(state => state.playlist.myPlaylists);
    const player = useSelector(state => state.player.player);

    const handlePlay = idx => {
        const songIds = playlists[idx].songs.map(song => {
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
        await dispatch(removePlaylist(playlists[idx].id));
        await dispatch(myPlaylists(userId))
    };

    const handleEdit = (idx) => {
        const playlistId = playlists[idx].id
        history.push(`/playlists/${playlistId}/edit`)
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
                            <h1>
                                {playlist.name}
                            </h1>
                            </div>
                    {playlist.songs.map((song, idx) => {
                    return (
<div
                        key={song.id.toString() + playlists?.id + idx}
                        className="playlist-item-container">
                        <Link to={`/songs/${song.id}`}>
                            <div className='playlist-item'>
                                <div
                                    className="playlist-thumbnail"
                                >
                                    <img
                                        alt={song.title}
                                        src={song.image_url}
                                    ></img>
                                </div>
                                <div className="playlist-text-side">
                                    <div className='playlist-song-title'>{song.title}</div>
                                    <div className="playlist-artist-name">- {song.artist}</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    )
                })}
                <button className="playlist-buttons" onClick={() => handlePlay(idx)}><FontAwesomeIcon className="fa-solid" icon={faPlay} /></button>
                <button className="playlist-buttons" onClick={() => handleEdit(idx)}><FontAwesomeIcon className="fa-solid" icon={faPenToSquare} /></button>
                <button className="playlist-buttons" onClick={() => handleDelete(idx)}><FontAwesomeIcon className="fa-solid" icon={faTrashCan} /></button>
                </div>)
            })}
            <Link to="/playlists/add">Create a playlist!</Link>
        </div>
    )
}

export default MyPlaylists;