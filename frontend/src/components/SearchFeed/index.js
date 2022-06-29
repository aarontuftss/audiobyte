import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import * as songActions from '../../store/songs';
import * as deezerActions from '../../store/deezer'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SongItem from '../SongItem'
import TrendSongItem from '../TrendSongItem'
import CommentItem from '../CommentItem';



// import './HomeFeed.css';

function SearchFeed(props) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const songObjects = useSelector((state) => state.songs);
    const deezerObjects = useSelector((state) => state.deezer)
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        // let query = window.location.href.split('/')
        // query = query[query.length - 1]
        // // console.log('nope')
        // dispatch(deezerActions.getSearch(query)).then(() => setIsLoaded(true));
        if (deezerObjects){
            setIsLoaded(true)
        }
    }, []);
    
    if (!sessionUser) return (
        <Redirect to="/" />
    );

    return (
        <>
            <div className='superWrap'>
                <div className='tWrap'>
                    {!isLoaded && (<div className='loader'><img src='https://i.pinimg.com/originals/4f/77/b1/4f77b154221b0a889fdd00b68709dfb6.gif'></img></div>)}

                    {isLoaded && (<h1>Results for: {props?.query}</h1>)}
                    
                    <div className='songHolddd'>
                        {isLoaded && deezerObjects.data.map((song)=>{
                            return <TrendSongItem key={song?.id} song={song} getSong={props?.getSong}/>
                        })}
                    </div>
                </div>
                <div className={props?.didSearch}></div>

                <div className='sideBar'>
                    <img src={props.mainSong?.cover} alt='' />
                    <h1>"{props.mainSong?.name}"</h1>
                    <h3>by {props.mainSong?.singer}</h3>

                    <p>Comments:</p>
                    <div className='commentHold'>
                        {props.mainSong.comments?.map((c) => {
                            return <CommentItem key={c.id} comment={c} />
                        })}
                    </div>


                </div>

            </div>
        </>
    );
}

export default SearchFeed;