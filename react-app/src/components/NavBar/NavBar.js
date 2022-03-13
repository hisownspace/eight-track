import React, { useEffect } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './NavBar.css';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';
import LoginFormModal from '../Modals/LoginFormModal'
import SignupFormModal from '../Modals/SignupFormModal'
import ProfileButton from './ProfileButton';
import Footer from '../FooterPlayer';


function NavBar({ isLoaded }) {
    const history = useHistory();
    const location = useLocation();
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();


    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
            sessionLinks = (
                <>
                    <LoginFormModal />
                    <SignupFormModal />
                </>
            )
        }

    return (
        <>
        <div className="nav-bar">
            <div className='occupied-nav-bar'>
                <div className='nav-left'>
                    <div className="nav-bar-icon">
                        <img alt="8-track-icon" src="https://eta-photobucket.s3.amazonaws.com/8-track-icon.png"></img>
                    </div>
                    <button onClick={() => history.push('/songs')} className="nav-bar-songs-button nav-button">
                        Library
                    </button>
                </div>
                <div className='nav-right'>
                    {sessionUser && <button onClick={() => history.push('/upload')} className='nav-bar-button nav-button'>
                        Upload
                    </button>}
                    <div className="nav-right">
                        {isLoaded && sessionLinks}
                    </div>
                    <div className='github-link'>
                        <a href='https://github.com/hisownspace/capstone-project' rel="noreferrer" target='_blank'>
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </div>
        {/* <Footer /> */}
        </>
    )
    };

export default NavBar;