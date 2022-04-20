import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';
import './GenreList.css';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
        slidesToSlide: 2
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
        slidesToSlide: 3,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 3,
        slidesToSlide: 3,
    }
};

function GenreList({ songsType, uniqueId }) {
    const id = +uniqueId;
    const songs = useSelector(state => state.songs.songs);
    const [theseSongs, setTheseSongs] = useState([]);
    
    useEffect(() => {
        if (songs) {
            const songsArr = Object.values(songs);
            if (songsType === "genre") {
                const genreSongs = songsArr.filter(song => song.genre.id === id);
                setTheseSongs(genreSongs);
            } else if (songsType === "artist") {
                const artistSongs = songsArr.filter(song => song.artist === id);
                setTheseSongs(artistSongs);
            }
        }
    }, [songs, id, songsType]);

    return ( songs ?
        <Carousel responsive={responsive}
        infinite={true}
        autoPlaySpeed={10000000}
        >
            {theseSongs?.map(song => {
                return (
                    <Link key={song.id} to={`/songs/${song.id}`}>
                        <div className='hide-image'>
                            <div className='song-image-list-item-container'>
                                <img alt={song.title} src={song.image_url
                                    || "https://eta-photobucket.s3.amazonaws.com/play-button.svg"}>
                                </img>
                                <div className='song-title-carousel'>
                                    <div className='carousel-title'>{song.title}</div>
                                    <div className='carousel-artist'>{song.artist}</div>
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </Carousel> : null
    )
}

export default GenreList;