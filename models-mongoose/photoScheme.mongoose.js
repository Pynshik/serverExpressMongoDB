const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const photoScheme = new Schema({
    name: { type: String },
    filepath: { type: String }
})

photoScheme.plugin(mongoosePaginate);

 module.exports = photoScheme;