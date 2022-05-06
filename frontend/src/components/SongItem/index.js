import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import * as songActions from '../../store/songs';
import { useDispatch, useSelector } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { NavLink } from 'react-router-dom';

import './SongItem.css'

function SongItem(props) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const isUser = (sessionUser.id === props.song.artistId)

    const link = `/edit/${props.song.id}`

    

    // const songObjects = useSelector((state) => state.songs);

    // useEffect(() => {
    // dispatch(songActions.loadSongs());
    // }, [dispatch]);

    const deleteSong = () => {
        dispatch(songActions.deleteSong(props.song.id))
        // dispatch(songActions.loadSongs())
        window.location.reload()
    }

    return (
        <div className='mainWrap'>
            <h2>"{props.song.name}" by {props.song.User.username}</h2>
            <AudioPlayer src={props.song.songUrl}/>
            <div className='songWrap'>
               {props.song.Comments.map((comment)=>{
                   return <p key={comment.id}>{comment.text}</p>
                })}
                <input type='text'></input><button onClick={console.log()}>Comment</button>
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