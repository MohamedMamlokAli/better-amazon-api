const mongoose = require('mongoose');

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
    maxlength: 20,
    required: [true, 'password is required.'],
  },
  image: {
    type: String,
    required: [true, 'Image is required.'],
  },
});
