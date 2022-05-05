import { csrfFetch } from './csrf';

const GET_SONGS = 'songs/getSongs'
// const CREATE_SONG  = 'songs/create'
// const UPDATE_SONG = 'songs/update'
// const DELETE_SONG = 'songs/delete'

const initialState = {}

const load_songs = (songs) => {
    return {
        type: GET_SONGS,
        songs
    }
}

export const loadSongs = () => async (dispatch) => {
    const response = await csrfFetch('/api/songs/')
    if(response.ok){
        const songs = await response.json();
        dispatch(load_songs(songs))
    }
}

const songReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_SONGS:
            let newState = {...action.songs};
            return newState
        default:
            return state
    }
}

export default songReducer;