const mongoose = require('mongoose');
const moment = require('moment-timezone')
const dateThailand = moment.tz('Asia/Bangkok').format('DD-MM-YYYY');
const { Schema } = mongoose;
const tb_user = require('./users.js')

console.log(dateThailand)

const postSchema = mongoose.Schema({
    user_post_id : { type: Schema.Types.ObjectId, ref: tb_user, required: true },
    desc: { type: String, required: true },
    image: { public_id: { type: String }, url: { type: String } },
    date: { type: String, required: true , default:dateThailand},
});

module.exports = mongoose.model('user_post', postSchema)