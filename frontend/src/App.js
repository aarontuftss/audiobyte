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
  const [feed, setFeed] = useState('user');
  const [query, setQuery] = useState('')
  const [didSearch, setDidSearch] = useState(true)

  function feedChange(val){
    console.log(val)
    setFeed(val)
  }

 
  
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

  useEffect(() => {
    getSong()
  }, []);

  function refreshSearch(val){
    setDidSearch(!didSearch)
    setQuery(val)
  }

  


  return (
    <>
      <Navigation isLoaded={isLoaded} feedChange={feedChange} feed={feed} refresh={refreshSearch} className='navBar'/>
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
            <HomeFeed getSong={getSong} feed={feed}/>
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
          <Route path="/search/:query">
            <SearchFeed getSong={getSong} didSearch={didSearch} query={query}/>
          </Route>
        </Switch>
      )}
      {!isLoaded && (
        <>
          <div className="loader"><img src='https://i.pinimg.com/originals/4f/77/b1/4f77b154221b0a889fdd00b68709dfb6.gif'></img></div>
        </>
      )}
      {isLoaded && showPlayer && (
        // <ReactJKMusicPlayer audioLists={mainSong} autoPlay={false} toggleMode={false} mode='full' />
        <AudioPlayer src={mainSong.musicSrc} className='bottomPlayer'/>
      )}
    </>
  );
}

export default App;
