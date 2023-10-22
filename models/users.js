const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: {
      type: String,
      enum: ["male", "female", "malefemale"],
      required: true,
    },
    birthday: { type: Date, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    image: { public_id: { type: String }, url: { type: String } },
    // image: { data: Buffer, contentType: String },
    register_at: { type: Date },
    update_at: { type: Date },
})

const tb_user = mongoose.model('users', userSchema);
module.exports = tb_user;