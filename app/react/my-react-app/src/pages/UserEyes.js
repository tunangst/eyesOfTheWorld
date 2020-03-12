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
    let eyesBuild = [];
    if (selectedUserEyes.length > 0) {
        selectedUserEyes.forEach(eye => {
            eyesBuild.push(<p>{eye.pic.name}</p>);
        });
        console.log(eyesBuild);
    }

    // console.log(`in the eye's page`);
    return (
        <section className='userEyes'>{eyesBuild}</section>
        //     <section className='eyeContainer'>
        //         <aside className='closeTo'>
        //             {
        //                 // <button onClick={() => getAllEyes()}>get all eyes</button>
        //             }
        //         </aside>
        //         <main className='eye'>
        //             <div className='picBox'>
        //                 <img src={eye.url}></img>
        //             </div>
        //             <div className='infoBox'>
        //                 <h1 className='title'>{eye.pic.name}</h1>
        //                 {inputs}
        //             </div>
        //         </main>
        //     </section>
    );
};

const mapStateToProps = state => ({
    selectedUserEyes: state.user.selectedUserEyes,
    selectedUserObj: state.user.selectedUserObj
});

export default connect(mapStateToProps, { getUserAndEyes })(UserEyes);
