import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateOneSong } from '../../../store/song'


function LoginForm({ props }) {
    const history = useHistory()
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState();
    const [artist, setArtist] = useState();
    const [description, setDescription] = useState();
    const [publicSong, setPublicSong] = useState();
    const [genreId, setGenreId] = useState();

    const genresObj = useSelector(state => state.genres.genres);

    const onUpdate = async (e) => {
        e.preventDefault();
        const new_song_info = {
            title,
            artist,
            description,
            publicSong,
            genreId
        }

        const data = await dispatch(updateOneSong(new_song_info))
    };

    return (
        <>
            <form onSubmit={onUpdate}>
                <div className='modal_ul_errors'>
                    {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                    ))}
                </div>

                <label>
                    <input
                        id='email'
                        type="text"
                        value={email}
                        onChange={updateEmail}
                        placeholder='Email'
                        required
                    />
                </label>
                <label>
                    <input
                        id='password'
                        type="password"
                        value={password}
                        onChange={updatePassword}
                        placeholder='Password'
                        required
                    />
                </label>
                <button className="button_submit button_main" type="submit">Log In</button>
            </form>
            <hr className="hrmodal"/>
            <form  onSubmit={DemoLogin}>
                <button className="button_submit button_secondary"type="submit">Demo User</button>
            </form>
            <form onSubmit={handleRedirect}>
                <button className="button_submit button_transfer" type="submit">Want to Sign Up?</button>
            </form>
        </>
    );
}


export default LoginForm;
