import axios from 'axios';

const getAllEyes = async () => {
    try {
        // debugger;
        const eyes = await axios.get('/api/eyes');
        const eyeData = eyes.data;
        eyeData.forEach(eye => console.log(eye));
        console.log('from getAllEyes: ');
        return eyes;
    } catch (error) {
        console.error(error);
    }
};

export default getAllEyes;
