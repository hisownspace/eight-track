// constants
const ADD_TO_PLAYER = "player/ADD_TO_PLAYER";
const SET_REFERENCE = "player/SET_REFERENCE";
const SET_PLAYING = "player/SET_PLAYING";
const SET_TIME = "player/SET_TIME";

// action creators
const addToPlayer = song => {
    return {
        type: ADD_TO_PLAYER,
        song
    };
};

const setReference = ref => {
    return {
        type: SET_REFERENCE,
        ref
    }
}

const setPlaying = playing => {
    return {
        type: SET_PLAYING,
        playing
    }
};

const setTime = time => {
    return {
        type: SET_TIME,
        time
    }
}


// thunks
export const addSongToPlayer = (songId) => async (dispatch) => {
    const res = await fetch(`/api/songs/${songId}`)
    if (res.ok) {
        const song = await res.json();
        await dispatch(addToPlayer(song));
    };
};

 export const playingState = bool => dispatch => {
    console.log("play!");
    console.log(bool);
    dispatch(setPlaying(bool));

 }

export const setRef = ref => async dispatch => {
    console.log(ref);
    await dispatch(setReference(ref));
};

export const timeRequest = requestState => async dispatch => {
    console.log("request acknowledged");
};

export const setPlayerTime = time => dispatch => {
    dispatch(setTime(time));
};


// reducer
const initialState = { playlist: [], };
export default function playerReducer(state = initialState, action) {
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
        case SET_PLAYING:
            console.log("playing reducer");
            newState = { ...state };
            newState["playing"] = action.playing;
            return newState;
        case SET_TIME:
            newState = { ... state };
            newState["time"] = action.time;
            return newState;
        default:
            return state;
    }
}