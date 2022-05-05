// import React, { useState } from 'react';
// import * as sessionActions from '../../store/session';
import * as songActions from '../../store/songs';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';


import './HomeFeed.css';

function HomeFeed() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    if (!sessionUser) return (
        <Redirect to="/" />
    );

    const fillSongs = (e) => {
        e.preventDefault();
        return dispatch(songActions.loadSongs())
    }

    return (
        <div className='mainWrap'>
            <button onClick={fillSongs}> click me</button>
        </div>
    );
}

export default HomeFeed;