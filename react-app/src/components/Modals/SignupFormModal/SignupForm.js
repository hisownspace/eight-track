import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp, login } from '../../../store/session';
import validator from 'email-validator'



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

    const onSignUp = (e) => {
        e.preventDefault();
        const signupErrors = {};

        if (password.length === 0) {
            signupErrors.passwordLength = "Please provide a password."
        }
        else if (repeatPassword.length === 0) {
            signupErrors.repeatPasswordLength = "Please confirm password your password."
        }
        if (repeatPassword !== password) {
            signupErrors.passwordMismatch = "Passwords do not match!"
        }
        if (username.length > 255) {
            signupErrors.usernameLength = "Username is too long."
        }
        if (username.length === 0) {
            signupErrors.usernameLength = "Username must not be empty."
        }
        if (email.length === 0) {
            signupErrors.emailLength = "Email must not be empty."
        }
        else if (!validator.validate(email)) {
            signupErrors.emailValid = "Please provide a valid email address."
        }
        if (Object.values(signupErrors).length > 0) {
            setErrors(signupErrors);
        } else {
            if (password === repeatPassword) {
                const data = dispatch(signUp(username, email, password, repeatPassword));
                if (data) {
                    setErrors(data);
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
                <div>
                    <label htmlFor='username'>
                        <input
                            id='username'
                            type="text"
                            value={username}
                            onChange={updateUsername}
                            placeholder='Username'
                            autoComplete='username'
                        />
                    </label>
                    <div className='form-errors'>
                        {errors ? <div>{errors.username}</div> : null}
                        {errors ? <div>{errors.usernameLength}</div> : null}
                    </div>
                    <label htmlFor='email'>
                        <input
                            id='email'
                            type="text"
                            value={email}
                            onChange={updateEmail}
                            placeholder='Email'
                            autoComplete='email'
                        />
                    </label>
                    <div className='form-errors'>
                        {errors ? <div>{errors.email}</div> : null}
                        {errors ? <div>{errors.emailLength}</div> : null}
                        {errors ? <div>{errors.emailValid}</div> : null}
                    </div>
                    <label htmlFor='password'>
                        <input
                            id='password'
                            type="password"
                            value={password}
                            onChange={updatePassword}
                            placeholder='Password'
                            autoComplete='new-password'
                        />
                    </label>
                    <div className='form-errors'>
                        {errors ? <div>{errors.passwordLength}</div> : null}
                        {errors ? <div>{errors.passwordMismatch}</div> : null}
                    </div>
                    <label htmlFor='confirm-password'>
                        <input
                            id='confirm-password'
                            type="password"
                            value={repeatPassword}
                            onChange={updateRepeatPassword}
                            placeholder='Confirm Password'
                            autoComplete='new-password'
                        />
                    </label>
                    <div className='form-errors'>
                        {errors ? <div>{errors.repeatPasswordLength}</div> : null}
                    </div>
                    <button className="button_submit button_main" type="submit">Sign Up</button>
                </div>
            </form>
            <hr className="hrmodal"/>
                <form onSubmit={DemoLogin}>
                    <button className="button_submit button_secondary"type="submit">Demo User</button>
                </form>
                <form onSubmit={handleRedirect}>
                </form>
        </>
    )
}

export default SignupForm;
