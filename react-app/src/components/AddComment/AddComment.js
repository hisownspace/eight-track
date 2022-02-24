import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSongComment, getAllSongComments } from '../../store/comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import './AddComment.css'

function AddComment({ songId, audioRef }) {
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const userId = useSelector(state => state.session.user.id);
    const playTime = useSelector(state => state.player.time);
    const playerSong = useSelector(state => state.player.currentSong)
    const pageSong = useSelector(state => state.songs.song)


    const handleSubmit = async e => {
        e.preventDefault();
        let timestamp;
        if (playTime && Object.values(pageSong)[0].url === playerSong.url) {
                timestamp = playTime;
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