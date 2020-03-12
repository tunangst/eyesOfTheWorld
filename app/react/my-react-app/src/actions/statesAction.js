// import axios from 'axios';

import {
    SET_LOADING,
    SUBMIT_READY_YES,
    SUBMIT_READY_NO,
    IMAGE_READY_YES,
    IMAGE_READY_NO
} from './types';

// export const findImage = () => async dispatch => {
//     console.log(`******** findImage function ***********`);
//     try {
//         const image = await axios.get(`/api/image/`);
//         const imageData = image.data;
//         console.log(image);
//         console.log(imageData);
//         // debugger;
//         dispatch({
//             type: GET_IMAGE_URL,
//             payload: imageData
//         });

//         // return imageData;
//     } catch (error) {
//         console.error(error);
//     }
// };

// export const submitImage = event => async dispatch => {
//     console.log(event);
//     event.preventDefault();

//     console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);

//     const config = {
//         headers: {
//             'Content-Type': 'multipart/form-data'
//         },
//         onUploadProgress: event => {
//             console.log(event.loaded, event.total);
//         }
//     };
//     try {
//         //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~image thing
//         const picForm = document.querySelector(`#picForm`);
//         let imageBody = new FormData(picForm);
//         const img = await axios.post('/api/image', imageBody, config);
//         // console.log(
//         //     `888888888888888888888img  ${img} gmi888888888888888888888`
//         // );
//         const imgUrl = img.data.imageUrl;
//         //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~image thing
//         //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~eye thing

//         let picCollection = [...imageBody];
//         const file = picCollection[0][1];
//         const fileInfo = {
//             name: file.name,
//             size: file.size / (1024 * 1024),
//             type: file.type
//         };

//         const infoForm = document.querySelector(`#infoForm`);
//         let infoBody = new FormData(infoForm);
//         infoBody.append('picName', fileInfo.name);
//         infoBody.append('picSize', fileInfo.size);
//         infoBody.append('picType', fileInfo.type);

//         infoBody.append('url', imgUrl);

//         const eye = await axios.post('/api/eyes/upload', infoBody, config);
//         dispatch({
//             type: SET_EYE,
//             payload: eye
//         });
//     } catch (err) {
//         console.log(err.message);
//     }
// };
export const setLoading = toggle => async dispatch => {
    dispatch({
        type: SET_LOADING,
        payload: toggle
    });
};

export const handleSubmitReady = toggle => async dispatch => {
    console.log(`calling handleSubmitReady`);
    if (toggle) {
        setLoading(false);
        dispatch({
            type: SUBMIT_READY_YES,
            payload: true
        });
    } else {
        dispatch({
            type: SUBMIT_READY_NO,
            payload: false
        });
    }
};

export const handleImageReady = toggle => async dispatch => {
    toggle
        ? dispatch({
              type: IMAGE_READY_YES,
              payload: true
          })
        : dispatch({
              type: IMAGE_READY_NO,
              payload: false
          });
};
