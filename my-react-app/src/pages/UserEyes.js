import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getUserAndEyes } from '../actions/userAction';
import BuildEyeCards from '../extra/utilityFunctions/BuildEyeCards';
import UserBox from '../extra/utilityFunctions/UserBox';

const UserEyes = (props) => {
    const { getUserAndEyes, user } = props;
    const userId = props.match.params.user;
    const history = useHistory();
    if (user.isAuthenticated && user.userObj._id === user.selectedUserObj._id) {
        history.push(`/eyes/myUser/${user.userObj._id}`);
    }
    // console.log(selectedUserObj);
    useEffect(() => {
        console.log('running useEffect in usereyespage');
        getUserAndEyes(userId);
    }, [getUserAndEyes, userId]);

    let cardList = [];
    if (user.selectedUserEyes.length > 0) {
        user.selectedUserEyes.forEach((eye) =>
            cardList.push(<BuildEyeCards key={eye._id} eye={eye} />)
        );
    }
    return (
        <section className='userEyes'>
            <div className='userBox'>
                <UserBox
                    selectedUserObj={user.selectedUserObj}
                    enableBtn={false}
                />
            </div>
            <div className='cardBox'>{cardList}</div>
        </section>
    );
};

const mapStateToProps = (state) => ({
    user: state.user,
    selectedUserEyes: state.user.selectedUserEyes,
    selectedUserObj: state.user.selectedUserObj,
});

export default connect(mapStateToProps, { getUserAndEyes })(UserEyes);
