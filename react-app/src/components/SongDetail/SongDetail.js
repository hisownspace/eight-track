import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteOneComment, getAllSongComments, editOneComment } from '../../store/comment';
import { deleteOneSong, getAllSongs, getOneSong } from '../../store/song';
import { addSongToPlayer } from '../../store/player';
import UpdateSongForm from '../Modals/UpdateSongModal';
import AddComment from '../AddComment';
import WaveFormTEST from '../WaveForm';
import './SongDetail.css';
import EditCommentModal from '../../context/EditComment';


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
    }, [isLoaded, history, song, dispatch, songId]);

    const handleDelete = () => {
        dispatch(deleteOneSong(songId));
        dispatch(getAllSongs());
        history.push("/songs");
    };
    
    const handleDeleteComment = e => {
        e.preventDefault();
        const commentId = +(e.target.value);
        dispatch(deleteOneComment(commentId));
        dispatch(getAllSongComments(songId));
        setIsLoaded(false);
    };

    const timeElapsed = (time) => {
        const postDate = new Date(time);
        const rightNow = new Date(Date.now());
        const elapsedTime = rightNow - postDate
        const seconds = elapsedTime / 1000;
        const minutes = seconds / 60;
        if (minutes < 5) {
            return "Just moments ago...";
        }
        const hours = minutes / 60;
        if (hours < 1) {
            return `${Math.floor(minutes)} minutes ago`
        } else if (Math.floor(hours) === 1) {
            return `1 hour ago`;
        }
        const days = hours / 24;
        if ( days < 1) {
            return `${Math.floor(hours)} hours ago`;
        } else if (Math.floor(days) ===1) {
            return `1 day ago`
        }
        const months = days / 30;
        if (months < 1) {
            return `${Math.floor(days)} days ago`;
        }
        const years = months / 12
        if (years < 1) {
            return `${Math.floor(months)} months ago`;
        } else if (Math.floor(years) === 1) {
            return `1 year ago`;
        } else {
            return `${Math.floor(years)} years ago`;
        }
    };

    return (
        <>
            <div className='song-detail'>
                <div className='song-detail-player-side'>
                    <div className="song-info-headline">
                        <div>
                            <div>{song?.title}</div>
                            <div>{song?.artist}</div>
                            {(userId && (userId === song?.user?.id)) ?
                                <>
                                    <button onClick={handleDelete}>Delete Song</button>
                                    <UpdateSongForm />
                                </> : null}
                        </div>
                        <div>
                            <div>
                                {isLoaded ? timeElapsed(song?.created_at) : null}
                            </div>
                            <div>
                                {song?.genre.name}
                            </div>
                        </div>
                    </div>
                    <div className="song-detail-player">
                        <WaveFormTEST songId={songId} />
                    </div>
                </div>
                <div className='song-detail-album-art'>
                    <img alt={song?.title} src={song?.image_url || "https://hisownbucket.s3.amazonaws.com/play-button.svg"}></img>
                </div>
            </div>
            <div className='song-comments'>
                <div className="song-description">{song?.description}</div>
                {userId ? <AddComment songId={songId} audioRef={audioRef} /> : null}
                {isLoaded && comments?.comments && (Object.values(comments?.comments)).reverse().map(comment => {
                    return (
                        <div key={comment.id} className='comment-list-item'>
                            <div>{comment.user.image_url}</div>
                            <div>{comment.content}</div>
                            <div> - {comment.user.username}</div>
                            <div>{comment.timestamp}</div>
                            <div>{timeElapsed(comment.created_at)}</div>
                            {comment.user.id === userId ?
                                <>
                                    <button
                                        value={comment.id}
                                        onClick={handleDeleteComment}>
                                        Delete Comment
                                    </button>
                                    <EditCommentModal commentId={comment?.id} commentContent={comment?.content} songId={songId} />
                                </>
                                : null}
                        </div>)
                })}
            </div>
        </>
    )
}

export default SongDetail