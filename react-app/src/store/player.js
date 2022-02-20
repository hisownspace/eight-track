// constants
const ADD_TO_PLAYER = "player/ADD_TO_PLAYER";
const SET_REFERENCE = "player/SET_REFERENCE";

// action creators
const addToPlayer = song => {
    return {
        type: ADD_TO_PLAYER,
        song
    };
};

const setReference = ref => {
    console.log("i'm here!!!");
    return {
        type: SET_REFERENCE,
        ref
    }
}


// thunks
export const addSongToPlayer = (songId) => async (dispatch) => {
    console.log(songId);
    const res = await fetch(`/api/songs/${songId}`)
    if (res.ok) {
        const song = await res.json();
        await dispatch(addToPlayer(song));
    }
}

export const setRef = ref => async dispatch => {
    console.log(ref);
    await dispatch(setReference(ref));
};


// reducer
const initialState = { playlist: [] };
export default function playerReducer(state = initialState, action) {
    console.log(action);
    let newState;
    switch (action.type) {
        case ADD_TO_PLAYER:
            newState = { ...state };
            newState["currentSong"] = action.song;
            return newState;
        case SET_REFERENCE:
            newState = { ...state };
            newState["ref"] = action.ref;
            return newState;
        default:
            return state;
    }
}