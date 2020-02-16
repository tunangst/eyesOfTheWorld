import React, { useEffect } from 'react';

// let initialState = {
//     points: []
// }
// const fetchPoints = () => {
//     try {
//         const res = await axios.get('/allPoints');
//         return {

//         }
//     }
//     catch(err) {
//         console.log(err)
//     }
// }

// import axios from 'axios'
const LandingPage = props => {
    // export const getEyes = () => async dispatch => {
    //     try {
    //         const res = await axios.get('/');

    //         dispatch({
    //             type: GET_POSTS,
    //             payload: res.data
    //         });
    useEffect({
        // getEyes();
    });
    return (
        <section className='landing'>
            <div className='recentImgs'></div>
            <div className='worldMap'>
                {
                    // load the map with points here
                }
            </div>
        </section>
    );
};

export default LandingPage;
