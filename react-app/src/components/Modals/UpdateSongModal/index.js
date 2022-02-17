import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from '../../../context/Modal';
import { getAllGenres } from '../../../store/genre';
import UpdateSongFormModal from './UpdateSongForm';

function UpdateSongForm() {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const genresObj = useSelector(state => state.genres.genres);

    useEffect(() => {
        dispatch(getAllGenres());
    }, []);

    return (
        <>
            <button className='button button_login' onClick={() => setShowModal(true)}>Update Song Info</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <UpdateSongFormModal genresObj={genresObj} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )

}

export default UpdateSongForm;
