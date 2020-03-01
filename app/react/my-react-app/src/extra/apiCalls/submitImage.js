import axios from 'axios';

const createTextImg = imgObj => {
    let textImg = {
        lastModified: imgObj.lastModified,
        name: imgObj.name,
        size: imgObj.size,
        type: imgObj.type,
        webkitRelativePath: imgObj.webkitRelativePath
    };
    return textImg;
};

const submitImage = async event => {
    event.preventDefault();

    // console.log(file);
    console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    const configInfo = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    // const body = JSON.stringify(bodyFile);
    // console.log(body);
    try {
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~image thing
        const picForm = document.querySelector(`#picForm`);
        let imageBody = new FormData(picForm);

        const img = await axios.post('/api/image', imageBody, config);
        // console.log(
        //     `888888888888888888888img  ${img} gmi888888888888888888888`
        // );
        const imgUrl = img.data.imageUrl;
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~image thing
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~eye thing

        let picCollection = [...imageBody];
        const file = picCollection[0][1];
        const fileInfo = {
            name: file.name,
            size: file.size / (1024 * 1024),
            type: file.type
        };

        // console.log(fileInfo);

        const infoForm = document.querySelector(`#infoForm`);
        let infoBody = new FormData(infoForm);
        infoBody.append('picName', fileInfo.name);
        infoBody.append('picSize', fileInfo.size);
        infoBody.append('picType', fileInfo.type);

        infoBody.append('url', imgUrl);

        // const testSee = [...infoBody];
        // console.log(testSee);
        // const jsontest = testSee.json();
        // console.log(jsontest);
        // debugger;
        const eye = await axios.post('/api/eyes/upload', infoBody, config);
        // console.log(eye);
        // debugger;
    } catch (err) {
        console.error(err);
    }
};
export default submitImage;
