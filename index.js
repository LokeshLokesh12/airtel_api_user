const express = require('express');
const app = express();
const db = require('./db');
let dotenv = require('dotenv');
dotenv.config();
let port = process.env.PORT || 5050
const cors = require('cors');
app.use(cors());
// app.use(dotenv());

// const AuthController = require('./controller/AuthController');
const AuthController = require('./controller/Authcontroller');
app.use('/api/auth/',AuthController);

app.listen(port,() => {
    console.log(`listening on port ${port}`)
})