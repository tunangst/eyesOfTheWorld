import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';

const UserBox = ({ selectedUserObj, enableBtn }) => {
    const history = useHistory();

    const handleGoToEyes = (userId) => {
        console.log(userId);
        history.push(`/eyes/user/${userId}`);
    };
    let title = selectedUserObj.username;
    if (!enableBtn) title = `${selectedUserObj.username}'s Eyes`;

    return (
        <Fragment>
            <img
                className='avatar'
                src={selectedUserObj.avatar}
                alt='User Avatar'
            />
            <div className='textContainer'>
                <h2 className='username'>{title}</h2>
                {enableBtn && (
                    <p
                        className='eyeBtn btns'
                        onClick={() => handleGoToEyes(selectedUserObj._id)}
                    >
                        see other eyes
                    </p>
                )}
            </div>
        </Fragment>
    );
};
export default UserBox;
