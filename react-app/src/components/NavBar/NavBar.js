import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';
import LoginFormModal from '../Modals/LoginFormModal'
import SignupFormModal from '../Modals/SignupFormModal'
import ProfileButton from './ProfileButton';


function NavBar({ isLoaded }) {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);


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
                            Home
                        </button>
                        <div className='github-link'>
                            <a href='https://github.com/hisownspace/capstone-project' rel="noreferrer" target='_blank'>
                                GitHub
                            </a>
                        </div>
                    </div>
                    <div className="nav-search">
                        <label
                            className="search-label"
                        >
                            <input
                                className="searchbar"
                                placeholder='Search'
                            >
                            </input>
                            <button
                            className="search-button"
                            ><FontAwesomeIcon className="fa-solid" icon={faMagnifyingGlass} /></button>
                        </label>
                    </div>
                    <div className='nav-right'>
                        {sessionUser && <button onClick={() => history.push('/upload')} className='nav-bar-button nav-button'>
                            Upload
                        </button>}
                        <div className="open-dropdown-button">
                            {isLoaded && sessionLinks}
                        </div>
                    </div>
                </div>
            </div>
        {/* <Footer /> */}
        </>
    )
    };

export default NavBar;