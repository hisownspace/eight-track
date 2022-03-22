import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getOneSong, updateOneSong } from '../../../store/song'

function UpdateSongFormModal({ genresObj, setShowModal }) {
    const history = useHistory()
    const dispatch = useDispatch();
    const song = useSelector(state => state.songs.song)
    const songArr = Object.values(song)[0]


    const [title, setTitle] = useState(songArr.title);
    const [artist, setArtist] = useState(songArr.artist);
    const [description, setDescription] = useState(songArr.description);
    const [publicSong, setPublicSong] = useState(songArr.public);
    const [genreId, setGenreId] = useState(songArr.genre.id);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);


    const handleUpdate = async (e) => {
        e.preventDefault();

        const formErrors = {};


        if (artist === "") {
            formErrors["artist"] = "Please fill out artist field!";
        } else if (artist.length > 150) {
            formErrors["artist"] = "Artist name cannot be longer than 150 characters!"
        }
        if (title === "") {
            formErrors["title"] = "Please fill out title field!";
        } else if (title.length > 150) {
            formErrors["title"] = "Song title cannot be longer than 150 characters!"
        }

        if (Object.values(formErrors).length > 0) {
            setErrors(formErrors);
            setSubmitted(true);
        } else {
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
                dispatch(getOneSong(songArr.id))
                setShowModal(false)
                history.push(`/songs/${songArr.id}`)
            }
        }
    };


    useEffect(() => {
        const formErrors = {};
        if (submitted && !artist) {
          formErrors.artist = ("Please fill out artist field!")
        } else if (submitted && artist.length > 150) {
          formErrors.artist = "Artist name cannot be longer than 150 characters!";
        } else if (submitted) {
          formErrors.artist = null;
        }
        if (submitted && !title) {
          formErrors.title = ("Please fill out title field!")
        } else if (submitted && title.length > 150) {
          formErrors.title = "Title cannot be longer than 150 characters.";
        } else if (submitted) {
          formErrors.title = null;
        }
        if (Object.values(formErrors).length > 0) {
          setErrors(formErrors);
        }
      }, [artist, title, submitted]);


        return (
        <>
            <form onSubmit={handleUpdate}>
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
                    {Object.values(errors).length > 0 && errors.title ?
                    <div className="upload-errors">{errors.title}</div> :
                    <div className="upload-errors"></div>}
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
                    {Object.values(errors).length > 0 && errors.artist ?
                    <div className="upload-errors">{errors.artist}</div> :
                    <div className="upload-errors"> </div>}
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
                {/* <div className='form-content'>
                    <label>
                    <input
                        type="checkbox"
                        name="public"
                        checked={publicSong}
                        onChange={e => setPublicSong(!publicSong)}
                    />
                    </label>
                </div> */}
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
                <button className="edit-comment" type="submit">Update Song</button>
            </form>
            <hr className="hrmodal" />
        </>
    );
}


export default UpdateSongFormModal;
