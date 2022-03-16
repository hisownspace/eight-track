import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteOneComment, getAllSongComments } from '../../store/comment';
import { deleteOneSong, getAllSongs, getOneSong } from '../../store/song';
import UpdateSongForm from '../Modals/UpdateSongModal';
import AddComment from '../AddComment';
import WaveForm from '../WaveForm';
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
    const  [backIdx, setBackIdx] = useState(0);
    const audioRef = useRef();
    const palette = useSelector(state => state.songs?.song[songId]?.palette);
    const [gradient, setGradient] = useState('');



    // establishes the background of the song header
    // based on color palette of song cover
    useEffect(() => {
        if (palette) {
            const backgroundColor = `linear-gradient(135deg,
                rgb(${palette[0][0]}, ${palette[0][1]}, ${palette[0][2]})
                0%,
                rgb(${palette[1][0]}, ${palette[1][1]}, ${palette[1][2]})
                100%)`;
            setGradient(backgroundColor);
        }
    }, [palette, gradient]);

    useEffect(() => {
        const songBackground = Math.floor(Math.random() * 10)
        setBackIdx(songBackground);
    }, [song]);

    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        dispatch(getOneSong(songId))
        .then(() => setIsLoaded(true));
        dispatch(getAllSongComments(songId));
    }, [songId, dispatch, isLoaded]);
    
    useEffect(() => {
        if (isLoaded && song && !(song.id) && history && songId) {
            window.alert(song?.id);
            history.push("/songs");
        }
    }, [isLoaded, songId, song, dispatch, history]);

    const handleDelete = async () => {
        const confirm = window.confirm(
            "This will permanently delete this song. Are you sure?");
        if (confirm) {
            await dispatch(deleteOneSong(songId));
            await dispatch(getAllSongs());
            history.push("/songs");
        }
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
            <div
            className={`song-detail`}
            style={{background: gradient}}
            >
                <div className='song-detail-player-side'>
                    <div className="song-info-headline">
                        <div>
                            <div className='song-info-title'>
                                <p>
                                    {song?.title}
                                </p>
                            </div>
                            <div className='song-info-artist'>
                                <p>
                                    {song?.artist}
                                </p>
                            </div>
                            {(userId && (userId === song?.user?.id)) ?
                                <>
                                    <button
                                        className="song-detail-buttons"
                                        onClick={handleDelete}>Delete Song</button>
                                    <UpdateSongForm />
                                </> : null}
                        </div>
                        <div>
                            <div className="song-detail-timestamp">
                                {isLoaded ? timeElapsed(song?.created_at) : null}
                            </div>
                            <div className="song-detail-genre">
                                # {song?.genre.name}
                            </div>
                        </div>
                    </div>
                    <div className="song-detail-player">
                        <WaveForm songId={songId} />
                    </div>
                </div>
                <div className='song-detail-album-art'>
                    <img
                    alt={song?.title}
                    src={song?.image_url ||
                        "https://eta-photobucket.s3.amazonaws.com/play-button.svg"}
                    ></img>
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
                                        className="delete-comment-button"
                                        value={comment.id}
                                        onClick={handleDeleteComment}>
                                        Delete Comment
                                    </button>
                                    <EditCommentModal
                                        commentId={comment?.id}
                                        commentContent={comment?.content}
                                        songId={songId} />
                                </>
                                : null}
                        </div>)
                })}
            </div>
        </>
    )
}

export default SongDetail