import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import { search } from '../../store/search';

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

function Search() {
    const dispatch = useDispatch();
    const searchResults = useSelector(state => state.search);

    const searchQuery = useLocation().search;
    const q = new URLSearchParams(searchQuery).get('q');

    useEffect(()=>{
        dispatch(search(q));
        // console.log(searchResults);
    }, [dispatch, q])


    return (
        <div>
            {searchResults.artist?.length ? <>
            <h1>
                Songs with artists that match your search:
            </h1>

            <Carousel responsive={responsive}
                infinite={true}
                autoPlaySpeed={10000000}
            >
                {searchResults.artist?.map(song => {
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
            </Carousel>
            </> : null}

            {searchResults.genre.length ? 
            <>
            <h1>
                Songs with genres that match your search:
            </h1>
            <Carousel responsive={responsive}
                infinite={true}
                autoPlaySpeed={10000000}
            >
                {searchResults.genre?.map(song => {
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
            </Carousel>
            </>
            : null}

            {searchResults.title?.length ?
            <>
            <h1>
                Song titles that match your search:
            </h1>
            <Carousel responsive={responsive}
                infinite={true}
                autoPlaySpeed={10000000}
            >
                {searchResults.title?.map(song => {
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
            </Carousel>
            </>
            : null}

            {searchResults.playlist?.length ?
            <>
            <h1>
                Playlist titles that match your search:
            </h1>
            <Carousel responsive={responsive}
                infinite={true}
                autoPlaySpeed={10000000}
            >
                {searchResults.playlist?.map(playlist => {
                    return (
                        <Link key={playlist.id} to={`/playlists/${playlist.id}`}>
                            <div className='hide-image'>
                                <div className='song-image-list-item-container'>
                                    <img alt={playlist.name} src={playlist.songs[0].image_url
                                        || "https://eta-photobucket.s3.amazonaws.com/play-button.svg"}>
                                    </img>
                                    <div className='song-title-carousel'>
                                        <div className='carousel-title'>{playlist.name}</div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </Carousel>
            </> : null}
        </div>
    )
}

export default Search;