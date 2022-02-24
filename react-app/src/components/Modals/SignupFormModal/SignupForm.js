import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp, login } from '../../../store/session';


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
        // if (password === repeatPassword) {
            const data = await dispatch(signUp(username, email, password, repeatPassword));
            if (data) {
                setErrors(data)
            }
        // }
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
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div>
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
                    <button className="button_submit button_transfer" type="submit">Want to Login?</button>
                </form>
        </>
    )
}

export default SignupForm;
