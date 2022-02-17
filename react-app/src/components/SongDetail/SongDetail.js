import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteOneSong, getOneSong } from '../../store/song';
import UpdateSongForm from '../Modals/UpdateSongModal';


function SongDetail() {
    const { id } = useParams();
    const songId = +id;
    const dispatch = useDispatch();
    const history = useHistory()
    const song = useSelector(state => state.songs.songs[songId]);

    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        dispatch(getOneSong(songId))
        .then(() => setIsLoaded(!isLoaded))
    }, [songId]);
    
    useEffect(() => {
        if (isLoaded && !song) {
            history.push("/songs");
        }
    }, [isLoaded])

    const handleDelete = () => {
        dispatch(deleteOneSong(songId));
        history.push("/songs");
    };
    
    const handleEdit = () => {
        
    };

    return !isLoaded ? null : (
        <>
            <h1>Song Page</h1>
            <div>{song?.title}</div>
            <div>{song?.artist}</div>
            <div>{song?.description}</div>
            <button onClick={handleDelete}>Delete Song</button>
            <button onClick={handleEdit}>Edit Song Information</button>
            <UpdateSongForm />
            <audio controls src={song?.url}></audio>
        </>
    )
}

export default SongDetail