import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, useHistory } from 'react-router-dom';


function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(true);
    const history = useHistory()

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/')
    };


    return (
        <>
            <div className='userWrap'>
                {/* <NavLink exact to='/upload' className='uploadLink'>Upload</NavLink> */}
                {showMenu && (
                    <ul className="profile-dropdown">
                        <li>{user.username}</li>
                        {/* <li>{user.email}</li> */}
                        <li>
                            <button onClick={logout} className='logoutB'>Log Out</button>
                        </li>
                    </ul>
                )}
            </div>
        </>
    );
}

export default ProfileButton;