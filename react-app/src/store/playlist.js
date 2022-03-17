// constants
const GET_PLAYLIST = "playlist/GET_PLAYLIST";
const ADD_TO_PLAYLIST = "playlist/ADD_TO_PLAYLIST";
const MOVE_TO_NEXT_SONG = "playlist/MOVE_TO_NEXT_SONG";
const CLEAR_PLAYLIST = 'playlist/CLEAR_PLAYLIST'
const NEW_PLAYLIST = "playlist/ADD_TO_PLAYLIST";


// action creators
const addSong  = songId => {
    return {
        type: ADD_TO_PLAYLIST,
        songId
    }
}

const moveToNextSong = (direction) => {
    return {
        type: MOVE_TO_NEXT_SONG,
        direction
    }
}

const emptyPlaylist = () => {
    return {
        type: CLEAR_PLAYLIST
    }
}

const addToPlayLists = playlist => {
    return {
        type: NEW_PLAYLIST,
        playlist
    }
};


// thunks
export const addSongToPlaylist = (songId) => dispatch => {
    dispatch(addSong(songId));
};

export const nextSong = (direction) => dispatch => {
    dispatch(moveToNextSong(direction));
}

export const clearPlaylist = () => dispatch => {
    dispatch(emptyPlaylist());
};

export const addPlaylist = form => async dispatch => {
    const userId = form.userId
    const res = await fetch(`/api/users/${userId}/playlists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(form)
    })
};


// reducer
const intitialState = { playlist: [], currentSongIndex: 0 }

export default function playlistReducer (state = intitialState, action) {
    let newState;
    switch (action.type) {
        case (GET_PLAYLIST):
            newState = { ...state };
            newState.playlist = action.playlist;
            return newState;
        case (ADD_TO_PLAYLIST):
            newState = { ...state };
            newState.playlist.push(action.songId);
            return newState;
        case (MOVE_TO_NEXT_SONG):
            newState = { ...state };
            if (action.direction === 'up') {
                newState.currentSongIndex += 1;
            } else if (newState.currentSongIndex > 0) {
                newState.currentSongIndex -= 1;
            }
            return newState;
        case (CLEAR_PLAYLIST):
            newState = { ...state };
            newState.playlist = [];
            newState.currentSongIndex = 0;
            return newState;
        default:
            return state;
    }
}