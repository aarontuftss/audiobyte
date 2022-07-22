import { csrfFetch } from './csrf';

import { loadSongs } from './songs';

const GET_COMMENTS = 'commenta/getComments'
const CREATE_COMMENT  = 'commenta/create'
// const UPDATE_SONG = 'songs/update'
// const DELETE_SONG = 'songs/delete'

const initialState = {}

const load_comments = (comments1) => {
    let comments = comments1.songComments
    return {
        type: GET_COMMENTS,
        comments
    }
}

const create_comments = (comment) => {
    return {
        type: CREATE_COMMENT,
        comment
    }
}

export const createComment = ({text, userId, songId}) => async(dispatch) => {
    const response = await csrfFetch(`/api/comments/`, {
        method: 'POST',
        body: JSON.stringify({
            text,
            userId, 
            songId
        })
    })
    if (response.ok){
       return 
    }

}

export const loadComments = () => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/`, {
        method: 'GET'
    })
    if (response.ok) {
        const comments = await response.json();
        await dispatch(load_comments(comments))
    }
}


export const updateComment = ({text, userId, songId, id}) => async(dispatch) => {
    const response = await csrfFetch(`/api/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            text, 
            userId, 
            songId
        })
    })
    if (response.ok) {
        // const comments = await response.json();
        await dispatch(loadSongs())
    }
}

export const deleteComment = (id) => async (dispatch) =>{
    const response = await csrfFetch(`/api/comments/${id}`, {
        method: 'DELETE',
    })

    if (response.ok){
        await dispatch(loadSongs())
        return {ok: 'yes'}
    }
}

const commentReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_COMMENTS:
            let newState = [...action.comments];
            return newState
        default:
            return state
    }
}

export default commentReducer;