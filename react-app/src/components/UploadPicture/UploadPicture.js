import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import DropZone from '../DropZone'

function UploadPicture() {
    const history = useHistory(); // so that we can redirect after the song upload is successful
    const [song, setSong] = useState('');
    const [songLoading, setSongLoading] = useState(false);
    const [dropFile, setDropFile] = useState(null);
    
    
    useEffect(() => {
        updateSong(dropFile);
    }, [dropFile]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("song", song);
        
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setSongLoading(true);

        const res = await fetch('/api/songs', {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            await res.json();
            setSongLoading(false);
            history.push("/songs");
        }
        else {
            setSongLoading(false);
            // a real app would probably use more advanced
            // error handling
            const error = await res.json();
            console.log(error);
        }
    }
    
    const updateSong = (e) => {
        if (e?.target) {
            const file = e.target.files[0];
            setSong(file);
        } else if (dropFile) {
            setSong(dropFile);
        }
        console.log(dropFile)
    }
    
    return (
        <>
            <h1>hello there!</h1>
            <form onSubmit={handleSubmit}>
                <input
                type="file"
                accept="song/*"
                onChange={updateSong}
                />
                <button type="submit">Submit</button>
                {(songLoading) && <p>Loading...</p>}
            </form>
            <div>Or Drag File into Drop Zone!</div>
            {/* <DropZone
                setDropFile={setDropFile}
                dropFile={dropFile}
                handleSubmit={handleSubmit}
            /> */}
        </>
    )
}

export default UploadPicture;