import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { register } from '../actions/userAction';
import { setAlert } from '../actions/statesAction';

// import { userPostFetch } from '../actions/';

const initialFormState = {
    username: '',
    email: '',
    password: '',
    password2: '',
    avatar: '',
};
const Register = (props) => {
    const { register, setAlert, isAuthenticated } = props;
    const [formData, setFormData] = useState(initialFormState);
    const [imgState, setImgState] = useState(false);
    const { username, avatar, email, password, password2 } = formData;

    const onChange = (element) =>
        setFormData({
            ...formData,
            [element.target.name]: element.target.value,
        });

    const onSubmit = async (element) => {
        element.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'error');
            // console.log('Passwords do not match');
        } else {
            console.log('register success');
            register({ username, email, password, avatar }, imgState);
        }
    };
    if (isAuthenticated) {
        return <Redirect to='/' />;
    }

    if (imgState && avatar) console.log('image is true!!!!');
    if (!imgState && avatar) {
        console.log('image is false!!!!');
        // setAlert('If image link is broken, avatar will be defaulted', 'error');
    }
    return (
        <section className='login-register'>
            <div className='form-container'>
                <h2>Sign Up</h2>
                <form
                    action=''
                    className='form'
                    onSubmit={(element) => onSubmit(element)}
                >
                    <input
                        type='text'
                        placeholder='Name'
                        name='username'
                        value={username}
                        onChange={(element) => onChange(element)}
                        required
                    />
                    <input
                        type='text'
                        name='avatar'
                        placeholder='Avatar (URL)'
                        value={avatar}
                        onChange={(element) => onChange(element)}
                    />
                    <input
                        type='email'
                        placeholder='Email Address'
                        name='email'
                        value={email}
                        onChange={(element) => onChange(element)}
                        required
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={(element) => onChange(element)}
                        minLength='6'
                    />
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        name='password2'
                        value={password2}
                        onChange={(element) => onChange(element)}
                        minLength='6'
                    />
                    <input
                        type='submit'
                        className='submitBtn'
                        value='Register'
                    />
                </form>
                <p>
                    Already have an account? <Link to='/login'>Sign In</Link>
                </p>
                <div className='editAvatar'>
                    <img
                        src={avatar}
                        alt='avatar preview broken'
                        onLoad={() => setImgState(true)}
                        onError={() => setImgState(false)}
                    />
                </div>
            </div>
        </section>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated,
});
export default connect(mapStateToProps, { register, setAlert })(Register);
