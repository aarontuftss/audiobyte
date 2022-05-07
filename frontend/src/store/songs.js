import { csrfFetch } from './csrf';

const GET_SONGS = 'songs/getSongs'
const CREATE_SONG  = 'songs/create'
// const UPDATE_SONG = 'songs/update'
// const DELETE_SONG = 'songs/delete'

const initialState = {}

const load_songs = (songs) => {
    return {
        type: GET_SONGS,
        songs
    }
}

const create_songs = (song) => {
    return {
        type: CREATE_SONG,
        song
    }
}

export const loadSongs = () => async (dispatch) => {
    const response = await csrfFetch('/api/songs/')
    if(response.ok){
        const songs = await response.json();
        dispatch(load_songs(songs))
    }
}


export const createSong = ({name, artistId, image, songUrl}) => async(dispatch) => {
    const response = await csrfFetch('/api/songs', {
        method: 'POST',
        body: JSON.stringify({
            name,
            artistId,
            image,
            songUrl,
        })
    })

}

export const updateSong = ({name, artistId, image, songUrl, id}) => async(dispatch) => {
    const response = await csrfFetch(`/api/songs/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            name,
            artistId,
            image,
            songUrl,
        })
    })
}

export const deleteSong = (id) => async (dispatch) =>{
    const response = await csrfFetch(`/api/songs/${id}`, {
        method: 'DELETE',
    })
    // const response1 = await csrfFetch('/api/songs/')
    // if(response1.ok){
    //     const songs = await response1.json();
    //     dispatch(load_songs(songs))
    // }
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