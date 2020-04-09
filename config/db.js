const mongoose = require('mongoose');
const config = require('config');
console.log('NODE_ENV: ' + config.util.getEnv('NODE_ENV'));

let dbURI = process.env.MONGO_URI;
if (config.util.getEnv('NODE_ENV') === 'development') {
    dbURI = config.get('mongoURI');
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// const connectDB = async () => {
//     try {
//         await mongoose.connect(db, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useCreateIndex: true,
//             useFindAndModify: false
//         });
//         console.log('DB Connected');
//     } catch (error) {
//         console.error(error.message);
//         process.exit(1);
// };
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
};

// let gfs;
const connectDB = async () => {
    // let dbURI = process.env.MONGO_URI;
    // console.log(dbURI);
    // console.log(process.env.NODE_ENV);
    // console.log(process.env);
    if (process.env.NODE_ENV === 'development') {
        dbURI = config.get('mongoURI');
    }
    try {
        // let conn = mongoose.connection;
        // let conn = await mongoose.createConnection(dbURI, options);
        await mongoose.connect(dbURI, options);
        // await mongoose.createConnection(dbURIPic, options);
        console.log(process.env.MONGO_URI, 'mongoURI');
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;
// module.exports = connectDB;
