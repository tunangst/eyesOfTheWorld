import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import useAsyncEffect from 'use-async-effect';

import { findEye } from '../actions/eyeAction';
// import findEye from '../extra/apiCalls/findEye';
// import findImage from '../extra/apiCalls/findImage';
import BuildInputField from '../extra/utilityFunctions/BuildInputField';
// import findUserEyes from '../extra/apiCalls/findUserEyes';
// import findUser from '../extra/apiCalls/findUser';
import { getUserAndEyes } from '../actions/userAction';
import BuildEyeCards from '../extra/utilityFunctions/BuildEyeCards';
import moment from 'moment';

// const initialState = {
//     user: null,
//     eyes: []
// };
const UserEyes = props => {
    const { getUserAndEyes, selectedUserEyes, selectedUserObj } = props;
    // const [eyesData, setEyesData] = useState(initialState);
    // const { user } = props;

    // console.log(userId);
    console.log(selectedUserEyes);
    console.log(selectedUserObj);
    useEffect(() => {
        const userId = props.match.params.user;

        getUserAndEyes(userId);

        // const foundUser = finduser();
        // const foundUserEyes = findusereyes();
        // console.log(foundUser);
        // console.log(foundUserEyes);
        // setEyesData({
        //     ...eyesData,
        //     user: foundUser,
        //     eyes: foundUserEyes
        // });
    }, []);
    // console.log(eyesData);
    // if (eyesData) console.log(eyesData);

    // let inputs = [];
    // console.log(eye);
    // if (eye.info) {
    //     inputs = Object.entries(eye.info).map(([key, value]) => {
    //         if (key === 'width' && value !== '???') {
    //             return (
    //                 <BuildInputField
    //                     key={key}
    //                     field={key}
    //                     value={eye.info[key]}
    //                     fieldHeight={'height'}
    //                     valueHeight={eye.info.height}
    //                 />
    //             );
    //         } else if (
    //             key === 'height' ||
    //             value === '???' ||
    //             value === undefined
    //         ) {
    //             return null;
    //         } else {
    //             return (
    //                 <BuildInputField
    //                     key={key}
    //                     field={key}
    //                     value={eye.info[key]}
    //                 />
    //             );
    //         }
    //     });
    // }
    let cardList = [];
    if (selectedUserEyes.length > 0) {
        selectedUserEyes.forEach(eye =>
            cardList.push(<BuildEyeCards key={eye._id} eye={eye} />)
        );
    }
    return <section className='userEyes'>{cardList}</section>;
};

const mapStateToProps = state => ({
    selectedUserEyes: state.user.selectedUserEyes,
    selectedUserObj: state.user.selectedUserObj
});

export default connect(mapStateToProps, { getUserAndEyes })(UserEyes);
