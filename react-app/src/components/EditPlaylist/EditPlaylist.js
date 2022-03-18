import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function EditPlaylist() {

    const { playlistId } = useParams();
    const playlists = useSelector(state => state.playlist.playlists);
    const [playlist, setPlaylist] = useState({ songs: []})
    const [title, setTitle] = useState(playlist?.name);

    useEffect(() => {
        const list = playlists.find(playlist => {
            return playlist.id === +playlistId;
        });
        setPlaylist(list);
    }, [playlists, playlistId]);

    const handleChange = e => {

    }

    return (
        <form>
            <label
                for="playlist-title"
            ></label>
            <input
                id="playlist-title"
                type="text"
                name="playlist-title"
                value={title}
                onChange={handleChange}
            />
            {playlist?.songs.map((song, idx) => {
               return (
                    <label>{song.title}</label>
               ) 
            })}
        </form>
    )
}

export default EditPlaylist;