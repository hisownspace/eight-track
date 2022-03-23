import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../../store/session';

function LoginForm() {
    const history = useHistory()
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const onLogin = async (e) => {
        
        e.preventDefault();
        const data = await dispatch(login(username, password));
        if (data) {
            if (data.username) {
                // delete data.password;
            }
            setErrors(data);
        }
    };

    const updateEmail = (e) => {
    setUsername(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const DemoLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login('Demo', 'password'));
        if (data) {
        setErrors(data);
        }
      }

    const handleRedirect = (e) => {
        e.preventDefault();
        setShowModal(false);
        history.push('/signup');
    }
    return (
        <>
            <form onSubmit={onLogin}>
                <div className='modal_ul_errors'>
                </div>
                <label>
                    <input
                        id='username'
                        type="text"
                        value={username}
                        onChange={updateEmail}
                        placeholder='Enter Username or Email'
                        // required
                        autoComplete='username'
                        />
                        <div className='form-errors'>
                            {errors.username}
                        </div>
                </label>
                <div className='modal_ul_errors'>
                </div>
                <label>
                    <input
                        id='password'
                        type="password"
                        value={password}
                        onChange={updatePassword}
                        placeholder='Password'
                        // required
                        // readOnly={true}
                        autoComplete="current-password"
                        />
                        <div className='form-errors'>
                            {errors.password}
                        </div>
                </label>
                <button className="button_submit button_main" type="submit">Log In</button>
            </form>
            <hr className="hrmodal"/>
            <form  onSubmit={DemoLogin}>
                <button className="button_submit button_secondary" type="submit">Demo User</button>
            </form>
            <form onSubmit={handleRedirect}>
                {/* <button className="button_submit button_transfer" type="submit">Want to Sign Up?</button> */}

            </form>
        </>
    );
}


export default LoginForm;
