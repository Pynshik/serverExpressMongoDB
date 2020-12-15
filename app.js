const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const usersRouter = require('./routes/users.routes.js');

app.use('/public', express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/users', usersRouter);

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})
