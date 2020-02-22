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
    // const picSrc = document.querySelector(`.img1`).src;
    const picForm = document.querySelector(`#picForm`);
    const infoForm = document.querySelector(`#infoForm`);

    // let picFormData = new FormData(picForm);
    let picFormData = new FormData(picForm);
    // const pic = picFormData[0][1];
    // console.log(pic);
    let infoFormData = new FormData(infoForm);
    let picCollection = [...picFormData];
    let infoCollection = [...infoFormData];

    console.log(picCollection);
    // console.log(infoCollection);

    // let submitData = {};
    // let picObj = createTextImg(picCollection[0][1]);
    let infoSubmit = {};
    infoCollection.forEach(arr => {
        infoSubmit[arr[0]] = arr[1];
    });
    // submitData.pic = picSrc;

    // submitData.pic = picFormData;
    // submitData.info = infoFormData;
    // submitData.info = infoSubmit;

    const file = picCollection[0][1];
    console.log(file);
    let body = new FormData(infoForm);
    body.append('pic', file);
    // bodyFile.append('file')
    // console.log(bodyFile.file);

    // console.log(submitData);
    // debugger;
    //testing reading file
    // var file = picObj;
    // let bodyTest = [...body];
    // console.log(bodyTest);

    // var success = function(content) {
    //     console.log(JSON.stringify(content));
    // };

    // var fileReader = new FileReader();
    // fileReader.onload = function(evt) {
    //     success(evt.target.result);
    // };
    // fileReader.readAsText(file);
    // const body = {};

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    // const body = JSON.stringify(bodyFile);
    // console.log(body);
    try {
        // console.log(body);
        const res = await axios.post('/api/eyes/upload', body, config);
        console.log(res);
        // debugger;
    } catch (err) {
        console.error(err);
    }
};
export default submitImage;
// const submitImage = event => {
//     event.preventDefault();
//     const infoForm = document.querySelector(`#infoForm`);
//     // infoForm.preventDefault();
//     debugger;

//     const image = event.target[0].files[0];
//     console.log(image);
//     console.log(infoForm);

//     // const { name, email, password } = infoObj;
//     const config = {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     };
//     // const body = JSON.stringify({ name, email, password });
//     try {
//         // console.log(body);
//         // const res = await axios.post('/upload', body, config);
//         //         dispatch({
//         //             type: REGISTER_SUCCESS,
//         //             payload: res.data
//         //         });
//         //         dispatch(loadUser());
//     } catch (err) {
//         console.error(err);
//     }
// };
// export default submitImage;
