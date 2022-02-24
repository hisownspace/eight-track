import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editOneComment, getAllSongComments } from '../store/comment';

const EditCommentForm = ({ showModal, commentId, setShowModal, commentContent, songId }) => {
    const dispatch = useDispatch();
    // const comment = useSelector(state => state.comments.comments.comments)
    const [ content, setContent] = useState(commentContent);

    const handleSubmit = event => {
        event.preventDefault();
        const payload = {
            commentId,
            content,
            songId
        }
        dispatch(editOneComment(payload));
        dispatch(getAllSongComments(+songId));
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
            <input type="hidden" value={commentId}></input>
            <input type="hidden" value={songId}></input>
            <button className="submit-comment-edit-button">Submit Comment</button>
        </form>
    )
}

export default EditCommentForm;