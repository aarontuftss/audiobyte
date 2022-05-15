import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import * as songActions from '../../store/songs';
import { useDispatch, useSelector } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { NavLink } from 'react-router-dom';
import CommentItem from '../CommentItem'
import * as commentActions from '../../store/comments';

// import './SongItem.css'

function TrendSongItem(props) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const isUser = (sessionUser.id === props.song.artistId)
    const [commentText, setCommentText] = useState('')


    return (
        <div className='mainDiv'>
            <div className='mainLeft'>
                <h2>"{props.song.title}" by {props.song.artist.name}</h2>
                <div className='holder'>
                    <img src={props.song.album['cover_small']}></img>
                    <AudioPlayer src={props.song.preview} className='audioPlayer'/>
                </div>
            </div>
            <div className='mainRight'>
                <h3>Album: {props.song.album.title}</h3>
                <img src={props.song.album['cover_small']} alt='id'></img>
                <h4>Presented by {props.song.artist.name}</h4>
                
                {/* <div className='commentItem'>
                    {props.song.Comments.map((comment)=>{
                        return <CommentItem key={comment.id} comment={comment} className='comment'/>
                    })}
                </div>
                <div className='placeComment'>
                    <input type='text' value={commentText} onChange={(e) => setCommentText(e.target.value)}></input>
                    <button onClick={postComment}>Comment</button>
                </div> */}
            </div>
        </div>
    );
}

export default TrendSongItem;