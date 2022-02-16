import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneSong } from '../../store/song';



function SongDetail() {
    const { id } = useParams();
    const songId = +id;
    const dispatch = useDispatch();
    const song = useSelector(state => state.songs.songs[songId]);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getOneSong(songId));
    }, [songId]);

    useEffect(() => {
        (async() => {
          setIsLoaded(true);
        })();
      }, [dispatch]);
    
    return isLoaded && (
        <>
            <h1>Song Page</h1>
            <div>{song?.title}</div>
            <div>{song?.artist}</div>
            <div>{song?.description}</div>
            <audio controls src={song?.url}></audio>
        </>
    )
}

export default SongDetail