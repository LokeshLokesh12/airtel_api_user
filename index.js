const express = require('express');
const app = express();
const db = require('./db');
const port = 8080;
const cors = require('cors');
app.use(cors());

// const AuthController = require('./controller/AuthController');
const AuthController = require('./controller/Authcontroller');
app.use('/api/auth/',AuthController);

app.listen(port,() => {
    console.log(`listening on port ${port}`)
})