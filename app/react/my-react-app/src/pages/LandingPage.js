import React, { useEffect, useState } from 'react';
// import axios from 'axios';

import getAllEyes from '../extra/apiCalls/getAllEyes';

const initialState = {
    collection: []
};
// import axios from 'axios'
const LandingPage = props => {
    const [state, setState] = useState(initialState);
    // useEffect(() => {
    //     const eyes = getAllEyes();
    //     console.log(eyes);
    //     setState({
    //         ...state,
    //         collection: eyes
    //     });
    // }, []);
    // getAllEyes();
    return (
        <section className='landing'>
            <div className='recentImgs'>
                <button onClick={() => getAllEyes()}>get all eyes</button>
            </div>
            <div className='worldMap'>
                {
                    // state.collection
                    // load the map with points here
                }
            </div>
        </section>
    );
};

export default LandingPage;
