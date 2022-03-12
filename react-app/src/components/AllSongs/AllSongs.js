import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './AllSongs.css';

import { getAllSongs } from '../../store/song';
import { getAllGenres } from '../../store/genre';

import GenreList from '../GenreList';

function AllSongs() {
    const dispatch = useDispatch();
    const songsObj = useSelector(state => state.songs.songs);
    const genresObj = useSelector(state => state.genres.genres);
    const songs = Object.values(songsObj);
    const genres = Object.values(genresObj);

    useEffect(() => {
        (async () => {
            await dispatch(getAllSongs());
            await dispatch(getAllGenres());
        })();
    }, [dispatch]);

    return (
        <div>
            <div className='all-songs'>
            {/* {songs?.map((song, idx) => {
                return (
                    <div key={idx}>
                        {song.title}
                        <div className='song-image-list-item-container'>
                            <img alt={song.title} src={song.image_url || "https://eta-photobucket.s3.amazonaws.com/play-button.svg"}></img>
                        </div>
                    </div>
                )
            })} */}
            </div>
            <div className="genre-carousel-list">
                {genres?.map(genre => {
                    return (
                        <div className="genre-carousel-item" key={genre.id}>
                            <h1>{genre.name}</h1>
                            <GenreList genreId={genre.id} />
                        </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default AllSongs;