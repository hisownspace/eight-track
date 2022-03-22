import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from 'react-router-dom';
import GenreList from "../GenreList";
import { search } from '../../store/search';


function Search() {
    const dispatch = useDispatch();
    const searchResults = useSelector(state => state.search);

    const searchQuery = useLocation().search;
    const q = new URLSearchParams(searchQuery).get('q');

    useEffect(()=>{
        dispatch(search(q));
    }, [dispatch, q])


    return (
        <div>
            <h1>
                Songs with artists that match your search:
            </h1>
            <ul>
            {searchResults.artist.map(song => {
                return <li key={song.id}><Link to={`/songs/${song.id}`}>{song.title}</Link></li>
            })}
            </ul>
            <h1>
                Songs with genres that match you search:
            </h1>
            <ul>
            {searchResults.genre.map(song => {
                return <li key={song.id}><Link to={`/songs/${song.id}`}>{song.title}</Link></li>
            })}
            </ul>
            <h1>
                Song titles that match your search:
            </h1>
            <ul>
            {searchResults.title.map(song => {
                return <li key={song.id}><Link to={`/songs/${song.id}`}>{song.title}</Link></li>
            })}
            </ul>
            <h1>
                Playlist titles that match your search:
            </h1>
            <ul>
            {searchResults.playlist.map(playlist => {
                return <li key={playlist.id}><Link to={`/playlists/${playlist.id}`}>{playlist.name}</Link></li>
            })}
            </ul>
        </div>
    )
}

export default Search;