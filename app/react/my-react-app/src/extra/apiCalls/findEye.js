import axios from 'axios';

const findEye = async eyeId => {
    console.log(`******** findEye function ***********`);
    try {
        const eye = await axios.get(`/api/eyes/${eyeId}`);
        // const image = await axios.get(`/api/images/${eyeId}`);
        const eyeData = eye.data;
        // console.log(eye);
        // console.log(eyeData);

        return eyeData;
    } catch (error) {
        console.error(error);
    }
};

export default findEye;
