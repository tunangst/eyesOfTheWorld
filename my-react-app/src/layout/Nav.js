import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link, Redirect } from 'react-router-dom';
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
    useEffect(() => {
        console.log('useEffect in nav');
    }, []);

    const handleRedirectHome = () => {
        setLoading(false);
        history.push('/');
    };
    const handleRedirectUpload = () => {
        setLoading(false);
        history.push('/upload');
    };
    const handleRedirectUserEyes = (userId) => {
        setLoading(false);
        history.push(`/eyes/user/${userId}`);
    };
    const handleProfile = (userId) => {
        setLoading(false);
        history.push(`/user/${userId}`);
    };

    const handleLogout = () => {
        // console.log('handleLogout');
        logout();
        return <Redirect to='/' />;
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
            <li className='navBtns'>
                <button onClick={() => handleRedirectUpload()}>
                    Set your Eye
                </button>
            </li>
            <li className='navBtns'>
                <button onClick={() => handleRedirectUserEyes(userObj._id)}>
                    My Eyes
                </button>
            </li>
            <li className='navBtns'>
                <button onClick={() => handleLogout()}>logout</button>
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
                <Link to='/register'>Register</Link>
            </li>
            <li className='navBtns'>
                <Link to='/login'>Login</Link>
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
