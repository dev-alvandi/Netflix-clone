const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    maxLength: 50,
  },
  likedMovies: Array,
});

module.exports = mongoose.model('users', userSchema);
