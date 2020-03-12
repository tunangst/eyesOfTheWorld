import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { register } from '../actions/userAction';

// import { userPostFetch } from '../actions/';

const initialState = {
    username: '',
    email: '',
    password: '',
    password2: '',
    avatar: ''
};
const Register = props => {
    const { register, isAuthenticated } = props;
    const [formData, setFormData] = useState(initialState);
    const { username, avatar, email, password, password2 } = formData;

    const onChange = element =>
        setFormData({
            ...formData,
            [element.target.name]: element.target.value
        });

    const onSubmit = async element => {
        element.preventDefault();
        if (password !== password2) {
            console.log('Passwords do not match');
        } else {
            console.log('register success');
            register({ username, email, password, avatar });
        }
    };
    if (isAuthenticated) {
        return <Redirect to='/' />;
    }
    return (
        <section className='register'>
            <h2>Sign Up</h2>
            <form
                action=''
                className='form'
                onSubmit={element => onSubmit(element)}
            >
                <input
                    type='text'
                    placeholder='Name'
                    name='username'
                    value={username}
                    onChange={element => onChange(element)}
                    required
                />
                <input
                    type='text'
                    name='avatar'
                    placeholder='Avatar (URL)'
                    value={avatar}
                    onChange={element => onChange(element)}
                />
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
                <input
                    type='password'
                    placeholder='Confirm Password'
                    name='password2'
                    value={password2}
                    onChange={element => onChange(element)}
                    minLength='6'
                />
                <input type='submit' className='submitBtn' value='Register' />
            </form>
            <p>
                Already have an account? <Link to='/login'>Sign In</Link>
            </p>
        </section>
    );
};

// const Register = props => {
//     const { state, setState } = useState(initState);
//     const { userPostFetch } = props;

//     const handleChange = event => {
//         setState({
//             [event.target.name]: event.target.value
//         });
//     };

//     const handleSubmit = event => {
//         event.preventDefault();
//         userPostFetch(state);
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <h1>Sign Up For An Account</h1>

//             <label>Username</label>
//             <input
//                 name='username'
//                 placeholder='Username'
//                 value={state.username}
//                 onChange={handleChange}
//             />
//             <br />

//             <label>Password</label>
//             <input
//                 type='password'
//                 name='password'
//                 placeholder='Password'
//                 value={state.password}
//                 onChange={handleChange}
//             />
//             <br />

//             <label>Avatar</label>
//             <input
//                 name='avatar'
//                 placeholder='Avatar (URL)'
//                 value={state.avatar}
//                 onChange={handleChange}
//             />
//             <br />

//             <label>Bio</label>
//             <textarea
//                 name='bio'
//                 placeholder='Bio'
//                 value={state.bio}
//                 onChange={handleChange}
//             />
//             <br />

//             <input type='submit' />
//         </form>
//     );
// };

// const mapDispatchToProps = dispatch => ({
//     userPostFetch: userInfo => dispatch(userPostFetch(userInfo))
// });
const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
});
export default connect(mapStateToProps, { register })(Register);
