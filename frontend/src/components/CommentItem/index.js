import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import * as songActions from '../../store/songs';
import * as commentActions from '../../store/comments';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './CommentItem.css'

function CommentItem(props) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const isUser = (sessionUser.id === props.comment.userId)
    const [toEdit, setToEdit] = useState(true)
    const [commentText, setCommentText] = useState('')

    const deleteComment = () => {
        dispatch(commentActions.deleteComment(props.comment.id))
        // window.location.reload()
        return dispatch(songActions.loadSongs())
    }

    const postComment = () => {
        const id = sessionUser.id
        const data = {
            userId: id,
            text: commentText,
            songId: props.song.id
        }
        dispatch(commentActions.createComment(data))
        return dispatch(songActions.loadSongs())
    }

    const showModal = () => {
        setToEdit(!toEdit)
    }

    const editComment = () => {
        const data = {
            text: commentText,
            id: props.comment.id
        }
        dispatch(commentActions.updateComment(data))
        return dispatch(songActions.loadSongs())
    }

    return (
        <div className='mainWrap'>
            <p>{props.comment.text}</p>
            {isUser && (
                <>
                <div hidden={toEdit}><input type='text' onChange={(e) => setCommentText(e.target.value)}></input><button onClick={editComment}>Edit</button></div>
                <button onClick={showModal}>Edit Comment</button>
                <button onClick={deleteComment}>Delete</button>
                </>
            )}
        </div>
    );
}

export default CommentItem;