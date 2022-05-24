import React, {useState, useEffect} from 'react';
import { NavLink, Redirect, useHistory, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import searchIcon from './search-icon2.png'
import logo from './logo1.png'
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';

function Navigation({ isLoaded, feedChange, feed }) {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    const [searchQ, setSearchQ] = useState('')
    const [b1, setb1] = useState('bOn')
    const [b2, setb2] = useState('bOff')

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

    function search(){
        let searchItem = searchQ
        // setSearchQ('')
        history.push(`/search/${searchItem}`)
        window.location.reload()
    }

    useEffect(()=>{
        console.log(b1,b2)
    }, [b1,b2])

    function handleClick(val){
        if(val){
            feedChange('user');
            setb1('bOn');
            setb2('bOff')
        }else{
            feedChange('top'); 
            setb1('bOn'); 
            setb2('bOff')
        }
    }



    return (
        <div className='navBar'>
            <div className='navDivs'>
                <ul className='navUl'>
                    <li>
                        <NavLink exact to="/" className='logoDiv'><img src={logo} className='logo'></img>AudioByte</NavLink>
                    </li>
                    <li>
                        {!sessionUser && (
                            <a className='about' onClick={demoLogin}>Demo User</a>
                        )}
                    </li>
                    <li>
                        {sessionUser && (
                            <NavLink exact to='/upload' className='uploadLink'>Upload</NavLink>
                        )}
                    </li>
                </ul>
            </div>

            <div className='navDivs'>
                    <button className={b1} onClick={()=> handleClick(true)}>User Songs</button>
                <div className='searchBar'>
                    <input className="search" type="text" placeholder="Search" onChange={(e)=> {setSearchQ(e.target.value)}}></input>
                    <Link to={'/search/'+searchQ}><img src={searchIcon}></img></Link>
                </div>
                <button className={b1} onClick={() => handleClick(false)}>Top WorldWide</button>
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