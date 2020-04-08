import axios from 'axios';

const getAllEyes = async () => {
    try {
        const eyes = await axios.get('/api/eyes');
        const eyeData = eyes.data;

        return eyeData;
    } catch (error) {
        console.error(error);
    }
};

export default getAllEyes;
