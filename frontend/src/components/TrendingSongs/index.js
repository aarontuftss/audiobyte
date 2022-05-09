// import React, { useState, useEffect } from 'react';
// // import * as sessionActions from '../../store/session';
// import * as songActions from '../../store/songs';
// import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// // import SongItem from '../SongItem'
// import TrendSongItem from '../TrendSongItem'


// // import './HomeFeed.css';

// async function TrendingSongs() {
//     const dispatch = useDispatch();
//     const sessionUser = useSelector(state => state.session.user);
//     const songObjects = useSelector((state) => state.songs);
//     const [isLoaded, setIsLoaded] = useState(false);
    
    
//     // const [trendingSongz, setTrendingSongz] = useState(load_tracks())
//     let results = await load_tracks();
//     async function load_tracks(){
//         const options = {
//             method: 'GET',
//             headers: {
//                 'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
//                 'X-RapidAPI-Key': '4df9908727msh857334bea63b5f1p14c6f4jsnf639cf66a38a'
//             }
//         };
        
//         let yeet;
//         fetch('https://deezerdevs-deezer.p.rapidapi.com/playlist/3155776842', options)
//         .then(response => response.json())
//         .then(response => {
//             yeet = response.tracks.data
//             console.log(response.tracks.data)
//         }).then(()=> {return yeet})
//         // .then(() => setIsLoaded(true))
//     }
    
//     if (!sessionUser) return (
//         <Redirect to="/" />
//     );

//     return (
//         <>
//         {isLoaded && (
//             <div className='mainWrap'>
//                 {isLoaded && Array(results).map((song)=>{
//                     return <TrendSongItem key={song.key} song={song}/>
//                 })}
//             </div>
//         )}
//         </>
//     );
// }

// export default TrendingSongs;