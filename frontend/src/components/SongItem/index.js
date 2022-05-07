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

    const deleteSong = async () => {
        await dispatch(songActions.deleteSong(props.song.id))
        .then(dispatch( () => songActions.loadSongs()))
    }

    const postComment = async() => {
        const id = sessionUser.id
        const data = {
            userId: id,
            text: commentText,
            songId: props.song.id
        }
        setCommentText('')
        await dispatch(commentActions.createComment(data))
        .then(()=> dispatch(songActions.loadSongs()))
    }

    return (
        <div className='mainDiv'>
            <div className='mainLeft'>
                <h2>"{props.song.name}" by {props.song.User.username}</h2>
                <div className='holder'>
                    <img src={props.song.image}></img>
                    <AudioPlayer src={props.song.songUrl} className='audioPlayer'/>
                </div>
                {isUser && (
                    <>
                    <NavLink to={link} className='editLink'>Edit Song</NavLink>
                    <button onClick={deleteSong} className='deleteB'>Delete</button>
                    </>
                )}
            </div>
            <div className='mainRight'>
                <div className='commentItem'>
                    {props.song.Comments.map((comment)=>{
                        return <CommentItem key={comment.id} comment={comment} className='comment'/>
                    })}
                </div>
                <div className='placeComment'>
                    <input type='text' value={commentText} onChange={(e) => setCommentText(e.target.value)}></input>
                    <button onClick={postComment}>Comment</button>
                </div>
            </div>
        </div>
    );
}

export default SongItem;