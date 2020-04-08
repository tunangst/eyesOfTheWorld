// const aws = require('aws-sdk');
// const config = require('config');
// const secretKey = config.get('secretAccessKey');
// const accessKey = config.get('accessKeyId');
// const region = config.get('region');
// const bucket = config.get('AWSBucketName');

// aws.config.update({
//     secretAccessKey: secretKey,
//     accessKeyId: accessKey,
//     region: region
// });
// const s3 = new aws.S3();

// const deleteImg = async imgKey => {
//     console.log(`((((((((((((()((((((((((()))))((()))))))))))))))))))))`);
//     // const split = url.split('.com/');
//     // const key = split[split.length - 1];
//     // console.log(split);
//     console.log(imgKey, 'inside delete');

//     const params = {
//         Bucket: bucket,
//         Delete: {
//             Objects: [{ Key: 'asdfklj' }]
//         }
//     };

//     let answer = {
//         msg: '',
//         type: ''
//     };

//     s3.deleteObjects(params, function(err, data) {
//         if (err) {
//             // an error occurred
//             console.log(err, err.stack, 'error');
//             answer.msg = err.stack[0];
//             answer.type = 'error';
//             // return { msg: err.stack, type: 'error' };
//         } else {
//             // successful response
//             console.log(data, 'data');
//             answer.msg = 'Image removed ;^[';
//             answer.type = 'success';
//             // return { msg: 'Image removed ;^[', type: 'success' };
//         }
//     });

//     return answer;
// };
// const deleteImg = imgKey => {
//     console.log(`((((((((((((()((((((((((()))))((()))))))))))))))))))))`);
//     // const split = url.split('.com/');
//     // const key = split[split.length - 1];
//     // console.log(split);
//     console.log(imgKey);
//     s3.deleteObject(
//         {
//             Bucket: bucket,
//             Key: imgKey
//         },
//         // {
//         //     Bucket: bucket,
//         //     Key: 'some/eyesontheworld-image-uploads/' + key'
//         // },
//         function(err, data) {
//             console.log('inside the deleteImg function');
//             console.log(err);
//             console.log(data);
//             if (err) {
//                 console.log('error, error deleteImg eerror');
//                 console.log(err, err.stack);
//                 return false;
//             } else {
//                 console.log(data);
//                 console.log('returning true');
//                 return true;
//             }
//         }
//     );
// };

// module.exports = deleteImg;

// s3://eyesontheworld-image-uploads/2020-03-05T21:42:58.037Z_,-^-,_cycling.jpg
