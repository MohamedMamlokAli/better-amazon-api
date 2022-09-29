const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required.'],
    maxLength: [16, 'Name should not exceed 16 characters.'],
  },
});
