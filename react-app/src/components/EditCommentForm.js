import React, { useState } from 'react';

const EditCommentForm = ({ showModal, commentId, setShowModal, curentContent }) => {

    const [ content, setContent] = useState();

    const handleSubmit = event => {
        event.preventDefault();
        console.log("submitted");
        setShowModal(false);
    };

    return (
        <form onSubmit={handleSubmit}>
        <label htmlFor="content">
            {/* <img src={user.image_url || } */}
        </label>
        <input
            type="text"
            value={content}
            onChange={e => setContent(e.target.value)}
            // placeholder="Write a comment..."
            className='comment-box'
            />
    </form>
    )
}

export default EditCommentForm;