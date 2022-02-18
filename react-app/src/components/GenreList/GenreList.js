import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function GenreList({ genreId }) {
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
                    <Link key={song.id} to={`/songs/${song.id}`}>
                        <div>
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