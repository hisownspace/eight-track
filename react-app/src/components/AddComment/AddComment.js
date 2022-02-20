import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSongComment, getAllSongComments } from '../../store/comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import './AddComment.css'

function AddComment({ songId, audioRef }) {
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const userId = useSelector(state => state.session.user.id)


    const handleSubmit = async e => {
        e.preventDefault();
        let timestamp;
        if (audioRef?.current?.currentTime) {
                timestamp = audioRef.current.currentTime;
            } else {
                    timestamp = 0;
            }
        const payload = {
            content,
            songId,
            userId,
            timestamp
        }
        await dispatch(addSongComment(payload));
        dispatch(getAllSongComments(songId));
        setContent('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="content">
                {/* <img src={user.image_url || } */}
                <FontAwesomeIcon className="fa-solid" icon={faUser} />
            </label>
            <input
                type="text"
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Write a comment..."
                className='comment-box'
                />
            {/* <button>Submit Comment</button> */}
        </form>
    )
}

export default AddComment;