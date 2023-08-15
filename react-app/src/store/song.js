// constants
const ALL_SONGS_REQUESTED = "songs/ALL_SONGS_REQUESTED";
const SINGLE_SONG_REQUESTED = "songs/SINGLE_SONG_REQUESTED";
const SONG_ADDED = "songs/SONG_ADDED";
const SONG_DELETED = "songs/SONG_DELETED";
const SONG_CLEARED = "songs/SONG_CLEARED";

//action creators
const getSongs = (songs) => {
  return {
    type: ALL_SONGS_REQUESTED,
    songs,
  };
};

const getSong = (song) => {
  return {
    type: SINGLE_SONG_REQUESTED,
    song,
  };
};

const addSong = (song) => {
  return {
    type: SONG_ADDED,
    song,
  };
};

const deleteSong = (id) => {
  return {
    type: SONG_DELETED,
    id,
  };
};

const songCleared = () => {
  return {
    type: SONG_CLEARED,
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
  const res = await fetch(`/api/songs/${songId}`);
  if (res.ok) {
    const song = await res.json();
    dispatch(getSong(song));
    return song;
  }
};

export const clearSong = () => (dispatch) => {
  dispatch(songCleared());
};

export const addOneSong = (songDetails) => async (dispatch) => {
  const res = await fetch("/api/songs", {
    method: "POST",
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
const initialState = { byId: {}, songView: null };
export default function songReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case ALL_SONGS_REQUESTED:
      newState = { ...state };
      newState.songs = action.songs.songs?.reduce((songs, song) => {
        songs[song.id] = song;
        return songs;
      }, {});
      return newState;
    case SINGLE_SONG_REQUESTED:
      newState = { ...state };
      newState.song = {};
      newState.song[action.song.id] = action.song;
      return newState;
    case SONG_DELETED:
      newState = { ...state };
      const id = +action.id;
      delete newState.songs[id];
      return newState;
    case SONG_CLEARED:
      console.log("SONG CLEARED!!!!");
      newState = { ...state, song: {} };
      return newState;
    default:
      newState = { ...state };
      return newState;
  }
}
