import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import searchIcon from './search-icon2.png'
import logo from './logo1.png'
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()

     const demoLogin = (e) => {
        e.preventDefault();
        const demoData = {
            credential: 'Demo-lition',
            password: 'password'
        }
        dispatch(sessionActions.login(demoData))
        return <Redirect to='/home'/>
    }


    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} className='profileB' />
        );
    } else {
        sessionLinks = (
            <>
                <NavLink to="/login" className='authB'>Log In</NavLink>
                <NavLink to="/signup" className='authB2'>Sign Up</NavLink>
            </>
        );
    }

    return (
        <div className='navBar'>
            <div className='navDivs'>
                <ul className='navUl'>
                    <li>
                        <NavLink exact to="/" className='logoDiv'><img src={logo} className='logo'></img>SoundTube</NavLink>
                    </li>
                    <li>
                        {!sessionUser && (
                            <a className='about' onClick={demoLogin}>Demo User</a>
                        )}
                    </li>
                </ul>
            </div>

            <div className='navDivs'>
                <div className='searchBar'>
                    <input className="search" type="text" placeholder="Search"></input>
                    <img src={searchIcon}></img>
                </div>
            </div>

            <div className='navDivs'>
                <ul className='navUl'>
                    <li>
                        {isLoaded && sessionLinks}
                    </li>
                </ul>
            </div>

        </div>
    );
}

export default Navigation;