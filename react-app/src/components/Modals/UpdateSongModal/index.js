import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import UpdateSongForm from './UpdateForm';

function UpdateSongFormModal() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button className='button button_login' onClick={() => setShowModal(true)}>Update Song Info</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <UpdateSongForm />
                </Modal>
            )}
        </>
    )

}

export default UpdateSongFormModal;
