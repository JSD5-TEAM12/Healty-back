const mongoose = require('mongoose');
// const tb_user = require('./users.js')

const activityTypeSchema = mongoose.Schema({
    type_id: { type: String, required: true, unique: true },
    name_type: { type: String, required: true, unique: true },
    image: { public_id: { type: String }, url: { type: String } }
});

module.exports = mongoose.model('activitiy_type', activityTypeSchema)