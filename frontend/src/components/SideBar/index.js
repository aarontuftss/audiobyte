import React, { useState, useEffect } from 'react';
// import * as sessionActions from '../../store/session';
import * as songActions from '../../store/songs';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SongItem from '../SongItem';
import TrendSongItem from '../TrendSongItem';
import * as deezerActions from '../../store/deezer';
// import WaveFormLocal from '../WaveFormLocal';


import './SideBar.css';

function SideBar(props) {
    // const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);
    // const songObjects = useSelector((state) => state.songs);
    // const deezerObjects = useSelector((state) => state.deezer);
    const [isLoaded, setIsLoaded] = useState(false);
    // const [displayLocal, setDisplayLocal] = useState(true)
    // const [b1, setB1] = useState('selected')
    // const [b2, setB2] = useState('')

    useEffect(() => {
        setIsLoaded(true);
    }, []);


    return (
        <>
            <div className='mainWrap'>
                {isLoaded && (
                    <>
                    <div className='sidebar-wrap'>
                        <div>

                        </div>
                        <div>
                            {props.mainSong.value}
                        </div>
                    </div>
                    </>
                )}
            </div>
        </>
    );
}

export default SideBar;