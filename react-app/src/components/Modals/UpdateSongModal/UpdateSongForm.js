import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateOneSong } from '../../../store/song'
import { getAllGenres } from '../../../store/genre';


function UpdateSongFormModal({ genresObj }) {
    const history = useHistory()
    const dispatch = useDispatch();
    const song = useSelector(state => state.songs.songs)
    const songArr = Object.values(song)[0]

    console.log(songArr);

    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState(songArr.title);
    const [artist, setArtist] = useState(songArr.artist);
    const [description, setDescription] = useState(songArr.description);
    const [publicSong, setPublicSong] = useState(songArr.public);
    const [genreId, setGenreId] = useState(songArr.genre.id);
    const [errors, setErrors] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const new_song_info = {
            id: songArr.id
            title,
            artist,
            description,
            publicSong,
            genreId
        }
        console.log(new_song_info);
        const data = await dispatch(updateOneSong(new_song_info))
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
