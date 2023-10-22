const mongoose = require('mongoose');
const tb_user = require('./users.js')
const { Schema } = mongoose;

const activitySchema = mongoose.Schema({
    user_id: { type: Schema.Types.ObjectId, ref: tb_user, required: true },
    desc: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: Date, required: true },
    duration: { type: Number, required: true },
    calories: { type: Schema.Types.Decimal128 },
    image: { public_id: { type: String }, url: { type: String } },
    created_at: { type: Date,default: Date.now, required: true },
    lastUpdate_at: { type: Date },
})
const tb_activity = mongoose.model('activities', activitySchema)
module.exports = tb_activity;