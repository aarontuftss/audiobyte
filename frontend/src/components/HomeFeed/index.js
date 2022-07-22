import React, { useState, useEffect } from 'react';
// import * as sessionActions from '../../store/session';
import * as songActions from '../../store/songs';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SongItem from '../SongItem';
import TrendSongItem from '../TrendSongItem';
import * as deezerActions from '../../store/deezer';


import * as commentActions from '../../store/comments'
// import WaveFormLocal from '../WaveFormLocal';


import './HomeFeed.css';
import CommentItem from '../CommentItem';

function HomeFeed(props) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const totalComments = useSelector(state => state.comments);
    const songObjects = useSelector((state) => state.songs);
    const deezerObjects = useSelector((state)=> state.deezer);
    const [isLoaded, setIsLoaded] = useState(false);
    const [displayLocal, setDisplayLocal] = useState(true)
    const [b1, setB1] = useState('selected')
    const [b2, setB2] = useState('')

    const [cText, setCText] = useState('')
    
    useEffect(() => {
        // console.log('nope')
        dispatch(songActions.loadSongs())
        .then(()=> dispatch(deezerActions.getTending()))
        .then(() => dispatch(commentActions.loadComments()))
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

    async function postComment(){
        const newId = totalComments[totalComments.length -1].id + 1
        await dispatch(commentActions.loadComments())

        console.log(totalComments)
        document.getElementById("input").value = "";
        setCText('')

        const data = {
            text: cText,
            userId: sessionUser.id,
            songId: props.mainSong.id,
            id: newId
        }

        await dispatch(commentActions.createComment(data))
        .then(()=> dispatch(songActions.loadSongs()))
        .then(()=> {
            let songg = songObjects.songs.filter((s)=> s.id === props.mainSong.id)[0]
            console.log(songg.Comments)

            const newS = {}
            newS.cover = songg.image
            newS.musicSrc = songg.songUrl
            newS.name = songg.name
            newS.singer = songg.User.username
            newS.comments = [...songg.Comments, data]
            newS.id = songg.id

            localStorage.setItem('song', JSON.stringify(newS));
            props.getSong()
            // setStorage(songg)
        })

        // props.getSong()
    }

    useEffect(() => {
        handleFeed()
        window.addEventListener('storage', handleFeed())
    }, []);
    

    // function filterComments(id){
    //     props.mainSong.comments.filter((c)=>{
    //         return c.id !== id
    //     })
    // }

    async function setStorage(song) {
        await dispatch(songActions.loadSongs())
        .then(()=>{
            const newS = {}
            newS.cover = song.image
            newS.musicSrc = song.songUrl
            newS.name = song.name
            newS.singer = song.User.username
            newS.comments = [...song.Comments]
            newS.id = song.id
    
            localStorage.setItem('song', JSON.stringify(newS));
            props.getSong()
        })
    }



    let feedSelect;
    
    if (!sessionUser) return (
        <Redirect to="/" />
    );
    console.log(props.mainSong)

    return (
        <>
            {!isLoaded && (<div className='loader'><img src='https://i.pinimg.com/originals/4f/77/b1/4f77b154221b0a889fdd00b68709dfb6.gif'></img></div>)}
        <div className='superWrap'>

            <div className='mainWrap1'>
                {isLoaded && props.feed === 'user' && songObjects.songs.map((song)=>{
                    return <SongItem key={song.id} song={song} getSong = {props.getSong} setStorage={setStorage}/>
                })}
                {isLoaded && props.feed === 'top' && deezerObjects.tracks?.data?.map((song)=>{
                    return <TrendSongItem key={song.id} song={song} getSong={props.getSong}></TrendSongItem>
                })}
            </div>
            <div className='sideBar'>
                <img src={props.mainSong.cover} alt=''/>
                <h1>"{props.mainSong.name}"</h1>
                <h3>by {props.mainSong.singer}</h3>
                {props.mainSong?.id && (
                    <>
                        <p>Comments:</p>
                        <div className='commentHold'>
                            {props.mainSong.comments?.map((c)=> {
                                return <CommentItem key={c.id} comment={c} getSong={props.getSong} mainSong={props.mainSong} setStorage={setStorage}/>
                            })}
                                <input id='input' type='text' onChange={(e) => setCText(e.target.value)}/>
                                <button onClick={(e)=> {postComment()}}>Post Comment</button>
                        </div>
                    </>
                )}


            </div>

        </div>
        </>
    );
}

export default HomeFeed;