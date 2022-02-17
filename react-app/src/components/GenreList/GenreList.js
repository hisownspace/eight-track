import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

function GenreList({ genreId }) {
    const dispatch = useDispatch();
    const id = +genreId;
    const songs = useSelector(state => state.songs.songs);
    const [theseSongs, setTheseSongs] = useState([]);
    
    useEffect(() => {
        const songsArr = Object.values(songs);
        const genreSongs = songsArr.filter(song => song.genre.id === id);
        setTheseSongs(genreSongs);
    }, [songs, id]);

    return (
        <div className="genre-list-item">
            {theseSongs?.map(song => {
                return (
                    <Link to={`/songs/${song.id}`}>
                    <div key={song.id}>
                        {song.title}
                        <div className='song-image-list-item-container'>
                            <img alt={song.title} src={song.image_url
                                || "https://hisownbucket.s3.amazonaws.com/play-button.svg"}>
                            </img>
                        </div>
                    </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default GenreList;