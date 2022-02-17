import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateOneSong } from '../../../store/song'

function UpdateSongFormModal({ genresObj, setShowModal }) {
    const history = useHistory()
    const dispatch = useDispatch();
    const song = useSelector(state => state.songs.songs)
    const songArr = Object.values(song)[0]


    const [title, setTitle] = useState(songArr.title);
    const [artist, setArtist] = useState(songArr.artist);
    const [description, setDescription] = useState(songArr.description);
    const [publicSong, setPublicSong] = useState(songArr.public);
    const [genreId, setGenreId] = useState(songArr.genre.id);
    const [errors, setErrors] = useState([]);


    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("id", songArr.id);
        formData.append("title", title);
        formData.append("artist", artist);
        formData.append("genreId", genreId);
        formData.append("description", description);
        formData.append("publicSong", publicSong);
        const res = await dispatch(updateOneSong(formData))
        if (res?.errors) {
            setErrors(["There was an unknown error. Please Try again later."]);
        } else {
            setShowModal(false)
            history.push(`/songs/${songArr.id}`)
        }
    };


        return (
        <>
            <form onSubmit={handleUpdate}>
                <div className='modal_ul_errors'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div className='form-content'>

                    <label>
                        <input
                            id='title'
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='Title'
                            required
                        />
                    </label>
                </div>
                <div className='form-content'>
                    <label>
                        <input
                            id='artist'
                            type="test"
                            value={artist}
                            onChange={e => setArtist(e.target.value)}
                            placeholder='Artist'
                            required
                        />
                    </label>
                </div>
                <div className='form-content'>
                    <label>
                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            autoComplete="off"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </label>
                </div>
                <div className='form-content'>
                    <label>
                    <input
                        type="checkbox"
                        name="public"
                        checked={publicSong}
                        onChange={e => setPublicSong(!publicSong)}
                    />
                    </label>
                </div>
                <div className='form_content'>
                    <label htmlFor="genre">Genre</label>
                    <select
                        value={genreId}
                        onChange={(e) => setGenreId(e.target.value)}
                    >
                        {Object.values(genresObj).map((genre) => (
                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                        ))}
                    </select>
                </div>
                <button className="button_submit button_main" type="submit">Update Song</button>
            </form>
            <hr className="hrmodal" />
        </>
    );
}


export default UpdateSongFormModal;
