import { csrfFetch } from './csrf';

const GET_COMMENTS = 'commenta/getComments'
const CREATE_COMMENT  = 'commenta/create'
// const UPDATE_SONG = 'songs/update'
// const DELETE_SONG = 'songs/delete'

const initialState = {}

const load_comments = (comments) => {
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
}

export const deleteComment = (id) => async (dispatch) =>{
    const response = await csrfFetch(`/api/comments/${id}`, {
        method: 'DELETE',
    })
}

const commentReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_COMMENTS:
            let newState = {...action.songs};
            return newState
        default:
            return state
    }
}

export default commentReducer;