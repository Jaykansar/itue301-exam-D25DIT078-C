const mongoose = require('mongoose');

const borrowingSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: [true, 'Member reference is required']
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: [true, 'Book reference is required']
  },
  borrowDate: {
    type: Date,
    required: [true, 'Borrow date is required']
  },
  returnDate: {
    type: Date,
    required: [true, 'Return date is required']
  },
  status: {
    type: String,
    enum: {
      values: ['borrowed', 'returned', 'overdue'],
      message: 'Status must be borrowed, returned, or overdue'
    },
    default: 'borrowed'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Borrowing', borrowingSchema);
