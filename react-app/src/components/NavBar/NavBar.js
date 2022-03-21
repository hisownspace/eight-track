import React, { useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';
import LoginFormModal from '../Modals/LoginFormModal'
import SignupFormModal from '../Modals/SignupFormModal'
import ProfileButton from './ProfileButton';
import { search } from '../../store/search';


function NavBar({ isLoaded }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async e => {
        e.preventDefault();
        await dispatch(search(searchTerm));
        history.push(`/search?q=${searchTerm}`);
    };

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
                            <NavLink to="/">
                                <img alt="8-track-icon"
                                src="https://eta-photobucket.s3.amazonaws.com/8-track-icon.png">
                                </img>
                            </NavLink>
                        </div>
                        <button
                        onClick={() => history.push('/songs')}
                        className="nav-bar-songs-button nav-button">
                            Home
                        </button>
                        <div className='github-link'>
                            <a
                            href='https://github.com/hisownspace/capstone-project'
                            rel="noreferrer"
                            target='_blank'>
                                GitHub
                            </a>
                        </div>
                    </div>
                    <div className="nav-search">
                        <form
                            className="search-form"
                            onSubmit={handleSearch}
                        >
                        <label
                            className="search-label">
                            <input
                                className="searchbar"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                >
                            </input>
                            <button className="search-button">
                                <FontAwesomeIcon
                                    className="fa-solid"
                                    icon={faMagnifyingGlass} />
                            </button>
                        </label>
                        </form>
                    </div>
                    <div className='nav-right'>
                        {sessionUser &&
                        <button
                            onClick={() => history.push('/upload')}
                            className='nav-bar-button nav-button'>
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