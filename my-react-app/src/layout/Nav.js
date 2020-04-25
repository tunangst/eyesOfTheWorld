import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import logo from '../extra/images/planet-earth.svg';
import { setLoading } from '../actions/statesAction';
import { logout } from '../actions/userAction';
import { toggleAvatarMenu } from '../actions/tabsAction';
// import client_id from '../extra/hiddenFolder/client_id';
// import GoogleLogin from 'react-google-login';

const Nav = (props) => {
    const {
        states: { loading },
        isAuthenticated,
        user: { userObj },
        setLoading,
        tabs: { avatarMenu },
        toggleAvatarMenu,
        logout,
        // user: { isAuthenticated, user }
    } = props;

    const history = useHistory();

    // useEffect(() => {
    //     console.log('useEffect in nav');
    //     if (nameState !== userObj.username) {
    //         getUser(userObj._id);
    //         setNameState(userObj._id);
    //     }
    // }, [nameState]);

    const handleRedirectHome = () => {
        setLoading(false);
        history.push('/');
    };
    const handleRedirectUpload = () => {
        setLoading(false);
        history.push('/upload');
    };
    const handleRedirectMyUserEyes = (userId) => {
        setLoading(false);
        history.push(`/eyes/myUser/${userId}`);
    };
    const handleProfile = (userId) => {
        setLoading(false);
        history.push(`/user/${userId}`);
    };

    const handleLogout = () => {
        // console.log('handleLogout');
        logout();
        history.push('/');
    };
    // let progressBar;
    // loading
    //     ? (progressBar = <div className='progressBar loading'></div>)
    //     : (progressBar = <div className='progressBar'></div>);
    let logoToggle;
    loading
        ? (logoToggle = (
              <img
                  className='logo spinning'
                  src={logo}
                  alt='logo'
                  onClick={() => handleRedirectHome()}
              />
          ))
        : (logoToggle = (
              <img
                  className='logo'
                  src={logo}
                  alt='logo'
                  onClick={() => handleRedirectHome()}
              />
          ));

    const authLinks = (
        <ul className='navLinks'>
            <li>
                <button className='btns' onClick={() => handleRedirectUpload()}>
                    Set your Eye
                </button>
            </li>
            <li>
                <button
                    className='btns'
                    onClick={() => handleRedirectMyUserEyes(userObj._id)}
                >
                    My Eyes
                </button>
            </li>

            <li className='avatar' onClick={() => toggleAvatarMenu('toggle')}>
                <img src={userObj.avatar} alt='avatar' />
                <p className='name'>{userObj.username}</p>
                {avatarMenu && (
                    <ul className='dropMenu'>
                        <li onClick={() => handleProfile(userObj._id)}>
                            <p className='dropText'>Edit Profile</p>
                        </li>
                        <li onClick={() => handleLogout()}>
                            <p className='dropText'>Logout</p>
                        </li>
                    </ul>
                )}
            </li>
        </ul>
    );
    const guestLinks = (
        <ul className='navLinks'>
            <li className='navBtns'>
                <Link to='/register' className='btns'>
                    Register
                </Link>
            </li>
            <li className='navBtns'>
                <Link to='/login' className='btns'>
                    Login
                </Link>
            </li>
        </ul>
    );

    return (
        <section className='nav'>
            <div className='logoContainer'>{logoToggle}</div>
            <h1 className='title'>Eyes of the World</h1>

            {isAuthenticated ? authLinks : guestLinks}
        </section>
    );
};

const mapStateToProps = (state) => ({
    states: state.states,
    isAuthenticated: state.user.isAuthenticated,
    user: state.user,
    tabs: state.tabs,
});

export default connect(mapStateToProps, {
    setLoading,
    logout,
    toggleAvatarMenu,
})(Nav);
