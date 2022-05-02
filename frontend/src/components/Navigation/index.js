import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import searchIcon from './search-icon2.png'
import logo from './logo1.png'

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} className='profileB' />
        );
    } else {
        sessionLinks = (
            <>
                <NavLink to="/login">Log In</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
            </>
        );
    }

    return (
        <div className='navBar'>
            <ul className='navUl'>
                <li>
                    <NavLink exact to="/" className='logoDiv'><img src={logo} className='logo'></img>SoundTube</NavLink>
                </li>
            </ul>
            <div className='searchBar'>
                <input className="search" type="text" placeholder="Search"></input>
                <img src={searchIcon}></img>
            </div>
            <ul className='navUl'>
                <li>
                    {isLoaded && sessionLinks}
                </li>
            </ul>
        </div>
    );
}

export default Navigation;