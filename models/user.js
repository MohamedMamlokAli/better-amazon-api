const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required.'],
    maxLength: [16, 'Name should not exceed 16 characters.'],
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    trim: true,
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  password: {
    type: String,
    minlength: 6,
    trim: true,
    required: [true, 'password is required.'],
  },
  image: {
    type: String,
    required: [true, 'Image is required.'],
  },
});
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});
userSchema.methods.genJWT = function () {
  return jwt.sign(
    { id: this._id, name: this.name, image: this.image },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

userSchema.methods.comparePassword = async function (pass) {
  const isMatch = await bcrypt.compare(pass, this.password);
  return isMatch;
};
module.exports = mongoose.model('User', userSchema);
