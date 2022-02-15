import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import DropZone from '../DropZone'

function UploadPicture() {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const [image, setImage] = useState('');
    const [imageLoading, setImageLoading] = useState(false);
    const [dropFile, setDropFile] = useState(null);
    
    
    useEffect(() => {
        updateImage(dropFile);
    }, [dropFile]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        const res = await fetch('/api/images', {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            await res.json();
            setImageLoading(false);
            history.push("/images");
        }
        else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
            const error = await res.json();
            console.log(error);
        }
    }
    
    const updateImage = (e) => {
        if (e?.target) {
            const file = e.target.files[0];
            setImage(file);
        } else if (dropFile) {
            setImage(dropFile);
        }
        console.log(dropFile)
    }
    
    return (
        <>
            <h1>hello there!</h1>
            <form onSubmit={handleSubmit}>
                <input
                type="file"
                accept="image/*"
                onChange={updateImage}
                />
                <button type="submit">Submit</button>
                {(imageLoading) && <p>Loading...</p>}
            </form>
            <div>Or Drag File into Drop Zone!</div>
            <DropZone
                setDropFile={setDropFile}
                dropFile={dropFile}
                handleSubmit={handleSubmit}
            />
        </>
    )
}

export default UploadPicture;