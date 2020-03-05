import React from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../extra/images/planet-earth.svg';

const Nav = props => {
    const history = useHistory();
    const handleRedirectHome = () => {
        history.push(`/`);
    };
    const handleRedirectUpload = () => {
        history.push(`/upload`);
    };
    return (
        <section className='nav'>
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

export default Nav;
