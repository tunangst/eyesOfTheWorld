import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getUserAndEyes } from '../actions/userAction';
import BuildMyEyeCards from '../extra/utilityFunctions/BuildMyEyeCards';

const UserEyes = (props) => {
    const { getUserAndEyes, selectedUserEyes } = props;
    const userId = props.match.params.user;
    useEffect(() => {
        console.log('running useEffect in usereyespage');
        getUserAndEyes(userId);
    }, [getUserAndEyes, userId]);

    let cardList = [];
    if (selectedUserEyes.length > 0) {
        selectedUserEyes.forEach((eye) =>
            cardList.push(<BuildMyEyeCards key={eye._id} eye={eye} />)
        );
    }
    return (
        <section className='userEyes'>
            <div className='cardBox'>{cardList}</div>
        </section>
    );
};

const mapStateToProps = (state) => ({
    selectedUserEyes: state.user.selectedUserEyes,
    selectedUserObj: state.user.selectedUserObj,
});

export default connect(mapStateToProps, { getUserAndEyes })(UserEyes);
