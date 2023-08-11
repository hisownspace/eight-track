// constants
const ADD_TO_PLAYER = "player/ADD_TO_PLAYER";
const SET_REFERENCE = "player/SET_REFERENCE";
const SET_PLAYING = "player/SET_PLAYING";
const SET_TIME = "player/SET_TIME";
const SET_PLAYER = "player/SET_PLAYER";

// action creators
const addToPlayer = (song) => {
  return {
    type: ADD_TO_PLAYER,
    song,
  };
};

const setReference = (ref) => {
  return {
    type: SET_REFERENCE,
    ref,
  };
};

const setPlaying = (playing) => {
  return {
    type: SET_PLAYING,
    playing,
  };
};

const setTime = (time) => {
  return {
    type: SET_TIME,
    time,
  };
};

const setFooterPlayer = (player) => {
  return {
    type: SET_PLAYER,
    player,
  };
};

// thunks
export const addSongToPlayer = (songId) => async (dispatch) => {
  console.log(songId);
  const res = await fetch(`/api/songs/${songId}`);
  if (res.ok) {
    const song = await res.json();
    await dispatch(addToPlayer(song));
    return song;
  }
};

export const playingState = (bool) => (dispatch) => {
  dispatch(setPlaying(bool));
};

export const setPlayer = (player) => (dispatch) => {
  dispatch(setFooterPlayer(player));
};

export const setRef = (ref) => async (dispatch) => {
  await dispatch(setReference(ref));
};

export const setPlayerTime = (time) => (dispatch) => {
  dispatch(setTime(time));
};

// reducer
const initialState = { playlist: [] };
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
      newState = { ...state };
      newState["playing"] = action.playing;
      return newState;
    case SET_TIME:
      newState = { ...state };
      newState["time"] = action.time;
      return newState;
    case SET_PLAYER:
      newState = { ...state };
      newState["player"] = action.player;
      return newState;
    default:
      return state;
  }
}
