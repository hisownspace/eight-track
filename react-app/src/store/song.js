// constants
const GET_SONGS = "songs/GET_SONGS";
const GET_SONG = "songs/GET_SONG";
const ADD_SONG = "songs/ADD_SONG";
const DELETE_SONG = "songs/DELETE_SONG";

//action creators
const getSongs = (songs) => {
  return {
    type: GET_SONGS,
    songs,
  };
};

const getSong = (song) => {
  return {
    type: GET_SONG,
    song,
  };
};

const addSong = (song) => {
  return {
    type: ADD_SONG,
    song,
  };
};

const deleteSong = (id) => {
  return {
    type: DELETE_SONG,
    id,
  };
};

//thunks
export const getAllSongs = () => async (dispatch) => {
  const res = await fetch("/api/songs");
  if (res.ok) {
    const songs = await res.json();
    dispatch(getSongs(songs));
    return songs;
  } else {
    return res.errors;
  }
};

export const getOneSong = (songId) => async (dispatch) => {
  console.log(songId);
  const res = await fetch(`/api/songs/${songId}`);
  if (res.ok) {
    const song = await res.json();
    dispatch(getSong(song));
    return song;
  }
};

export const addOneSong = (songDetails) => async (dispatch) => {
  const res = await fetch("/api/songs", {
    method: "POST",
    // headers: { 'Content-Type': 'application/json' },
    body: songDetails,
  });

  if (res.ok) {
    const song = await res.json();
    dispatch(addSong(song));
    return song;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return { errors: "An error occurred. Please try again." };
  }
};

export const updateOneSong = (songDetails) => async (dispatch) => {
  const res = await fetch(`/api/songs/${songDetails.get("id")}`, {
    method: "PUT",
    body: songDetails,
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(addSong(data));
    return null;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const deleteOneSong = (songId) => async (dispatch) => {
  const res = await fetch(`/api/songs/${songId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    await dispatch(deleteSong(songId));
    return res;
  }
};

//reducer
const initialState = { songs: {}, song: {} };
export default function songReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_SONGS:
      newState = { ...state };
      newState.songs = action.songs.songs?.reduce((songs, song) => {
        songs[song.id] = song;
        return songs;
      }, {});
      return newState;
    case GET_SONG:
      newState = { ...state };
      newState.song = {};
      newState.song[action.song.id] = action.song;
      return newState;
    case DELETE_SONG:
      newState = { ...state };
      const id = +action.id;
      delete newState.songs[id];
      return newState;
    default:
      newState = { ...state };
      return newState;
  }
}
