import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteOneSong, getOneSong } from '../../store/song';


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

    const handleDelete = () => {
        dispatch(deleteOneSong(songId))
    };

    useEffect(() => {
        if (isLoaded && !song) {
            history.push("/songs");
        }
    })
    
    return isLoaded && (
        <>
            <h1>Song Page</h1>
            <div>{song.title}</div>
            <div>{song.artist}</div>
            <div>{song.description}</div>
            <button onClick={handleDelete}>Delete Song</button>
            <audio controls src={song.url}></audio>
        </>
    )
}

export default SongDetail