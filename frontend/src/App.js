import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Splash from './components/SplashPage'
import './index.css'
import HomeFeed from './components/HomeFeed'
import SongUpload from './components/SongUpload'
import EditSong from './components/EditSong'
import TrendingSongs from './components/TrendingSongs'
import SearchFeed from './components/SearchFeed'
// import ReactJKMusicPlayer from 'react-jinke-music-player'
// import 'react-jinke-music-player/assets/index.css'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPlayer, setShowPlayer] = useState(true)
 
  
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    .then(()=> {
      if(sessionUser) {
        setShowPlayer(true)
        console.log('HI')
      }
    })
    .then(() => setIsLoaded(true));
  }, [dispatch]);

    
    const audiolist = [{
      cover: 'https://e-cdns-images.dzcdn.net/images/cover/ec3c8ed67427064c70f67e5815b74cef/56x56-000000-80-0-0.jpg',
      musicSrc: 'https://cdns-preview-c.dzcdn.net/stream/c-cca63b2c92773d54e61c5b4d17695bd2-8.mp3',
      name: 'hi',
      singer: 'hi'
      
    }]
    
    const [mainSong, setMainSong] = useState(audiolist);

    useEffect(() => {
      console.log('on song change')
    }, [mainSong]);

    function getSong(){
      const item = JSON.parse(localStorage.getItem('song'));
      if (item) {
        setMainSong(item)
      }
    }


  return (
    <>
      <Navigation isLoaded={isLoaded} className='navBar'/>
      {isLoaded && (
        <Switch>
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <Splash />
          </Route>
          <Route exact path="/home">
            <HomeFeed getSong={getSong}/>
          </Route>
          <Route exact path="/upload">
            <SongUpload />
          </Route>
          <Route exact path="/edit/:id">
            <EditSong />
          </Route>
          <Route exact path="/trending">
            <TrendingSongs getSong={getSong}/>
          </Route>
          <Route exact path="/search/:query">
            <SearchFeed getSong={getSong}/>
          </Route>
        </Switch>
      )}
      {isLoaded && showPlayer && (
        // <ReactJKMusicPlayer audioLists={mainSong} autoPlay={false} toggleMode={false} mode='full' />
        <AudioPlayer src={mainSong.musicSrc} className='bottomPlayer'/>
      )}
    </>
  );
}

export default App;
