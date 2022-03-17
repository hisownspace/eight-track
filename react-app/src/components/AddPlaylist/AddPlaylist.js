import { useSelector } from 'react-redux';
import { useState } from 'react';

function AddPlaylist () {
    const songs = useSelector(state => state.songs.songs);
    const [formValues, setFormValues] = useState([{ name: Object.values(songs)[0]?.title,
                                                    id: Object.values(songs)[0]?.id }])


    const handleChange = (i, e) => {
        const songId = e.target.value
        const newFormValues = [...formValues];
        newFormValues[i].id = songId;
        newFormValues[i].name = songs[songId].title
        setFormValues(newFormValues);
        console.log(formValues);
    }
    
    const addFormFields = () => {
        setFormValues([...formValues,
            { name: Object.values(songs)[0].title,
                id: Object.values(songs)[0].id }]);
        console.log(formValues);
    }
    
    const removeFormFields = (i) => {
        const newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
        console.log(formValues);
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(formValues));
        console.log(formValues);
    }
    
    const moveSongUp = idx => {
        const newFormValues = [...formValues];
        const placeholder = newFormValues[idx];
        newFormValues[idx] = newFormValues[idx - 1];
        newFormValues[idx - 1] = placeholder;
        setFormValues(newFormValues);
        console.log(formValues);
    };

    return (
        <form  onSubmit={handleSubmit}>
          {formValues.map((element, index) => (
            <div className="form-inline" key={index}>
              <label>Song #{index + 1}</label>
              <select
                value={formValues[index].id}
                onChange={e => handleChange(index, e)}
                >
                    {Object.values(songs).map((song) => (
                        <option key={song.id} value ={song.id}>{song.title}</option>
                    ))}
                </select>
                {index ? 
                <div>
                  <button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</button> 
                  <button type="button"  className="button remove" onClick={() => moveSongUp(index)}>Move Up</button> 
                </div>
                : null}
            </div>
          ))}
          <div className="button-section">
              <button className="button add" type="button" onClick={() => addFormFields()}>Add</button>
              <button className="button submit" type="submit">Submit</button>
          </div>
      </form>
    )
    // const [playlistName, setPlaylistName] = useState('');
    // const [playlistArr, setPlaylistArr] = useState(['']);
    


    // const handleSubmit = e => {
    //     e.preventDefault();
    //     console.log(playlistName);
    // }


    // return (
    //     <>
    //         <h1>MAKING A NEW PLAYLIST</h1>
    //         <h2>Currently Under Construction</h2>
    //         <form
    //             onSubmit={handleSubmit}
    //         >
    //             <label>
    //                 Playlist Name:
    //             </label>
    //             <input
    //                 type="text"
    //                 value={playlistName}
    //                 placeholder="Enter a name for your playlist..."
    //                 onChange={e => setPlaylistName(e.target.value)}
    //             ></input>
    //             <label>
    //                 Songs:
    //                 <input
    //                 type=""
    //                 >
    //                 </input>
    //             </label>

    //         </form>
    //     </>
    // );
};

export default AddPlaylist;