import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addOneSong } from '../../store/song';
import { getAllGenres } from '../../store/genre';
import './DropZone.css';

function DropZone() {
  const history = useHistory();
  const dispatch = useDispatch();
  const genresObj = useSelector(state => state.genres.genres);
  const sessionUser = useSelector(state => state.session.user);
  const songFile = useRef();
  const imageFile = useRef();
  const imagePreview = useRef();

  // const [isLoaded, setIsLoaded] = useState(false);
  const [audioSource, setAudioSource] = useState("");
  const [dropFile, setDropFile] = useState("");
  const [length, setLength] = useState(0);

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [description, setDescription] = useState("");
  const [genreId, setGenreId] = useState(1);
  const [publicSong, setPublicSong] = useState(true);

  const [songLoading, setSongLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    setErrors({});
    e.preventDefault();

    const formErrors = {};

    if (artist === "") {
      formErrors["artist"] = "Please fill out artist field!";
    }
    if (title === "") {
      formErrors["title"] = "Please fill out title field!";
    }


    if (Object.values(formErrors).length > 0) {
      setErrors(formErrors);
      setSubmitted(true);
    } else {
      //* add controlled inputs to form
      const formData = new FormData();
      formData.append("song", dropFile);
      formData.append("length", length);
      formData.append("title", title);
      formData.append("artist", artist);
      formData.append("genreId", genreId);
      formData.append("userId", sessionUser.id);
      formData.append("description", description);
      formData.append("publicSong", publicSong);
      formData.append("image", imageFile.current.files[0]);

      //* aws uploads can be a bit slow—displaying
      //* some sort of loading message is a good idea
      setSongLoading(true);
      setErrors({});
      setArtist('');
      setTitle('');
      setDescription('');
      setPublicSong(true);
      setSubmitted(false);
      
      const res = await dispatch(addOneSong(formData));
      setSongLoading(false);
      if (res.errors) {
        setErrors([res.errors]);
      } else {
        setDropFile("")
        history.push(`/songs/${res.song.id}`)
      }
    }
  }

  const populateImagePreview = (e) => {
    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        imagePreview.current.src = e.target.result;
      }

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    dispatch(getAllGenres());
  }, [songLoading, dispatch]);

  useEffect(() => {
    setErrors({})
    const formErrors = {};
    if (submitted && !artist) {
      formErrors.artist = ("Please fill out artist field!")
    }
    if (submitted && !title) {
      formErrors.title = ("Please fill out title field!")
    }
    if (Object.values(formErrors).length > 0) {
      setErrors(formErrors);
    }
  }, [artist, title, submitted]);

  //* clears drop file and reloads drop zone
  const handleCancel = (e) => {
    e.preventDefault();
    setDropFile("");
    setSubmitted(false);
    setArtist("");
    setTitle("");
  };


  const chooseFile = (e) => {
    const file = songFile.current.files[0];

    // const file = e.dataTransfer.files[0];
    setDropFile(file);

    let reader = new FileReader();
    reader.onload = function (e) {
      setAudioSource(e.target.result)
    };

    reader.readAsDataURL(file);
  };
  //* when file is dragged into the dropzone, the file is set 
  //* as the source of the audio element to access the metadata
  const dropHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    setDropFile(file);

    let reader = new FileReader();
    reader.onload = function (e) {
      setAudioSource(e.target.result)
    };

    reader.readAsDataURL(e.dataTransfer?.files[0]);
  };

  //* runs when audio tag metadata is loaded
  //* and gets the song length in seconds
  const getDuration = (e) => {
    const duration = e.target.duration;
    setLength(duration);
  };

  //* ensures drop functionality
  const dragHandler = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  if (dropFile) {
    return (
    <div>
      <div className="drop_zone_submit">
      <div className='upload-errors'>
          {/* <ul>
          {errors?.map((error, idx) => {
            return <li key={idx}>{error}</li>
          })}
          </ul> */}
        </div>
        <span>{dropFile.name}</span>
        {!songLoading ? <form onSubmit={handleSubmit}>
          <div className='form-content'>
          {Object.values(errors).length > 0 && errors.title ? <div>{errors.title}</div> : null}
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              autoComplete="off"
              value={title}
              onChange={e => setTitle(e.target.value)}
              />
          </div>
          <div className='form-content'>
          {Object.values(errors).length > 0 && errors.artist ? <div>{errors.artist}</div> : null}

            <label htmlFor="artist">Artist</label>
            <input
              type="text"
              name="artist"
              placeholder="Artist"
              autoComplete="off"
              value={artist}
              onChange={e => setArtist(e.target.value)}
              />
          </div>
          <div>
            <label forHtml="image">Song Image</label>
            <input type="file"
            id="image"
            name="image"
            ref={imageFile}
            accept="image/png, image/jpeg"
            onChange={populateImagePreview}
            >
            </input>
            <div className='image-preview'>
              <span>
                Image Preview
              </span>
              <img className="image-preview" ref={imagePreview} alt="preview" src={"https://hisownbucket.s3.amazonaws.com/default-placeholder.png"}></img>
            </div>
          </div>
          <div className='form-content'>
            <input
              type="text"
              name="description"
              placeholder="Description"
              autoComplete="off"
              value={description}
              onChange={e => setDescription(e.target.value)}
              />
          </div>
          <div className='form-content'>
            <input
              type="checkbox"
              hidden={true}
              name="public"
              checked={publicSong}
              onChange={e => setPublicSong(!publicSong)}
            />
          </div>
          <div className='form_content'>
            <label htmlFor="genre">Genre</label>
            <select
              value={genreId}
              onChange={(e) => setGenreId(e.target.value)}
            >
              {Object.values(genresObj).map((genre) => (
                <option key={genre.id} value={genre.id}>{genre.name}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="add-song-button">Add Song</button>
          <button className="add-song-button cancel" onClick={handleCancel}>Cancel</button>
        </form> : <div className='song-loading'>Song Loading...</div>}
      </div>
      <audio src={audioSource} onLoadedMetadata={getDuration}></audio>
    </div>)
  } else {
    return (
      <div>
        <div className="drop_zone"
          onDragOver={dragHandler}
          onDrop={dropHandler}>
          <div>{"Drag a file into this Drop Zone ..."}</div>
          <label
          className='custom-file-upload'
          htmlFor="choose-audio-file-button">
            Or click here to choose a file
          </label>
          <input type="file"
            accept="audio/mp3, audio/*"
            name="image"
            ref={songFile}
            onChange={chooseFile}
            id="choose-audio-file-button"
            >
            </input>
        </div>
      </div>
    );
  }
}

export default DropZone;