const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

const config = require('./config/db');
// const dbURI = config.get('mongoURI');
const connectDB = require('./config/db');
const path = require('path');

const eyeRoutes = require('./routes/api/eyes');
const imageRoutes = require('./routes/api/image');
const userRoutes = require('./routes/api/user');
const authRoutes = require('./routes/api/auth');

const PORT = process.env.PORT || 5000;

// connect DB
// let gfs;
// mongoose.createConnection(dbURI);
connectDB();

//middleware?
//need this middleware to parse body info from request
app.use(express.json({ extended: false }));

//routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/eyes', eyeRoutes);
app.use('/api/image', imageRoutes);

//serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('my-react-app/build'));

    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(__dirname, 'my-react-app', 'build', 'index.html')
        );
    });
}

// listen for server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
