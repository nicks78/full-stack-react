// grab the things we need
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// create a schema
const userSchema = new Schema({
    role: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: {}
});

const User =  mongoose.model('Users', userSchema);

module.exports =  User;