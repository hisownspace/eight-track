import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSongComment, getAllSongComments } from "../../store/comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./AddComment.css";

function AddComment({ songId, audioRef }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState();
  const player = useSelector((state) => state.player.player);
  const userId = useSelector((state) => state.session.user.id);
  // const playTime = useSelector(state => state.player.time);
  const playerSong = useSelector((state) => state.player.currentSong);
  const pageSong = useSelector((state) => state.songs.song);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let timestamp;
    let validationErrors = [];

    if (content.length > 250) {
      validationErrors.push("Comments cannot be longer than 250 characters.");
    }
    if (content.length === 0) {
      validationErrors.push("Comments cannot be empty.");
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    let playTime;

    if (player.current) {
      playTime = player.current?.audio.current.currentTime;
    }

    if (playTime && Object.values(pageSong)[0].url === playerSong.url) {
      timestamp = playTime;
    } else {
      timestamp = 0;
    }
    const payload = {
      content,
      songId,
      userId,
      timestamp,
    };
    await dispatch(addSongComment(payload));
    dispatch(getAllSongComments(songId));
    setContent("");
    setErrors([]);
  };

  const checkErrors = (e) => {
    setContent(e.target.value);

    setErrors([]);

    const validationErrors = [];

    if (content.length > 250) {
      validationErrors.push("Comments cannot be longer than 250 characters.");
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="comment-form-wrapper">
      <form onSubmit={handleSubmit}>
        {errors ? errors[0] : null}
        <label htmlFor="content">
          {/* <img src={user.image_url || } */}
          <FontAwesomeIcon className="fa-solid" icon={faUser} />
        </label>
        <input
          id="content"
          type="text"
          value={content}
          onChange={checkErrors}
          placeholder="Write a comment..."
          className="comment-box"
        />
        {/*<button>Submit Comment</button> */}
      </form>
    </div>
  );
}

export default AddComment;
