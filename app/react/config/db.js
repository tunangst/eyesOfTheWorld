const mongoose = require('mongoose');
const config = require('config');
const multer = require('multer');
const Grid = require('gridfs-stream');

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

let gfs;
const connectDB = async () => {
    await mongoose.connect(dbURI, options);
    let conn = await mongoose.createConnection(dbURI);
    conn.once('open', function() {
        gfs = Grid(conn.db, mongoose.mongo);

        console.log('MongoDB & Grid gfs connected');
        console.log(conn.db);
        console.log(mongoose.mongo);
    });
};

module.exports = {
    connectDB: connectDB,
    gfs: gfs
};
// module.exports = connectDB;
