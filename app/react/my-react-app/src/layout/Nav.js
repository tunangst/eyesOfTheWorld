import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import logo from '../extra/images/planet-earth.svg';
import { setLoading } from '../actions/statesAction';
// import client_id from '../extra/hiddenFolder/client_id';

// import GoogleLogin from 'react-google-login';

const Nav = props => {
    const {
        states: { loading },
        setLoading,
        user: { isAuthenticated }
    } = props;
    const history = useHistory();

    const handleRedirectHome = () => {
        setLoading(false);
        history.push('/');
    };
    const handleRedirectUpload = () => {
        setLoading(false);
        history.push('/upload');
    };
    const handleRedirectMyEyes = () => {
        setLoading(false);
        history.push('/myEyes');
    };
    // const responseGoogle = response => {
    //     console.log(response);
    // };
    let progressBar;
    loading
        ? (progressBar = <div className='progressBar loading'></div>)
        : (progressBar = <div className='progressBar'></div>);

    useEffect(() => {
        // console.log(client_id());
        // window.gapi.load('auth2', () => {
        //     this.auth2 = gapi.auth2.init({
        //         client_id: client_id
        //     });
        //     window.gapi.load('signin2', function() {
        //         // render a sign in button
        //         // using this method will show Signed In if the user is already signed in
        //         var opts = {
        //             width: 200,
        //             height: 50,
        //             onSuccess: this.onSuccess.bind(this)
        //         };
        //         gapi.signin2.render('loginButton', opts);
        //     });
        // });
    }, []);
    const authLinks = (
        <ul className='navLinks'>
            <li>
                <button
                    className='navBtns'
                    onClick={() => handleRedirectUpload()}
                >
                    Set your Eye
                </button>
            </li>
            <li>
                <button
                    className='navBtns'
                    onClick={() => handleRedirectMyEyes()}
                >
                    My Eyes
                </button>
            </li>
            <li>
                <button className='navBtns'>logout</button>
            </li>
        </ul>
    );
    const guestLinks = (
        <ul className='navLinks'>
            <li className='submitBtn'>
                <Link to='/register'>Register</Link>
            </li>
            <li className='submitBtn'>
                <Link to='/login'>Login</Link>
            </li>
        </ul>
    );

    return (
        <section className='nav'>
            {progressBar}
            <div className='logoContainer'>
                <img
                    className='logo'
                    src={logo}
                    alt='logo'
                    onClick={() => handleRedirectHome()}
                />
            </div>
            <h1 className='title'>Eyes of the World</h1>

            {isAuthenticated ? authLinks : guestLinks}
        </section>
    );
};

const mapStateToProps = state => ({
    states: state.states,
    user: state.user
});

export default connect(mapStateToProps, { setLoading })(Nav);
