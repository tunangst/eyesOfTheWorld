import axios from 'axios';

const submitImage = event => {
    event.preventDefault();
    const picForm = document.querySelector(`#picForm`);
    const infoForm = document.querySelector(`#infoForm`);

    let picFormData = new FormData(picForm);
    let infoFormData = new FormData(infoForm);
    let picCollection = [...picFormData];
    let infoCollection = [...infoFormData];

    console.log(picCollection);
    console.log(infoCollection);

    let submitData = {};
    let picObj = picCollection[0][1];
    let infoSubmit = {};
    infoCollection.forEach(arr => {
        infoSubmit[arr[0]] = arr[1];
    });
    submitData.pic = picObj;
    submitData.info = infoSubmit;

    console.log(submitData);

    debugger;

    const image = event.target[0].files[0];

    // const { name, email, password } = infoObj;
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    // const body = JSON.stringify({ name, email, password });
    try {
        // console.log(body);
        // const res = await axios.post('/upload', body, config);
        //         dispatch({
        //             type: REGISTER_SUCCESS,
        //             payload: res.data
        //         });
        //         dispatch(loadUser());
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
