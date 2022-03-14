const SEARCH = "search/SONG"

const search = songs => {
    return {
        type: SEARCH,
        songs
    }
}

export const searchQuery = query => async dispatch => {
    const res = await fetch(`/api/search?q=${query}`)
    if (res.ok) {
        const searchResults = await res.json();
        dispatch(search(searchResults));
        return searchResults;
    } else {
        return res.errors;
    };
};

const initialState = { songs: {} };

export default function searchReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SEARCH:
            newState = { ...state };
            newState.songs = action.songs;
            return newState;
        default:
            return state;
    }
}