

// constants
const GET_SONG_COMMENTS = "comments/GET_SONG_COMMENTS"
const ADD_SONG_COMMENT = "comments/ADD_SONG_COMMENT"

// action creators
function getSongComments(comments) {
    return {
        type: GET_SONG_COMMENTS,
        comments
    }
}

function addComment(comment) {
    return {
        type: ADD_SONG_COMMENT,
        comment
    }
}

// thunks
export const getAllSongComments = songId => async dispatch => {
    const res  = await fetch(`/api/songs/${songId}/comments`);
    if (res.ok) {
        const comments = await res.json();
        console.log(comments);
        dispatch(getSongComments(comments));
        return comments;
    }
}

export const addSongComment = commentForm => async dispatch => {
    const songId = commentForm.songId
    const res = await fetch(`/api/songs/${songId}/comments`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentForm)});
    if (res.ok) {
        const comments = await res.json();
        dispatch(addComment(comments));
    } else if (res.status > 500) {
        const data = await res.json();
        if (data.errors) {
          return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."]
    }
}


// reducer

let initialState = { "comments": {} }
export default function commentReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_SONG_COMMENTS:
            newState = { ...state };
            newState.comments = action.comments;
            return newState;
        case ADD_SONG_COMMENT:
            newState = { ...state };
            newState.comments = action.comments;
            return newState;
        default:
            return state
    }
}