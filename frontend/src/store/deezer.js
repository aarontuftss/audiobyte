import { csrfFetch } from './csrf';

const GET_TRENDING = 'deezer/getTrending'
const SEARCH_SONGS  = 'deezer/search'


const initialState = {}

const get_trending = (songs) => {
    return {
        type: GET_TRENDING,
        songs
    }
}

const search_songs = (songs) => {
    return {
        type: SEARCH_SONGS,
        songs
    }
}

export const getTending = () => async (dispatch) => {
    const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
                'X-RapidAPI-Key': '4df9908727msh857334bea63b5f1p14c6f4jsnf639cf66a38a'
            }
        };

    const response = await fetch('https://deezerdevs-deezer.p.rapidapi.com/playlist/3155776842', options)
    .then(data => {return data.json()})
    dispatch(get_trending(response))
}

export const getSearch = (query) => async (dispatch) => {
    const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
                'X-RapidAPI-Key': '4df9908727msh857334bea63b5f1p14c6f4jsnf639cf66a38a'
            }
        };
        
        
        const response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`, options)
        .then(response => {return response.json()})
        dispatch(search_songs(response))
    }

    const deezerReducer = (state = initialState, action) => {
        switch (action.type){
            case GET_TRENDING:
                let newState = {...action.songs};
                return newState
            case SEARCH_SONGS:
                let newSearch = {...action.songs};
                return newSearch
            default:
                return state
        }
}

export default deezerReducer;