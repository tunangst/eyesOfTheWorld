import axios from 'axios';

const getAllEyes = async () => {
    try {
        // debugger;
        const eyes = await axios.get('/api/eyes');
        const eyeData = eyes.data;
        console.log(eyeData);
        console.log('from getAllEyes: ^^^^^^^^^');
        return eyeData;
    } catch (error) {
        console.error(error);
    }
};

export default getAllEyes;
