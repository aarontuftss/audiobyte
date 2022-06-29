import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import * as songActions from '../../store/songs';
import { useDispatch, useSelector } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { NavLink } from 'react-router-dom';
import CommentItem from '../CommentItem'
import * as commentActions from '../../store/comments';
import play from '../play.png'

// import './SongItem.css'

function TrendSongItem(props) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const isUser = (sessionUser.id === props.song.artistId)
    const [commentText, setCommentText] = useState('')

    function setStorage(song) {
        const newS = {}
        newS.cover = song.album['cover_medium']
        newS.musicSrc = song.preview
        newS.name = song.title
        newS.singer = song.artist.name

        localStorage.setItem('song', JSON.stringify(newS));
        console.log(props)
        props.getSong()
    }


    return (
        <div className='mainDiv' style={{ backgroundImage: `url(${props.song.album['cover_medium']})` }}>
            <div className='ttt'></div>


            <div className='mainLeft'>

                <h4>"{props.song.title}" by {props.song.artist.name}</h4>

                <img src={play} onClick={()=> setStorage(props.song)} />

            </div>



            {/* <div className='mainRight'>
                <h3>Album: {props.song.album.title}</h3>
                <img src={props.song.album['cover_small']} alt='id'></img>
                <h4>Presented by {props.song.artist.name}</h4> */}
                
                {/* <div className='commentItem'>
                    {props.song.Comments.map((comment)=>{
                        return <CommentItem key={comment.id} comment={comment} className='comment'/>
                    })}
                </div>
                <div className='placeComment'>
                    <input type='text' value={commentText} onChange={(e) => setCommentText(e.target.value)}></input>
                    <button onClick={postComment}>Comment</button>
                </div> */}
            {/* </div> */}
        </div>
    );
}

export default TrendSongItem;