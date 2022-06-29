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

function HomeFeed(props) {
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

    function handleFeed(){
        const newF = window.sessionStorage.getItem('feed')
        console.log(newF)
    }

    useEffect(() => {
        handleFeed()
        window.addEventListener('storage', handleFeed())
    }, []);
    


    let feedSelect;
    
    if (!sessionUser) return (
        <Redirect to="/" />
    );
    // console.log(songObjects.songs)

    return (
        <>
            {!isLoaded && (<div className='loader'><img src='https://i.pinimg.com/originals/4f/77/b1/4f77b154221b0a889fdd00b68709dfb6.gif'></img></div>)}
        <div className='superWrap'>

            <div className='mainWrap1'>
                {isLoaded && props.feed === 'user' && songObjects.songs.map((song)=>{
                    return <SongItem key={song.id} song={song} getSong = {props.getSong}/>
                })}
                {isLoaded && props.feed === 'top' && deezerObjects.tracks.data.map((song)=>{
                    return <TrendSongItem key={song.id} song={song} getSong={props.getSong}></TrendSongItem>
                })}
            </div>
            <div className='sideBar'>

            </div>
            
        </div>
        </>
    );
}

export default HomeFeed;