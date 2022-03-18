import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { addPlaylist } from '../../store/playlist';
import { useHistory } from 'react-router-dom';

function AddPlaylist () {
    const dispatch = useDispatch();
    const history = useHistory();
    const songs = useSelector(state => state.songs.songs);
    const [playlistName, setPlaylistName] = useState('');
    const userId = useSelector(state => state.session.user.id);
    const [formValues, setFormValues] = useState([]);
    const [errors, setErrors] = useState([]);

    const handleChange = (i, e) => {
        const songId = e.target.value
        const newFormValues = [...formValues];
        newFormValues[i].id = songId;
        newFormValues[i].name = songs[songId].title
        setFormValues(newFormValues);
    }
    
    const addFormFields = () => {
        setFormValues([...formValues,
            { name: Object.values(songs)[0].title,
                id: Object.values(songs)[0].id.toString() }]);
    }
    
    const removeFormFields = (i) => {
        const newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    
    const handleSubmit = async event => {
        event.preventDefault();
        
        const validationErrors = [];

        if (formValues.length === 0) {
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

        const playlistIds = formValues.map(input => {
            return input.id;
        });
        

        const formData = new FormData();
        formData.append("name", playlistName);
        formData.append("userId", userId);
        formData.append("songs", playlistIds.join(','));

        const payload = { name: playlistName, userId, songs: JSON.stringify(playlistIds)}
        
        
        setFormValues([]);
        setPlaylistName('');
        await dispatch(addPlaylist(payload));
        history.push('/playlists');
    };

    const cancelSubmit = () => {
        history.push('/playlists');
    }

    const moveSongUp = idx => {
        const newFormValues = [...formValues];
        const placeholder = newFormValues[idx];
        newFormValues[idx] = newFormValues[idx - 1];
        newFormValues[idx - 1] = placeholder;
        setFormValues(newFormValues);
    };

    return (
        <form onSubmit={handleSubmit}>
            <ul>
            {errors ? errors.map((error, idx) => {
                return (<li key={idx}>{error}</li>)
            }) : null}
            </ul>
            <label>
                Playlist Name:
            </label>
            <input
                type="text"
                value={playlistName}
                placeholder="Enter a name for your playlist..."
                onChange={e => setPlaylistName(e.target.value)}
            ></input>
            {formValues.map((element, index) => (
                <div className="form-inline" key={index}>
                    <label>Song #{index + 1}</label>
                    <select
                        value={formValues[index].id}
                        onChange={e => handleChange(index, e)}
                    >
                        {Object.values(songs).map((song) => (
                            <option key={song.id} value={song.id}>{song.title}</option>
                        ))}
                    </select>
                    {formValues.length > 1 ?
                        <div>
                            <button type="button" className="button remove" onClick={() => removeFormFields(index)}>Remove</button>
                            {index ? <button type="button" className="button remove" onClick={() => moveSongUp(index)}>Move Up</button> : null}
                        </div>
                        : null}
                </div>
            ))}
            <div className="button-section">
                <button className="button add" type="button" onClick={() => addFormFields()}>Add Song</button>
                <button className="button submit" type="submit">Submit</button>
                <button className="button cancel" type="reset" onClick={cancelSubmit}>Cancel</button>
            </div>
        </form>
    )
};

export default AddPlaylist;