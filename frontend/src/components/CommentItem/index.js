import React, { useState } from 'react';
// import * as sessionActions from '../../store/session';
import * as songActions from '../../store/songs';
import * as commentActions from '../../store/comments';
import { useDispatch, useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom';

import './CommentItem.css'

function CommentItem(props) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const isUser = (sessionUser.id === props.comment.userId)
    const [toEdit, setToEdit] = useState(true)
    const [commentText, setCommentText] = useState('')

    const deleteComment = async() => {
        await dispatch(commentActions.deleteComment(props.comment.id))
        // window.location.reload()
        .then(()=> dispatch(songActions.loadSongs()))
    }

    // const postComment = async() => {
    //     const id = sessionUser.id
    //     const data = {
    //         userId: id,
    //         text: commentText,
    //         songId: props.song.id
    //     }
    //     setCommentText('')
    //     await dispatch(commentActions.createComment(data))
    //         .then(() => dispatch(songActions.loadSongs()))
    // }

    const showModal = () => {
        setToEdit(!toEdit)
    }

    const editComment = async () => {
        const data = {
            text: commentText,
            id: props.comment.id
        }
        setCommentText('')
        setToEdit(!toEdit)
        await dispatch(commentActions.updateComment(data))
        await dispatch(songActions.loadSongs())
    }

    return (
        <div className='mainWrap'>
            <p>{props.comment.text}</p>
            {isUser && (
                <>
                <div hidden={toEdit}><input type='text' value={commentText} onChange={(e) => setCommentText(e.target.value)}></input><button onClick={editComment}>Edit</button></div>
                <button onClick={showModal}>Edit Comment</button>
                <button onClick={deleteComment}>Delete</button>
                </>
            )}
        </div>
    );
}

export default CommentItem;