import React, { useState, useEffect } from 'react';
// import * as sessionActions from '../../store/session';
import * as songActions from '../../store/songs';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SongItem from '../SongItem';
import TrendSongItem from '../TrendSongItem';
import * as deezerActions from '../../store/deezer';
// import WaveFormLocal from '../WaveFormLocal';


import './HomeFeed.css';

function HomeFeed() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const songObjects = useSelector((state) => state.songs);
    const deezerObjects = useSelector((state)=> state.deezer);
    const [isLoaded, setIsLoaded] = useState(false);
    const [displayLocal, setDisplayLocal] = useState(true)
    const [b1, setB1] = useState('selected')
    const [b2, setB2] = useState('')
    
    useEffect(() => {
        // console.log('nope')
        dispatch(songActions.loadSongs())
        .then(()=> dispatch(deezerActions.getTending()))
        .then(() => setIsLoaded(true));;
    }, [dispatch]);

    useEffect(() => {
        if (displayLocal){
            setB1('selected')
            setB2('')
        }else{
            setB1('')
            setB2('selected')
        }
    }, [displayLocal]);


    let feedSelect;
    
    if (!sessionUser) return (
        <Redirect to="/" />
    );
    // console.log(songObjects.songs)

    return (
        <>
        <div className='feedSelector'>
            {isLoaded && (
                <>
                <button className={b1} onClick={()=> setDisplayLocal(true)}>User Tracks</button>
                <button className={b2} onClick={()=> setDisplayLocal(false)}>Top WorldWide</button>
                </>
            )}
        </div>
        <div className='mainWrap'>
            {isLoaded && displayLocal && songObjects.songs.map((song)=>{
                return <SongItem key={song.id} song={song}/>
            })}
            {isLoaded && !displayLocal && deezerObjects.tracks.data.map((song)=>{
                    return <TrendSongItem key={song.id} song = {song}></TrendSongItem>
            })}
        </div>
        </>
    );
}

export default HomeFeed;