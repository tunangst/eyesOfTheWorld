import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { login } from '../actions/userAction';

// import { userPostFetch } from '../actions/';

const initialState = {
    email: '',
    password: ''
};
const Login = props => {
    const { login, isAuthenticated } = props;
    const [formData, setFormData] = useState(initialState);
    const { email, password } = formData;

    const onChange = element =>
        setFormData({
            ...formData,
            [element.target.name]: element.target.value
        });

    const onSubmit = async element => {
        element.preventDefault();
        login(email, password);
    };
    if (isAuthenticated) {
        return <Redirect to='/' />;
    }
    return (
        <section className='login-register'>
            <div className='form-container'>
                <h2>Sign In</h2>
                <form
                    action=''
                    className='form'
                    onSubmit={element => onSubmit(element)}
                >
                    <input
                        type='email'
                        placeholder='Email Address'
                        name='email'
                        value={email}
                        onChange={element => onChange(element)}
                        required
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={element => onChange(element)}
                        minLength='6'
                    />
                    <input type='submit' className='submitBtn' value='Login' />
                </form>
                <p>
                    Already have an account? <Link to='/register'>Sign Up</Link>
                </p>
            </div>
        </section>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
});
export default connect(mapStateToProps, { login })(Login);
