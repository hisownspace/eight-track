import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editOneComment, getAllSongComments } from '../../../store/comment';

const EditCommentForm = ({ showModal, commentId, setShowModal, commentContent, songId }) => {
    const dispatch = useDispatch();
    const [ content, setContent] = useState(commentContent);
    const [errors, setErrors] = useState([]);

    const handleSubmit = event => {
        event.preventDefault();

        setErrors([]);

        const validationErrors = [];

        if (content.length > 250) {
            validationErrors.push("Comments cannot be longer than 250 characters.");
        }
        if (content.length === 0) {
            validationErrors.push("Comments cannot be empty.");
        }

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        };

        const payload = {
            commentId,
            content,
            songId
        }
        dispatch(editOneComment(payload));
        dispatch(getAllSongComments(+songId));
        setShowModal(false);
    };

    const checkErrors = e => {
        setContent(e.target.value);
    
        setErrors([]);

        const validationErrors = [];

        if (content.length > 250) {
            validationErrors.push("Comments cannot be longer than 250 characters.");
        }

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
        };
        
    };

    return (
        <form onSubmit={handleSubmit}>
            {errors ? errors[0] : null}
            <label htmlFor="content">
                {/* <img src={user.image_url || } */}
            </label>
            <input
                type="text"
                value={content}
                onChange={checkErrors}
                // placeholder="Write a comment..."
                className='comment-box'
            />
            <input type="hidden" value={commentId}></input>
            <input type="hidden" value={songId}></input>
            <button className="submit-comment-edit-button button">Submit Comment</button>
        </form>
    )
}

export default EditCommentForm;