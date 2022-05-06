import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import * as songActions from '../../store/songs';
import { useDispatch, useSelector } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { NavLink } from 'react-router-dom';
import CommentItem from '../CommentItem'
import * as commentActions from '../../store/comments';

import './SongItem.css'

function SongItem(props) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const isUser = (sessionUser.id === props.song.artistId)
    const [commentText, setCommentText] = useState('')

    const link = `/edit/${props.song.id}`

    const deleteSong = () => {
        dispatch(songActions.deleteSong(props.song.id))
        return dispatch(songActions.loadSongs())
        // window.location.reload()
    }

    const postComment = () => {
        const id = sessionUser.id
        const data = {
            userId: id,
            text: commentText,
            songId: props.song.id
        }
        dispatch(commentActions.createComment(data))
        dispatch(songActions.loadSongs())
        setCommentText('')
    }

    return (
        <div className='mainWrap'>
            <h2>"{props.song.name}" by {props.song.User.username}</h2>
            <AudioPlayer src={props.song.songUrl}/>
            <div className='songWrap'>
               {props.song.Comments.map((comment)=>{
                   return <CommentItem key={comment.id} comment={comment} />
                })}
                <input type='text' value={commentText} onChange={(e) => setCommentText(e.target.value)}></input><button onClick={postComment}>Comment</button>
            </div>
            {isUser && (
                <>
                <NavLink to={link} >Edit Song</NavLink>
                <button onClick={deleteSong}>Delete</button>
                </>
            )}
        </div>
    );
}

export default SongItem;