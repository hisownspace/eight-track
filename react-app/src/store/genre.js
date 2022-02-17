// constants
const GET_GENRES = 'genre/GET_GENRES';
const GET_GENRE_SONGS = 'genre/GET_GENRE_SONGS';

// action creators
const getGenres = (genres) => {
    return {
        type: GET_GENRES,
        genres
    }
}

const getGenreSongs = (genre) => {
    return {
        type: GET_GENRE_SONGS,
        genre
    }
}

// thunks
export const getAllGenres = () => async (dispatch) => {
    const res = await fetch('/api/genres/');
    if (res.ok) {
        const genres = await res.json();
        dispatch(getGenres(genres));
        return genres;
    }
}

export const getAllGenreSongs = (genreId) => async (dispatch) => {
    const res = await fetch(`/api/genres/${genreId}`);
    if (res.ok) {
        const genreSongs = res.json();
        dispatch(getGenreSongs(genreSongs));
        return genreSongs;
    }
}

// reducer
const initialState = { songs: {} }
export default function genreReducer(state = initialState, action) {
    let newState;
    switch(action.type) {
        case GET_GENRES:
            newState = { ...state };
            newState.genres = action.genres.genres.reduce((genres, genre) => {
                genres[genre.id] = genre;
                return genres;
            }, {});
            return newState;
        case GET_GENRE_SONGS:
            newState = { ...state };
            newState.songs = action.songs.reduce((songs, song) => {
                songs[song.id] = song;
                return songs;
            }, {});
            return newState;
        default:
            return state
    }
}