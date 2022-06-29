import React, { useState } from 'react';
// import * as sessionActions from '../../store/session';
import * as songActions from '../../store/songs';
import { useDispatch, useSelector } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { NavLink } from 'react-router-dom';
import CommentItem from '../CommentItem'
import * as commentActions from '../../store/comments';
import WaveFormLocal from '../WaveFormLocal'

import './SongItem.css'
import play from '../play.png'

function SongItem(props) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const isUser = (sessionUser.id === props.song.artistId)
    const [commentText, setCommentText] = useState('')

    const link = `/edit/${props.song.id}`

    const deleteSong = async () => {
        await dispatch(songActions.deleteSong(props.song.id))
        .then(dispatch(songActions.loadSongs()))
        .then(dispatch(songActions.loadSongs()))
    }

    const postComment = async() => {
        const id = sessionUser.id
        if(commentText === ''){
            window.alert('Cannot Leave Blank Comment')
            return
        }
        if(commentText.split('').length > 100) {
            window.alert('Comment Cannot Be Longer Than 100 Characters')
            return
        }
        const data = {
            userId: id,
            text: commentText,
            songId: props.song.id
        }
        setCommentText('')
        await dispatch(commentActions.createComment(data))
        .then(()=> dispatch(songActions.loadSongs()))
    }

    function setStorage(song){
        const newS = {}
        newS.cover = song.image
        newS.musicSrc = song.songUrl
        newS.name = song.name
        newS.singer = song.User.username

        localStorage.setItem('song', JSON.stringify(newS));
        props.getSong()
    }

    return (
        <div className='mainDiv' style={{backgroundImage: `url(${props.song.image})`}}>



            <div className='mainLeft'>
                <h4>"{props.song.name}" by {props.song.User.username}</h4>

                <img src={play} onClick={()=> setStorage(props.song)}/>
                

                {isUser && (
                    <>
                    <NavLink to={link} className='editLink'>Edit Song</NavLink>
                    <button onClick={deleteSong} className='deleteB'>Delete</button>
                    </>
                )}


            </div>




            {/* <div className='mainRight'>
                <div className='commentItem'>
                    {props.song.Comments.map((comment)=>{
                        return <CommentItem key={comment.id} comment={comment} className='comment'/>
                    })}
                </div>
                <div className='placeComment'>
                    <input type='text' value={commentText} onChange={(e) => setCommentText(e.target.value)}></input>
                    <button onClick={postComment}>Comment</button>
                </div>
            </div> */}
        </div>
    );
}

export default SongItem;