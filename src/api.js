const express = require('express')
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const cors = require('cors')

const serverless = require('serverless-http');

//Import Routes
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');

dotenv.config();

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    ()=>console.log('Connected to DB')
);

//Middlewares
app.use(express.json());
app.use(cors());

//Route Middlewares
app.use('/.netlify/functions/api/user', authRoute);
app.use('/.netlify/functions/api/posts', postsRoute);

app.listen(3000, ()=> console.log('Server Up an running'));

module.exports = app;
module.exports.handler = serverless(app);

