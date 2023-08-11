import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { deleteOneComment, getAllSongComments } from "../../store/comment";
import { addSongToPlaylist, clearPlaylist } from "../../store/playlist";
import { addSongToPlayer, setPlayerTime } from "../../store/player";
import { getOneSong } from "../../store/song";
import AddComment from "../AddComment";
import WaveForm from "../WaveForm";
import "./SongDetail.css";
import EditCommentModal from "../Modals/EditCommentFormModal";

function SongDetail() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();
  const songId = +id;
  const dispatch = useDispatch();
  const history = useHistory();
  const song = useSelector((state) => state.songs.song[songId]);
  const comments = useSelector((state) => state.comments.comments);
  const userId = useSelector((state) => state.session.user?.id);
  const player = useSelector((state) => state.player.player);
  const waveformLoaded = useSelector((state) => state.player.waveformLoaded);
  const audioRef = useRef();
  const palette = useSelector((state) => state.songs?.song[songId]?.palette);
  const [gradient, setGradient] = useState("");

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
    } else {
      const backgroundColor =
        "linear-gradient(135deg, rgb(255, 255, 255) 0%, rgb(0, 0 , 0) 100%)";
      setGradient(backgroundColor);
    }
  }, [palette, gradient]);

  useEffect(() => {
    dispatch(getOneSong(songId)).then(() => setIsLoaded(true));
    dispatch(getAllSongComments(songId));
  }, [songId, dispatch, isLoaded]);

  useEffect(() => {
    if (isLoaded && (!song || song?.errors)) {
      history.push("/songs");
    }
  }, [isLoaded, history]);

  const handleDeleteComment = (e) => {
    e.preventDefault();
    const confirm = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (confirm) {
      const commentId = +e.target.value;
      dispatch(deleteOneComment(commentId));
      dispatch(getAllSongComments(songId));
      setIsLoaded(false);
    }
  };

  const timeElapsed = (time) => {
    const postDate = new Date(time);
    const rightNow = new Date(Date.now());
    const elapsedTime = rightNow - postDate;
    const seconds = elapsedTime / 1000;
    const minutes = seconds / 60;
    if (minutes < 5) {
      return "Just moments ago...";
    }
    const hours = minutes / 60;
    if (hours < 1) {
      return `${Math.floor(minutes)} minutes ago`;
    } else if (Math.floor(hours) === 1) {
      return `1 hour ago`;
    }
    const days = hours / 24;
    if (days < 1) {
      return `${Math.floor(hours)} hours ago`;
    } else if (Math.floor(days) === 1) {
      return `1 day ago`;
    }
    const months = days / 30;
    if (months < 1) {
      return `${Math.floor(days)} days ago`;
    }
    const years = months / 12;
    if (years < 1) {
      return `${Math.floor(months)} months ago`;
    } else if (Math.floor(years) === 1) {
      return `1 year ago`;
    } else {
      return `${Math.floor(years)} years ago`;
    }
  };

  const startAtTimestamp = async (timestamp, songUrl, songId) => {
    const newTime =
      parseInt(timestamp.split(":")[0]) * 60 +
      parseInt(timestamp.split(":")[1]);
    // await dispatch(clearPlaylist());
    await dispatch(addSongToPlaylist(songId));
    if (player.current.audio.currentSrc != songUrl) {
      await dispatch(addSongToPlayer(songId));
      await dispatch(clearPlaylist());
      await dispatch(setPlayerTime(newTime));
    }
    player.current.audio.current.currentTime = newTime;
    player.current.audio.current.play();
  };

  if (isLoaded) {
    return (
      <>
        <div className={`song-detail`} style={{ background: gradient }}>
          <div className="song-detail-player-side">
            <div className="song-detail-player">
              <WaveForm songId={songId} />
            </div>
          </div>
          <div className="song-detail-album-art">
            <img
              alt={song?.title}
              src={
                song?.image_url ||
                "https://eta-photobucket.s3.amazonaws.com/play-button.svg"
              }
            ></img>
          </div>
        </div>
        <div className="song-comments">
          <div className="song-description">{song?.description}</div>
          {userId ? <AddComment songId={songId} audioRef={audioRef} /> : null}
          <ul className="comment-list">
            {isLoaded &&
              waveformLoaded &&
              comments?.comments &&
              Object.values(comments?.comments)
                .reverse()
                .map((comment) => {
                  return (
                    <li key={comment.id} className="comment-list-item">
                      <div className="comment-main">
                        <div className="comment-image-div">
                          <img src={comment.user.image_url} />
                        </div>
                        <div className="comment-name-timestamp-content">
                          <div className="comment-name-and-timestamp">
                            <Link to={`/users/${comment.user.id}`}>
                              {comment.user.username}{" "}
                            </Link>
                            <span className="comment-at">at</span>{" "}
                            <span
                              className="comment-timestamp"
                              onClick={() =>
                                startAtTimestamp(
                                  comment.timestamp,
                                  comment.song.url,
                                  comment.song.id
                                )
                              }
                            >
                              {comment.timestamp}
                            </span>
                          </div>
                          <div>{comment.content}</div>
                          {comment.user.id === userId ? (
                            <>
                              <button
                                className="delete-comment-button"
                                value={comment.id}
                                onClick={handleDeleteComment}
                              >
                                Delete Comment
                              </button>
                              <EditCommentModal
                                commentId={comment?.id}
                                commentContent={comment?.content}
                                songId={songId}
                              />
                            </>
                          ) : null}
                        </div>
                      </div>
                      <div className="comment-time-elapsed">
                        <div>{timeElapsed(comment.created_at)}</div>
                      </div>
                    </li>
                  );
                })}
          </ul>
        </div>
      </>
    );
  } else {
    return null;
  }
}

export default SongDetail;
