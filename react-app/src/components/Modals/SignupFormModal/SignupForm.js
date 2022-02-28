import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp, login } from '../../../store/session';
import LoginFormModal from '../LoginFormModal';
import LoginForm from '../LoginFormModal/LoginForm';


const SignupForm = () => {
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onSignUp = async (e) => {
        e.preventDefault();
        const signupErrors = {};
        if (repeatPassword !== password) {
            signupErrors.passwordMismatch = "Passwords do not match!"
        }
        if (username.length > 255) {
            signupErrors.usernameLength = "Username is too long."
        }
        if (username.length === 0) {
            signupErrors.usernameLength = "Username must not be empty."
        }
        if (Object.values(signupErrors).length > 0) {
            setErrors(signupErrors);
        } else {
            if (password === repeatPassword) {
                const data = await dispatch(signUp(username, email, password, repeatPassword));
                if (data) {
                    console.log("NIGGAAA")
                    setErrors(data);
                    console.log(data)
                }
            }
        }
    }

    const updateUsername = (e) => {
        setUsername(e.target.value);
    }

    const updateEmail = (e) => {
        setEmail(e.target.value);
    }

    const updatePassword = (e) => {
        setPassword(e.target.value);
    }

    const updateRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
    }

    const DemoLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login('demo@aa.io', 'password'));
        if (data) {
        setErrors(data);
        }
      }
      const handleRedirect = (e) => {
        e.preventDefault();
        setShowModal(false);
        history.push('/login');
    }

    useEffect(() => {
        if (user) {
            <Redirect to='/' />
        };
    }, [user]);

    return (
        <>
            <form
            className="main_modal"
            onSubmit={onSignUp}>
                <div className='modal_ul_errors'>
                    {errors?.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div>
                {/* {errors ? <div>{errors.usernameLength}</div> : null} */}
                    <label htmlFor='username'>
                        <input
                            id='username'
                            type="text"
                            value={username}
                            onChange={updateUsername}
                            placeholder='Username'
                            required
                        />
                    </label>
                    <label htmlFor='email'>
                        <input
                            id='email'
                            type="text"
                            value={email}
                            onChange={updateEmail}
                            placeholder='Email'
                            required
                        />
                    </label>
                    {/* {errors ? <div>{errors.passwordMismatch}</div> : null} */}
                    <label htmlFor='password'>
                        <input
                            id='password'
                            type="password"
                            value={password}
                            onChange={updatePassword}
                            placeholder='Password'
                            required
                        />
                    </label>
                    <label htmlFor='confirm-password'>
                        <input
                            id='confirm-password'
                            type="password"
                            value={repeatPassword}
                            onChange={updateRepeatPassword}
                            placeholder='Confirm Password'
                            required
                        />
                    </label>
                    <button className="button_submit button_main" type="submit">Sign Up</button>
                </div>
            </form>
            <hr className="hrmodal"/>
                <form onSubmit={DemoLogin}>
                    <button className="button_submit button_secondary"type="submit">Demo User</button>
                </form>
                <form onSubmit={handleRedirect}>
                    {/* <button className="button_submit button_transfer" type="submit">Want to Login?</button> */}
                    {/* <LoginFormModal /> */}
                </form>
        </>
    )
}

export default SignupForm;
