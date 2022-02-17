import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { getAllSongs } from '../../store/song';

function AllSongs() {
    const dispatch = useDispatch();
    const songs = useSelector(state => state.songs.songs);

    useEffect(() => {
        dispatch(getAllSongs());
    }, []);


    return (
        <div>
            <h1>All Songs Page</h1>
        </div>
    )
}

export default AllSongs;