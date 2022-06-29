import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink, useHistory } from 'react-router-dom';


import './splash.css';

function Splash() {
    const dispatch = useDispatch();
    const history = useHistory()

    // useEffect(() => {
    //     dispatch(sessionActions.restoreUser())
    //         .then(() => {
    //             if (sessionUser) {
    //                 // setShowPlayer(true)
    //                 console.log('HI')
    //             }
    //         })
    //         // .then(() => setIsLoaded(true));
    // }, [dispatch]);

    const sessionUser = useSelector(state => state.session.user);

    // if (sessionUser?.id) return (
    //     <Redirect to="/home" />
    // );

    if (sessionUser) {
        history.push('/home')
    }

    return (
        <div className='mainWrap'>
            <div className='imgDisplay'>
                <h1>Join Music's #1 Community For Streaming & Discovering New Music</h1>
                <div>
                    <NavLink to="/login" className='authB3'>Log In</NavLink>
                    <NavLink to="/signup" className='authB3'>Sign Up</NavLink>
                </div>
            </div>
        </div>
    );
}

export default Splash;