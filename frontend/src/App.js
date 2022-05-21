import React, { useState, useEffect, useRef } from "react";
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
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPlayer, setShowPlayer] = useState(true);


 
  
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
    
    const [mainSong, setMainSong] = useState('');

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
