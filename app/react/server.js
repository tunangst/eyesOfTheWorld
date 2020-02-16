const express = require('express');
const connectDB = require('./config/db');
// import connectDB from './config/db';
const path = require('path');
// import path from 'path';
const route = require('./apiRoutes/route');
// import route from './apiRoutes/route';

const app = express();
const PORT = process.env.PORT || 5000;

//connect to database
connectDB();

//middleware?

//routes
app.use('/', route);

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
