const SEARCH = "search/SONG"

const searchQuery = songs => {
    return {
        type: SEARCH,
        songs
    }
}

export const search = query => async dispatch => {
    const res = await fetch(`/api/search?q=${query}`)
    if (res.ok) {
        const searchResults = await res.json();
        dispatch(searchQuery(searchResults));
        return searchResults;
    } else {
        return res.errors;
    };
};

const initialState = { artist: {}, title: {}, genre: {} };

export default function searchReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SEARCH:
            newState = { ...state };
            newState.artist = action.songs.artist
            newState.title = action.songs.title;
            newState.genre = action.songs.genre;
            return newState;
        default:
            return state;
    }
}