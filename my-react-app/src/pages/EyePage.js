import React, { useEffect } from 'react';
// import { useAsyncEffect } from 'use-async-effect';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { setLocal } from '../actions/statesAction';
import { findEye } from '../actions/eyeAction';
import BuildInputField from '../extra/utilityFunctions/BuildInputField';
// import SuggestionBar from '../layout/SuggestionBar';
import { setName } from '../extra/utilityFunctions/utilities';
import { getUser } from '../actions/userAction';

const EyePage = (props) => {
    const { eye, eyes, user, findEye, setLocal, getUser } = props;
    const id = props.match.params.id;
    const history = useHistory();

    let slicedEyes = null;
    if (eyes.length > 0) {
        const sliceSize = 3;
        slicedEyes = eyes.slice(0, sliceSize);
    }
    const handleGoToEyes = (userId) => {
        console.log(userId);
        history.push(`/eyes/user/${userId}`);
    };
    const init = async () => {
        await findEye(id);
        await getUser(eye.user);
    };

    useEffect(() => {
        console.log('running useEffect in eyepage');
        setLocal(true);
        findEye(id);
        if (
            (eye && user && eye.user !== user.selectedUserObj._id) ||
            (eye && !user)
        ) {
            getUser(eye.user);
        }
    }, [id, eye.user]);

    const filename = eye.pic.name;
    const name = setName(filename);

    let inputs = [];
    if (eye.info) {
        inputs = Object.entries(eye.info).map(([key, value]) => {
            if (key === 'width' && value !== '???') {
                return (
                    <BuildInputField
                        key={key}
                        field={key}
                        value={eye.info[key]}
                        fieldHeight={'height'}
                        valueHeight={eye.info.height}
                    />
                );
            } else if (
                key === 'height' ||
                value === '???' ||
                value === undefined
            ) {
                return null;
            } else {
                return (
                    <BuildInputField
                        key={key}
                        field={key}
                        value={eye.info[key]}
                    />
                );
            }
        });
    }

    return (
        <section className='eyeContainer'>
            <main className='eye'>
                <div className='userBox'>
                    <img
                        className='avatar'
                        src={user.selectedUserObj.avatar}
                        alt='User Avatar'
                    />
                    <div className='textContainer'>
                        <h2 className='username'>
                            {user.selectedUserObj.username}
                        </h2>
                        <p
                            className='eyeBtn btns'
                            onClick={() =>
                                handleGoToEyes(user.selectedUserObj._id)
                            }
                        >
                            see other eyes
                        </p>
                    </div>
                </div>
                <div className='picBox'>
                    <img src={eye.url} alt={eye.pic.name}></img>
                </div>
                <div className='infoBox'>
                    <h2 className='title'>{name}</h2>
                    {inputs}
                </div>
            </main>
        </section>
    );
};

const mapStateToProps = (state) => ({
    eye: state.eye,
    eyes: state.eyes,
    user: state.user,
});

export default connect(mapStateToProps, {
    findEye,
    setLocal,
    getUser,
})(EyePage);
