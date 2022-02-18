import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteOneComment, getAllSongComments } from '../../store/comment';
import { deleteOneSong, getOneSong } from '../../store/song';
import UpdateSongForm from '../Modals/UpdateSongModal';
import AddComment from '../AddComment';
import './SongDetail.css';


function SongDetail() {
    const { id } = useParams();
    const songId = +id;
    const dispatch = useDispatch();
    const history = useHistory();
    const song = useSelector(state => state.songs.song[songId]);
    const comments = useSelector(state => state.comments.comments);
    const userId = useSelector(state => state.session.user?.id);
    const audioRef = useRef();

    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        dispatch(getOneSong(songId))
        .then(() => setIsLoaded(true));
        dispatch(getAllSongComments(songId));
    }, [songId, dispatch, isLoaded]);
    
    useEffect(() => {
        if (isLoaded && !song) {
            history.push("/songs");
        }
    }, [isLoaded, history, song]);

    const handleDelete = () => {
        dispatch(deleteOneSong(songId));
        history.push("/songs");
    };
    
    const handleDeleteComment = e => {
        e.preventDefault();
        const commentId = +(e.target.value);
        dispatch(deleteOneComment(commentId));
        dispatch(getAllSongComments(songId));
        setIsLoaded(false);
    };


    // const openCommentForm = e => {

    // };

    // const handleEditComment = e => {
    //     e.preventDefault();
    //     const payload = {
    //         content,
    //         commentId: e.target.value
    //     } 
    //     const commentId = +(e.target.value);
    //     dispatch(editOneComment(commentId));
    // };

    return (
        <>
            <div className='song-detail'>
                <div>{song?.title}</div>
                <div>{song?.artist}</div>
                <div>{song?.description}</div>
                {(userId && (userId === song?.user?.id)) ? 
                <>
                    <button onClick={handleDelete}>Delete Song</button>
                    <UpdateSongForm />
                </> : null}
                <audio ref={audioRef} controls src={song?.url}></audio>
            </div>
            <div className='song-comments'>
                {userId ? <AddComment songId={songId} audioRef={audioRef}/> : null}
                {isLoaded && comments?.comments && (Object.values(comments?.comments)).map((comment, idx) => {
                   return (
                   <div key={idx} className='comment-list-item'>
                       <p>{comment.content}</p>
                       <div> - {comment.user.username}</div>
                       <div>{comment.timestamp}</div>
                       {comment.user.id === userId ?
                       <>
                                <button
                                value={comment.id}
                                    onClick={handleDeleteComment}>
                                    Delete Comment
                                </button>
                        </>
                        : null}
                       </div>)
                })}
            </div>

        </>
    )
}

export default SongDetail