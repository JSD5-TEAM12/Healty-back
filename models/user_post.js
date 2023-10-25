const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = mongoose.Schema({
    user_post_id : { type: Schema.Types.ObjectId, ref: tb_user, required: true },
    desc: { type: String, required: true },
    image: { public_id: { type: String }, url: { type: String } },
    date: { type: Date, required: true },
});

module.exports = mongoose.model('user_post', postSchema)