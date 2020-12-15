const mongoose = require('mongoose');
const userScheme = require('../models-mongoose/userScheme.mongoose');

const User = mongoose.model("User", userScheme);

mongoose.connect('mongodb://localhost/users',  {useFindAndModify: false , useNewUrlParser: true })
    .then(() =>  console.log('connection succesful'))
    .catch((err) => console.error(err));

module.exports = User;