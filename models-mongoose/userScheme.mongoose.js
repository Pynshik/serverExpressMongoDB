const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userScheme = new Schema({
    login: { type: String },
    password: { type: String },
    name: { type: String },
    age: { type: Number },
    avatar: { type: String }
})
 module.exports = userScheme;