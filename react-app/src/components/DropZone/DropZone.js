import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addOneSong } from '../../store/song';
// import { getAllGenres } from '../../../store/genre';
import './DropZone.css';

function DropZone() {
  const history = useHistory();
  const dispatch = useDispatch();
  
  const [isLoaded, setIsLoaded] = useState(false)
  const [audioSource, setAudioSource] = useState("");
  const [dropFile, setDropFile] = useState("");
  const [length, setLength] = useState(0);

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [description, setDescription] = useState("");
  const [genreId, setGenreId] = useState(1)
  const [userId, setUserId] = useState(2);
  const [publicSong, setPublicSong] = useState(true)

  const [songLoading, setSongLoading] = useState(false);
  const [errors, setErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    //* add controlled components to form
    const formData = new FormData();
    formData.append("song", dropFile);
    formData.append("length", length);
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("genreId", genreId);
    formData.append("userId", userId);
    formData.append("description", description);
    formData.append("publicSong", publicSong);
    
    //* aws uploads can be a bit slow—displaying
    //* some sort of loading message is a good idea
    setSongLoading(true);
    
    //*  send file and db data to action creator
    const res = await fetch('/api/songs/', {
        method: "POST",
        body: formData,
    })
    console.log(res);
  }

  //* clears drop file and reloads drop zone
  const handleCancel = (e) => {
    e.preventDefault();
    setDropFile("")
  };

  //* when file is dragged into the dropzone, the file is set 
  //*as the source of the audio element to access the metadata
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
    console.log(e.target);
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
        <span>{dropFile.name}</span>
        <form onSubmit={handleSubmit}>
          <div className='form-content'>
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
              name="public"
              checked={publicSong}
              onChange={e => setPublicSong(e.target.value)}
            />
          </div>
          {/! uncomment and configure when genre store is ready !/}
          {/* <div className='form_content'>
            <label htmlFor="Genre">Genre</label>
            <select
              required
              value={genreId}
              onChange={(e) => setGenreId(e.target.value)}
            >
              <option value=''>Select a genre</option>
              {genresArr.map((genre) => (
                <option key={genre?.id} value={genre?.id}>{genre?.name}</option>
              ))}
            </select>
          </div> */}
          <button type="submit" className="add-product-button">Add Product</button>
          <button className="add-product-button cancel" onClick={handleCancel}>Cancel</button>
        </form>
      </div>
      <audio src={audioSource} onLoadedMetadata={getDuration}></audio>
    </div>)
  } else {
    return (
      <div>
        <div className="drop_zone"
          onDragOver={dragHandler}
          onDrop={dropHandler}>
          <p>{"Drag a file into this Drop Zone ..."}</p>
        </div>
      </div>
    );
  }
}

export default DropZone;