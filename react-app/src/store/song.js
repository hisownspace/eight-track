// constants
const GET_SONGS = 'songs/GET_SONGS';
const GET_SONG = 'songs/GET_SONG';
const ADD_SONG = 'songs/ADD_SONG';
const DELETE_SONG = 'songs/DELETE_SONG';

//action creators
const getSongs = (songs) => {
    return {
        type: GET_SONGS,
        songs
    }
}

const getSong = (song) => {
    return {
        type: GET_SONG,
        song
    }
}

const addSong = (song) => {
    return {
        type: ADD_SONG,
        song
    }
}

const deleteSong = (id) => {
    return {
        type: DELETE_SONG,
        id
    }
}


//thunks
export const getAllSongs = () => async (dispatch) => {
    const res = await fetch('/api/songs/');
    if (res.ok) {
        const songs = await res.json();
        dispatch(getSongs(songs));
        return songs
    }   else {
        return res.errors
    }
}

// export const getTopProducts = () => async (dispatch) => {
//     const res = await fetch('api/products/top/');
//     if (res.ok) {
//         const productsObj = await res.json();
//         dispatch(getProducts(productsObj.products));
//         return productsObj.products
//     }
// }


// export const getOneProduct = (productId) => async (dispatch) => {
//     const res = await fetch(`/api/products/${productId}/`);
//     if (res.ok) {
//         const product = await res.json();
//         dispatch(getProduct(product));
//         return product
//     }
// }

export const addOneSong = (songDetails) => async (dispatch) => {
    const res = await fetch('/api/songs/', {
        method: 'POST',
        body: songDetails
    });
    if (res.ok) {
        const song = await res.json();
        dispatch(addSong(song))
        return song;
    } else if (res.status < 500) {
        const data = await res.json()
        if (data.errors) {
            return data;
        }
      } else {
        return {"errors": "An error occurred. Please try again."}
      }
}

// export const updateOneProduct = (product, productId) => async dispatch => {
//     const res = await fetch(`/api/products/edit/${productId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(product)
//     });

//     if (res.ok) {
//         const data = await res.json();
//         dispatch(addProduct(data))
//         return null;
//     } else if (res.status < 500) {
//         const data = await res.json();
//         if (data.errors) {
//           return data.errors;
//         }
//       } else {
//         return ['An error occurred. Please try again.']
//       }
// }

// export const deleteOneProduct = productId => async dispatch => {
//     const res = await fetch(`/api/products/delete/${productId}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//     })
//     if (res.ok) {
//         await dispatch(deleteProduct(+productId));
//         // return res
//         return 'HOLY MONKEE SUITS!'
//     }
// }


//reducer
const initialState = { songs: {} };
export default function productReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_SONGS:
            newState = {...state};
            newState.products = action.songs.reduce((songs, song) => {
                songs[song.id] = song;
                return songs;
            }, {});
            return newState
        // case GET_PRODUCT:
        //     newState = {...state};
        //     newState.products[action.product.id] = action.product
        //     return newState;
        // case ADD_PRODUCT:
        //     newState = {...state};
        //     newState.products[action.product.id] = action.product;
        //     return newState;
        // case DELETE_PRODUCT:
        //     newState = {...state};
        //     delete newState.products[action.id]
        //     return newState;
        default:
            return state;
    }
}
