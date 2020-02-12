import React from 'react';

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

const LandingPage = props => {
    return (
        <section className='landing'>
            <div className='recentImgs'></div>
            <div className='worldMap'></div>
        </section>
    );
};

export default LandingPage;
