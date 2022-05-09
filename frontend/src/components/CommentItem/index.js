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
    const [toEdit, setToEdit] = useState(false)
    const [commentText, setCommentText] = useState('')

    const deleteComment = async() => {
        await dispatch(commentActions.deleteComment(props.comment.id))
        // window.location.reload()
        .then(()=> dispatch(songActions.loadSongs()))
    }

    const showModal = () => {
        setToEdit(!toEdit)
    }

    const editComment = async () => {
        if(commentText === ''){
            window.alert('Cannot Leave Blank Comment')
            return
        }
        if(commentText.split('').length > 100) {
            window.alert('Comment Cannot Be Longer Than 100 Characters')
            return
        }
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
        <div className='hi'>
            <div className='c-box'>
                <p className='c-text'>{props.comment.text}</p>
                {isUser &&(
                    <>
                    <button onClick={showModal}>Edit</button>
                    <button onClick={deleteComment}>Delete</button>
                    </>
                )}
            </div>
            {isUser && toEdit && (
                <>
                <div className='editBox'>
                    <input type='text' value={commentText} onChange={(e) => setCommentText(e.target.value)}></input>
                    <button onClick={editComment}>Edit</button>
                </div>
                </>
            )}
        </div>
    );
}

export default CommentItem;