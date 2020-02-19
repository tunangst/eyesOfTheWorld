const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

//connect to database
connectDB();

//middleware?
//need this middleware to parse body info from request
app.use(express.json({ extended: false }));

//routes
app.use('/api/eyes', require('./routes/api/eyes'));

//serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//     // set static folder
//     app.use(express.static('my-react-app/build'));

//     app.get('*', (req, res) => {
//         res.sendFile(
//             path.resolve(__dirname, 'my-react-app', 'build', 'index.html')
//         );
//     });
// }

// listen for server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
