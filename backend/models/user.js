const db = require('mongoose');

const userSchema = new db.Schema({
  active: Boolean,
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  surname: {type: String, required: true},
  name: {type: String, required: true},
});

const User = db.model('User', userSchema);

module.exports = User;
