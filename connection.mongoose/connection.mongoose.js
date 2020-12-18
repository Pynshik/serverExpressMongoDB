const photoScheme = require('../models-mongoose/photoScheme.mongoose');
const userScheme = require('../models-mongoose/userScheme.mongoose');
const mongoose = require('mongoose');

const conn = mongoose.createConnection('mongodb://localhost/users',  {useFindAndModify: false , useNewUrlParser: true });
const User = conn.model("User", userScheme);

const conn2 = mongoose.createConnection('mongodb://localhost/photos',  {useFindAndModify: false , useNewUrlParser: true });
const Photo = conn2.model("Photo", photoScheme);

module.exports = {User, Photo};