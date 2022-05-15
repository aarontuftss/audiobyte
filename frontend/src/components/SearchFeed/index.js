import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import * as songActions from '../../store/songs';
import * as deezerActions from '../../store/deezer'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SongItem from '../SongItem'
import TrendSongItem from '../TrendSongItem'



// import './HomeFeed.css';

function SearchFeed() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const songObjects = useSelector((state) => state.songs);
    const deezerObjects = useSelector((state) => state.deezer)
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        let query = window.location.href.split('/')
        query = query[query.length - 1]
        // console.log('nope')
        dispatch(deezerActions.getSearch(query)).then(() => setIsLoaded(true));
    }, [dispatch]);
    
    if (!sessionUser) return (
        <Redirect to="/" />
    );

    return (
        <>
            <div className='tWrap'>
                {isLoaded && (<h1>Results for: '{window.location.href.split('/').pop().replaceAll('%20', ' ')}'</h1>)}
                {isLoaded && deezerObjects.data.map((song)=>{
                    return <TrendSongItem key={song.id} song={song}></TrendSongItem>
                })}
            </div>
        </>
    );
}

export default SearchFeed;