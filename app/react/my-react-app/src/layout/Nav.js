import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import logo from '../extra/images/planet-earth.svg';
import { setLoading } from '../actions/statesAction';

const initialState = false;
const Nav = props => {
    const {
        states: { loading },
        setLoading
    } = props;
    const history = useHistory();
    // const [stateLoading, setStateLoading] = useState(false);

    // const onHandleToggleLoading = onOff => {
    //     onOff ? setStateLoading(true) : setStateLoading(false);
    // };
    // let redirect;

    const handleRedirectHome = () => {
        setLoading(false);
        history.push('/');
    };
    const handleRedirectUpload = () => {
        setLoading(false);
        history.push('/upload');
    };
    let progressBar;
    loading
        ? (progressBar = <div className='progressBar loading'></div>)
        : (progressBar = <div className='progressBar'></div>);

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
            <button className='upload' onClick={() => handleRedirectUpload()}>
                Set your Eye
            </button>
        </section>
    );
};

const mapStateToProps = state => ({
    states: state.states
});

export default connect(mapStateToProps, { setLoading })(Nav);
