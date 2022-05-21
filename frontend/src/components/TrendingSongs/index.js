import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import * as songActions from '../../store/songs';
import * as deezerActions from '../../store/deezer'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SongItem from '../SongItem'
import TrendSongItem from '../TrendSongItem'


// import './HomeFeed.css';

function TrendingSongs(props) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const songObjects = useSelector((state) => state.songs);
    const deezerObjects = useSelector((state) => state.deezer)
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // console.log('nope')
        dispatch(deezerActions.getTending()).then(() => setIsLoaded(true));
    }, [dispatch]);
    
    
    if (!sessionUser) return (
        <Redirect to="/" />
    );

    return (
        <>
            <h1>Top Worldwide</h1>
            <div className='tWrap'>
                {isLoaded && deezerObjects.tracks.data.map((song)=>{
                    return <TrendSongItem key={song.id} song={song} getSong={props.getSong}></TrendSongItem>
                })}
            </div>
        </>
    );
}

export default TrendingSongs;