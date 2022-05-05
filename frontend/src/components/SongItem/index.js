import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import * as songActions from '../../store/songs';
import { useDispatch, useSelector } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import './SongItem.css'

function SongItem(props) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    // const songObjects = useSelector((state) => state.songs);

    // useEffect(() => {
    // dispatch(songActions.loadSongs());
    // }, [dispatch]);


    return (
        <div className='mainWrap'>
            <h2>"{props.song.name}" by {props.song.User.username}</h2>
            <AudioPlayer src={props.song.songUrl}/>
            <div className='songWrap'>
               {props.song.Comments.map((comment)=>{
                   return <p key={comment.id}>{comment.text}</p>
               })}
            </div>
        </div>
    );
}

export default SongItem;