import { useSelector } from "react-redux";
import GenreList from "../GenreList";


function Search() {
    const searchResults = useSelector(state => state.search);

    return (
        <div>
            <h1>
                BY ARTIST:
            </h1>
            <ul>
            {searchResults.artist.map(song => {
                return <li>{song.title}</li>
            })}
            </ul>
            <h1>
                BY GENRE:
            </h1>
            <ul>
            {searchResults.genre.map(song => {
                return <li>{song.title}</li>
            })}
            </ul>
            <h1>
                BY TITLE:
            </h1>
            <ul>
            {searchResults.title.map(song => {
                return <li>{song.title}</li>
            })}
            </ul>
        </div>
    )
}

export default Search;