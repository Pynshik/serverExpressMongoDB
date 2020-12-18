const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const userScheme = new Schema({
    login: { type: String },
    password: { type: String },
    name: { type: String },
    age: { type: Number },
    avatar: { type: String },
    photos: [{ type: Schema.Types.ObjectId, ref: 'Photo'}]
})

userScheme.plugin(mongoosePaginate);

 module.exports = userScheme;