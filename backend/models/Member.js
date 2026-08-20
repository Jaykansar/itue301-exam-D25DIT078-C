const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Member name is required']
  },
  email: {
    type: String,
    required: [true, 'Member email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  phone: {
    type: String
  },
  department: {
    type: String,
    required: [true, 'Member department is required']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Member', memberSchema);
