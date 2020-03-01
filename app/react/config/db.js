const mongoose = require('mongoose');
const config = require('config');

const dbURI = config.get('mongoURI');

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
    useUnifiedTopology: true
};

// let gfs;
const connectDB = async () => {
    try {
        // let conn = mongoose.connection;
        // let conn = await mongoose.createConnection(dbURI, options);
        await mongoose.connect(dbURI, options);
        // await mongoose.createConnection(dbURIPic, options);

        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;
// module.exports = connectDB;
