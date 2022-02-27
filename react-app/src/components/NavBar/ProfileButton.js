import { useState, useEffect } from "react";
import { useHistory, Link} from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    return history.push('/songs');
  };

  return (
    <>
      <button className={showMenu ? 'profile-dropdown-button nav-button open-dropdown-button' : 'profile-dropdown-button nav-button'} onClick={openMenu}>
        <div>
          {user.display_name ? user.display_name : user.username }
          <FontAwesomeIcon className="down-caret" icon={faAngleDown} />
        </div>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          {/* <li>
            <Link to='/profile'>My Profile</Link>
          </li> */}
          <li>
            <button id="nav-logout" onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  )
}

export default ProfileButton;
