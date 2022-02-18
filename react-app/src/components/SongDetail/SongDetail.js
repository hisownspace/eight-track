import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getAllSongComments } from '../../store/comment';
import { deleteOneSong, getOneSong } from '../../store/song';
import UpdateSongForm from '../Modals/UpdateSongModal';
import AddComment from '../AddComment';


function SongDetail() {
    const { id } = useParams();
    const songId = +id;
    const dispatch = useDispatch();
    const history = useHistory()
    const song = useSelector(state => state.songs.song[songId]);
    const comments = useSelector(state => state.comments.comments)
    const userId = useSelector(state => state.session.user.id)


    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        dispatch(getOneSong(songId))
        .then(() => setIsLoaded(true));
        dispatch(getAllSongComments(songId));
        console.log('comments', comments);
    }, [songId, dispatch]);
    
    useEffect(() => {
        if (isLoaded && !song) {
            history.push("/songs");
        }
    }, [isLoaded, history, song])

    const handleDelete = () => {
        dispatch(deleteOneSong(songId));
        history.push("/songs");
    };
    
    const handleEdit = () => {
        
    };

    return !isLoaded ? null : (
        <>
            <h1>Song Page</h1>
            <div className='song-detail'>
                <div>{song?.title}</div>
                <div>{song?.artist}</div>
                <div>{song?.description}</div>
                <button onClick={handleDelete}>Delete Song</button>
                <button onClick={handleEdit}>Edit Song Information</button>
                <UpdateSongForm />
                <audio controls src={song?.url}></audio>
            </div>
            <div className='song-comments'>
                <AddComment songId={songId}/>
                {comments?.comments && (Object.values(comments?.comments)).map(comment => {
                   return (
                   <div className='comment-list-item'>
                       <p>{comment.content}</p>
                       <div> - {comment.user.username}</div>
                       {comment.user.id === userId ? <button>Edit Comment</button> : null}
                   </div>)
                })}
            </div>

        </>
    )
}

export default SongDetail