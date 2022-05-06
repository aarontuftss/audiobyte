import React, { useState, useEffect } from 'react';
// import * as sessionActions from '../../store/session';
import * as songActions from '../../store/songs';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SongItem from '../SongItem'


import './HomeFeed.css';

function HomeFeed() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const songObjects = useSelector((state) => state.songs);
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        // console.log('nope')
        dispatch(songActions.loadSongs()).then(() => setIsLoaded(true));;
    }, [dispatch]);
    
    if (!sessionUser) return (
        <Redirect to="/" />
    );
    // console.log(songObjects.songs)

    return (
        <div className='mainWrap'>
            <div className='songWrap'>
                {isLoaded && songObjects.songs.map((song)=>{
                    return <SongItem key={song.id} song={song}/>
                })}
            </div>
        </div>
    );
}

export default HomeFeed;