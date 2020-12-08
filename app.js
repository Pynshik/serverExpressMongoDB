const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
const usersRouter = require('./routes/users.routes.js');

app.use(bodyParser.json());
app.use('/users', usersRouter);

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})
