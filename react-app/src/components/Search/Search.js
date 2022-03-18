import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import GenreList from "../GenreList";


function Search() {
    const searchResults = useSelector(state => state.search);

    return (
        <div>
            <h1>
                Songs with artists that match your search:
            </h1>
            <ul>
            {searchResults.artist.map(song => {
                return <li><Link to={`/songs/${song.id}`}>{song.title}</Link></li>
            })}
            </ul>
            <h1>
                Songs with genres that match you search:
            </h1>
            <ul>
            {searchResults.genre.map(song => {
                return <li><Link to={`/songs/${song.id}`}>{song.title}</Link></li>
            })}
            </ul>
            <h1>
                Song titles that match your search:
            </h1>
            <ul>
            {searchResults.title.map(song => {
                return <li><Link to={`/songs/${song.id}`}>{song.title}</Link></li>
            })}
            </ul>
        </div>
    )
}

export default Search;