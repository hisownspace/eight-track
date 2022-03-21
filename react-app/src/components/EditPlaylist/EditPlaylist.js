import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
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
            setPlaylistName(playlist.name)
        }
    }, [playlists, playlistId, playlistLoaded, history, playlist, dispatch]);

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
        if (playlist.name === '') {
            validationErrors.push("Please provide a name for the playlist");
        } else if (playlist.name.length > 50) {
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

    return (
        <form
            onSubmit={handleSubmit}
        >
            <label
                htmlFor="playlist-name"
            ></label>
            <input
                id="playlist-name"
                type="text"
                name="playlist-name"
                value={playlistName}
                onChange={handleTitleChange}
            />
            {playlist?.songs.map((song, idx) => {
               return (
                   <div key={idx}>
                    <label>Song #{idx + 1}</label>
                    <select
                        value={song.id}
                        onChange={e => handleSongChange(idx, e)}
                    >
                        {Object.values(songs).map((song) => (
                            <option key={song.id} value={song.id}>{song.title}</option>
                        ))}
                    </select>
                    <button type="button" className="button remove" onClick={() => removeFormFields(idx)}>Remove</button>
                            {idx ? <button type="button" className="button remove" onClick={() => moveSongUp(idx)}>Move Up</button> : null}

                   </div>
               ) 
            })}
            <button className="button add" type="button" onClick={() => addFormFields()}>Add Song</button>
            <button type='submit'>Edit Playlist</button>
            <button type='reset' onClick={handleCancel}>Cancel</button>
        </form>
    )
}

export default EditPlaylist;