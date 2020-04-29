import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { setAlert } from '../actions/statesAction';
import { editProfile } from '../actions/userAction';

const initialFormState = {
    username: '',
    avatar: '',
    oldPassword: '',
    newPassword: '',
    newPassword2: '',
};

const Profile = ({ user: { userObj }, editProfile, setAlert }) => {
    const [formData, setFormData] = useState(initialFormState);
    const [imgState, setImgState] = useState(false);
    const history = useHistory();

    const {
        username,
        avatar,
        oldPassword,
        newPassword,
        newPassword2,
    } = formData;

    const onChange = (element) =>
        setFormData({
            ...formData,
            [element.target.name]: element.target.value,
        });

    const onSubmitUpdateProfile = async (element) => {
        element.preventDefault();
        // also check if old password is equal to entered old password
        if (newPassword !== newPassword2) {
            setAlert('Passwords do not match', 'error');
        } else {
            console.log('edit success');
            let updatedUser = {};
            if (username) updatedUser.username = username;
            if (newPassword) {
                updatedUser.oldPassword = oldPassword;
                updatedUser.newPassword = newPassword;
            }
            if (avatar) updatedUser.avatar = avatar;
            editProfile(updatedUser, userObj._id);
            // return <Redirect to='/' />;
            history.push('/');
        }
    };

    useEffect(() => {
        console.log('running useEffect in profile page');
        console.log(userObj.username);
        console.log(userObj.avatar);
        setFormData({
            username: userObj.username || '',
            avatar: userObj.avatar || '',
            oldPassword: '',
            newPassword: '',
            newPassword2: '',
        });
    }, [userObj]);

    if (imgState && avatar) console.log('image is true!!!!');
    if (!imgState && avatar) {
        console.log('image is false!!!!');
        setAlert('If image link is broken, avatar will be defaulted', 'error');
    }
    return (
        <section className='profile-form'>
            <div className='form-container'>
                <h2>Edit Credentials</h2>
                <form
                    autoComplete='off'
                    action=''
                    className='form'
                    onSubmit={(element) => onSubmitUpdateProfile(element)}
                >
                    <input
                        autoComplete='nickname'
                        type='text'
                        placeholder='Name'
                        name='username'
                        value={username}
                        onChange={(element) => onChange(element)}
                    />
                    <input
                        autoComplete='photo'
                        type='text'
                        name='avatar'
                        placeholder='Avatar (URL)'
                        value={avatar}
                        onChange={(element) => onChange(element)}
                    />

                    <input
                        autoComplete='current-password'
                        type='password'
                        placeholder='Old Password'
                        name='oldPassword'
                        value={oldPassword}
                        onChange={(element) => onChange(element)}
                        minLength='6'
                    />
                    <input
                        autoComplete='new-password'
                        type='password'
                        placeholder='New Password'
                        name='newPassword'
                        value={newPassword}
                        onChange={(element) => onChange(element)}
                        minLength='6'
                    />
                    <input
                        autoComplete='new-password'
                        type='password'
                        placeholder='Confirm New Password'
                        name='newPassword2'
                        value={newPassword2}
                        onChange={(element) => onChange(element)}
                        minLength='6'
                    />
                    <input
                        type='submit'
                        className='submitBtn'
                        value='Submit Change'
                    />
                </form>
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
    user: state.user,
});

//     user: {
//          userId: '',
//          userToken: localStorage.getItem('userToken'),
//          isAuthenticated: false,
//          userObj: {},
//          selectedUserEyes: [],
//          selectedUserObj: {}
//      },
export default connect(mapStateToProps, { setAlert, editProfile })(Profile);
