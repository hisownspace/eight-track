import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import { editPlaylist } from '../../store/playlist';
import { getAllSongs } from '../../store/song';

function EditPlaylist() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { playlistId } = useParams();
    const playlists = useSelector(state => state.playlist.myPlaylists);
    const [playlist, setPlaylist] = useState({ songs: []})
    const songs = useSelector(state => state.songs.songs);
    const userId = useSelector(state => state.session.user.id);
    const [errors, setErrors] = useState();
    const [playlistLoaded, setPlaylistLoaded] = useState(false);
    const [playlistName, setPlaylistName] = useState('')


    useEffect(() => {
        if (playlistLoaded && !playlist) {
            history.push('/playlists');
        } else {
            const list = playlists.find(playlist => {
                return playlist.id === +playlistId;
            });
            dispatch(getAllSongs());
            setPlaylist(list);
            setPlaylistLoaded(true);
        }
    }, [playlists, playlistId, playlistLoaded, history, playlist, dispatch]);


    useEffect(() => {
        if (playlistLoaded === true) {
            setPlaylistName(playlist?.name);
        }
    }, [playlistLoaded, playlist?.name]);

    const handleSongChange = (idx, e) => {
        const songId = +e.target.value
        const newPlaylistValues = { ...playlist };
        newPlaylistValues.songs[idx] = songs[songId];
        setPlaylist(newPlaylistValues);
    }

    const handleTitleChange = e => {
        setPlaylistName(e.target.value)
    };

    const handleCancel = () => {
        history.goBack();
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const validationErrors = [];
        if (playlist.songs.length === 0) {
            validationErrors.push("Please add a song to the list.");
        }
        if (playlistName === '') {
            validationErrors.push("Please provide a name for the playlist");
        } else if (playlistName.length > 50) {
            validationErrors.push("Playlist name cannot be greater than 50 characters.");
        }

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        };

        const playlistIds = playlist.songs.map(input => {
            return input.id;
        });

        const payload = {name: playlistName, playlistId: playlist.id, songs:JSON.stringify(playlistIds)}
        await dispatch(editPlaylist(payload));
        history.push('/playlists');
    };

    const addFormFields = () => {
        const newPlaylistValues = { ...playlist };
        newPlaylistValues.songs.push(Object.values(songs)[0]);
        setPlaylist(newPlaylistValues);
    }
    
    const removeFormFields = (i) => {
        const newPlaylistValues = {...playlist};
        newPlaylistValues.songs.splice(i, 1);
        setPlaylist(newPlaylistValues)
    };

    const moveSongUp = idx => {
        const newPlaylistValues = { ...playlist };
        const placeholder = newPlaylistValues.songs[idx];
        newPlaylistValues.songs[idx] = newPlaylistValues.songs[idx - 1];
        newPlaylistValues.songs[idx - 1] = placeholder;
        setPlaylist(newPlaylistValues);
    };

    const moveSongDown = idx => {
        const newPlaylistValues = { ...playlist };
        const placeholder = newPlaylistValues.songs[idx];
        newPlaylistValues.songs[idx] = newPlaylistValues.songs[idx + 1];
        newPlaylistValues.songs[idx + 1] = placeholder;
        setPlaylist(newPlaylistValues);
    };

    return (
        <div className="playlist-form-div">
            <form
                className="playlist-form"
                onSubmit={handleSubmit}
            >
                <ul>
                    {errors ? errors.map((error, idx) => {
                        return (<li key={idx}>{error}</li>)
                    }) : null}
                </ul>
                <label
                    htmlFor="playlist-name"
                >Playlist Name:</label>
                <input
                    id="playlist-name"
                    type="text"
                    name="playlist-name"
                    value={playlistName}
                    onChange={handleTitleChange}
                />
                {playlist?.songs.map((song, idx) => {
                    return (
                        <div className="playlist-item-div" key={idx}>
                            <label>Song #{idx + 1}</label>
                            <select
                                value={song.id}
                                onChange={e => handleSongChange(idx, e)}
                            >
                                {Object.values(songs).map((song) => (
                                    <option key={song.id} value={song.id}>{song.title}</option>
                                ))}
                            </select>
                            <div className="playlist-song-buttons">
                                <button type="button" className="button remove" onClick={() => removeFormFields(idx)}><FontAwesomeIcon className="fa-solid" icon={faTrashCan} /></button>
                                {idx ? <button type="button" className="button remove" onClick={() => moveSongUp(idx)}><FontAwesomeIcon className="fa-solid" icon={faArrowUp} /></button> : null}
                                {idx < playlist.songs.length - 1 ? <button type="button" className="button remove" onClick={() => moveSongDown(idx)}><FontAwesomeIcon className="fa-solid" icon={faArrowDown} /></button> : null}
                            </div>
                        </div>
               ) 
            })}
                <div className='button-section'>
                    <div className="add-song-div">
                        <button className="button add" type="button" onClick={() => addFormFields()}>
                            <FontAwesomeIcon className="fa-solid" icon={faPlus} />
                        </button>
                    </div>
                    <div className="submit-playlist-div">
                        <button className="submit" type='submit'>Edit Playlist</button>
                        <button className="cancel" type='reset' onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditPlaylist;