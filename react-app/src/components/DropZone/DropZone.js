import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addOneSong } from '../../store/song';
import { getAllGenres } from '../../store/genre';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

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
      setErrors(false);
      setArtist('');
      setTitle('');
      setDescription('');
      setPublicSong(true);
      setSubmitted(false);
      
      const res = await dispatch(addOneSong(formData));
      setSongLoading(false);
      if (res.errors) {
        setErrors(res.errors);
        handleCancel();
      } else {
        setDropFile("")
        history.push(`/songs/${res.song?.id}`)
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

  const guessSongTitle = () => {
    const woExtArr = dropFile.name.split('.');
    woExtArr.pop();
    const woExt = woExtArr.join(".");
    const digicheck = /\d{1,2}/
    const letterCheck = /[\w:']{1}/
    const guessArr = [];
    woExt.split(' ').forEach((word, idx) => {
      if (!(digicheck.test(word) && idx === 0) && (!(word === '-' && idx === 1))) {
        guessArr.push(word);
      } else if (letterCheck.test(word[word.length - 1])) {
        for (let i = word.length - 1; i >= 0; i--) {
          if ((word[i] === '.' || word[i] === '-' || word[i] === '_') && 
                i !== word.length - 1) {
                  guessArr.push(word.slice(i + 1));
                  break;
                }
        }
      }
    });
    let finalGuess;
    if (woExt.split(' ').length === 1) {
      finalGuess = woExt;
    } else {
      finalGuess = guessArr?.join(' ');
    }
    setTitle(finalGuess);
  };

  useEffect(() => {
    dispatch(getAllGenres());
  }, [songLoading, dispatch]);

  useEffect(() => {
    const formErrors = {};
    if (submitted && !artist) {
      formErrors.artist = ("Please fill out artist field!")
    } else if (submitted && artist.length > 255) {
      formErrors.artist = "Artist name cannot be longer than 255 characters!";
    } else if (submitted) {
      formErrors.artist = null;
    }
    if (submitted && !title) {
      formErrors.title = ("Please fill out title field!")
    } else if (submitted && title.length > 255) {
      formErrors.title = "Title cannot be longer than 255 characters.";
    } else if (submitted) {
      formErrors.title = null;
    }
    if (Object.values(formErrors).length > 0) {
      setErrors(formErrors);
    }
  }, [artist, title, submitted]);

  //* clears drop file and reloads drop zone
  const handleCancel = (e) => {
    if (e) {
      e.preventDefault();
    }
    setErrors(false)
    setDropFile("");
    setSubmitted(false);
    setArtist("");
    setTitle("");
  };

  const convertToMinutes = (length) => {
    const minutes = Math.floor(length / 60);
    let seconds = Math.floor(length % 60);
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return minutes + ":" + seconds;
  }

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
  const getDurationAndTitle = (e) => {
    const duration = e.target.duration;
    setLength(duration);
    guessSongTitle();
  };

  //* ensures drop functionality
  const dragHandler = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  if (dropFile && !songLoading) {
    return (
      <div className="drop_zone_submit">
        <div className='song-metadata'>
          <div>{dropFile.name}</div>
          <div>Duration: {convertToMinutes(length)}</div>
        </div>
        <div className="song-data">
          <div className='image-preview-div'>
            <img
              className="image-preview"
              ref={imagePreview}
              alt="preview"
              src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=">
            </img>
            <div className='image-upload-button'>
              <label
                className='custom-image-upload audio-upload'
                htmlFor="image">
                <FontAwesomeIcon className="fa-solid playlist-icon" icon={faCamera} />
                Upload Image
              </label>
              <input type="file"
                accept="image/png, image/jpeg"
                name="image"
                ref={imageFile}
                onChange={populateImagePreview}
                id="image"
              >
              </input>
            </div>
          </div>
          <div
            className='song-submit-form'
          >
            {!songLoading ?
              <form
                onSubmit={handleSubmit}
                id="song-submit-form"
              >
                <div className='song-form-content'>

                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Name your track"
                    autoComplete="off"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                  {Object.values(errors).length > 0 && errors.title ?
                  <div className="upload-errors">{errors.title}</div> :
                  <div className="upload-errors"></div>}
                </div>
                <div className='song-form-content'>

                  <label htmlFor="artist">Artist</label>
                  <input
                    type="text"
                    name="artist"
                    placeholder="Name the artist"
                    autoComplete="off"
                    value={artist}
                    onChange={e => setArtist(e.target.value)}
                  />
                  {Object.values(errors).length > 0 && errors.artist ?
                  <div className="upload-errors">{errors.artist}</div> :
                  <div className="upload-errors"> </div>}
                </div>
                <div className='song-form-content'>
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
                <div className='song-form-content'>
                  <label htmlFor="description">Description</label>
                  <textarea
                    type="text"
                    name="description"
                    placeholder="Describe your track"
                    autoComplete="off"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </div>
                {/* <div className='song-form-content'>
                  <input
                    type="checkbox"
                    hidden={true}
                    name="public"
                    checked={publicSong}
                    onChange={e => setPublicSong(!publicSong)}
                  />
                </div> */}

              </form> : <div className='song-loading'>Song Loading...</div>}
          </div>
          <audio src={audioSource} onLoadedMetadata={getDurationAndTitle}></audio>
        </div>
        <div className="button-hole">
          <p align="right">
            <button className="add-song-button cancel" onClick={handleCancel}>Cancel</button>
            <button type="submit" form="song-submit-form" className="add-song-button submit">Save</button>
          </p>
        </div>
      </div>
      )
  } else if (dropFile && songLoading) {
    return (
      <div className="drop_zone_submit">
        <div className='song-loading'>Song Loading...</div>
        <progress></progress>
      </div>
    )
  } else {
    return (
      <div>
        <div className="drop_zone"
          onDragOver={dragHandler}
          onDrop={dropHandler}>
          <div>
              <div className='dropzone-prompt'>
                {"Drag a file into this Drop Zone ..."}
              </div>
            <div className='upload-errors'>
              {errors ? errors : null}
            </div>
          </div>
          <label
            className='custom-file-upload'
            htmlFor="choose-audio-file-button">
            Or click here to choose a file
          </label>
          <input type="file"
            accept="audio/mp3, audio/*"
            name="audio"
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