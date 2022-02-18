import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../../store/session';

function LoginForm() {
    const history = useHistory()
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const onLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
        setErrors(data);
        }
    };

    const updateEmail = (e) => {
    setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

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
        history.push('/signup')
    }
    return (
        <>
            <form onSubmit={onLogin}>
                <div className='modal_ul_errors'>
                    {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                    ))}
                </div>

                <label>
                    <input
                        id='email'
                        type="text"
                        value={email}
                        onChange={updateEmail}
                        placeholder='Email'
                        required
                    />
                </label>
                <label>
                    <input
                        id='password'
                        type="password"
                        value={password}
                        onChange={updatePassword}
                        placeholder='Password'
                        required
                    />
                </label>
                <button className="button_submit button_main" type="submit">Log In</button>
            </form>
            <hr className="hrmodal"/>
            <form  onSubmit={DemoLogin}>
                <button className="button_submit button_secondary"type="submit">Demo User</button>
            </form>
            <form onSubmit={handleRedirect}>
                <button className="button_submit button_transfer" type="submit">Want to Sign Up?</button>
            </form>
        </>
    );
}


export default LoginForm;
