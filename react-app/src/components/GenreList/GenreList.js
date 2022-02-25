import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 2
    }
  };

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
        <Carousel responsive={responsive}
        infinite={true}
        autoPlaySpeed={10000000}
        >
            {theseSongs?.map(song => {
                return (
                    <Link key={song.id} to={`/songs/${song.id}`}>
                        <div className='hide-image'>
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
        </Carousel>
    )
}

export default GenreList;