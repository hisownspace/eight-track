import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import UpdateSongFormModal from './UpdateSongForm';

function UpdateSongForm() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button className='button button_login' onClick={() => setShowModal(true)}>Update Song Info</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <UpdateSongFormModal />
                </Modal>
            )}
        </>
    )

}

export default UpdateSongForm;
