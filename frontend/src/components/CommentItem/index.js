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
    const songObjects = useSelector((state) => state.songs);
    const [toEdit, setToEdit] = useState(false)
    const [commentText, setCommentText] = useState('')

    const [ccommentText, setCcommentText] = useState(props.comment.text)

    const deleteComment = async() => {
        let did = await dispatch(commentActions.deleteComment(props.comment.id))
        if (await did.ok){
    
            let songg = props.mainSong

            songg.comments = songg.comments.filter((c)=> {
                return c.id !== props.comment.id
            })
    
            localStorage.setItem('song', JSON.stringify(songg))
            await dispatch(songActions.loadSongs())
            .then(()=> {
                props.getSong()
            })
        }
        


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

        setCcommentText(commentText)

        const data = {
            text: commentText,
            id: props.comment.id
        }
        
        setCommentText('')
        setToEdit(!toEdit)
        await dispatch(commentActions.updateComment(data))
        .then(()=> {
            props.comment.text = data.text
            let songg = songObjects.songs.filter((s) => s.id === props.mainSong.id)[0]

            const newS = {}
            newS.cover = songg.image
            newS.musicSrc = songg.songUrl
            newS.name = songg.name
            newS.singer = songg.User.username
            newS.comments = [...songg.Comments]
            newS.id = songg.id

            localStorage.setItem('song', JSON.stringify(newS));

            props.getSong()
        })
        await dispatch(songActions.loadSongs())
    }

    return (
        <div className='hi'>
            <div className='c-box'>
                <p className='c-text'>{ccommentText}</p>
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