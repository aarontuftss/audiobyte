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
                        <NavLink exact to="/" className='about'>About</NavLink>
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