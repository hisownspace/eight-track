import React, { useState } from 'react';
import { Modal } from '../Modal';
// import AddPostForm from "../../components/Forms/AddPostForm.js"
import EditCommentForm from '../../components/EditCommentForm';
import "../Modal.css"

function EditCommentModal({ commentId, commentContent, songId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="edit-button" onClick={() => setShowModal(true)}>Edit Comment</button>
            {/* <button id="add-post-modal-btn" onClick={() => setShowModal(true)}><i className="far fa-plus-square"></i></button> */}
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditCommentForm commentId={commentId} setShowModal={setShowModal} commentContent={commentContent} songId={songId} />
                </Modal>
            )}
        </>
    );
}

export default EditCommentModal;