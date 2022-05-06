import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // const sessionUser = useSelector(state => state.session.user);

  // if (sessionUser) console.log('hi')
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
            <HomeFeed />
          </Route>
          <Route exact path="/upload">
            <SongUpload />
          </Route>
          <Route exact path="/edit/:id">
            <EditSong />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
