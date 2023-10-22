const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    desc: { type: String, required: true },
    image: { type: String, required: true },
    date: { type: Date, required: true },
});

module.exports = mongoose.model('user_post', postSchema)