import axios from 'axios';

const submitImage = infoObj => {
    console.log(infoObj)
        const { name, email, password } = infoObj;
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ name, email, password });
        try {
            const res = await axios.post('/upload', body, config);
    //         dispatch({
    //             type: REGISTER_SUCCESS,
    //             payload: res.data
    //         });
    //         dispatch(loadUser());
        } catch (err) {
            console.error(err)
        }
        
};
export default submitImage;
