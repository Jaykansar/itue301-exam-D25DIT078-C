const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
// Load env from root or backend folder
require('dotenv').config({ path: path.join(__dirname, '../.env') });
require('dotenv').config();

const Book = require('./models/Book');
const Member = require('./models/Member');
const Borrowing = require('./models/Borrowing');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS so the React app can call this API
app.use(cors());
app.use(express.json());

// Task 3: Custom requestLogger middleware
const requestLogger = (req, res, next) => {
  const method = req.method;
  const path = req.originalUrl || req.url;
  const timestamp = new Date().toISOString();
  console.log(`[${method}] ${path} [${timestamp}]`);
  next();
};

// Apply requestLogger globally
app.use(requestLogger);

// In-memory fallback arrays for Task 3 & Task 4
const inMemoryBooks = [
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction", isbn: "9780743273565", available: true },
  { title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", isbn: "9780061120084", available: false },
  { title: "1984", author: "George Orwell", category: "Dystopian", isbn: "9780451524935", available: true },
  { title: "A Brief History of Time", author: "Stephen Hawking", category: "Science", isbn: "9780553380163", available: true }
];

const inMemoryBorrowings = [
  { memberName: "John Doe", bookTitle: "1984", borrowDate: "2026-08-10", returnDate: "2026-08-24", status: "borrowed" }
];

let isMongoConnected = false;

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI;
if (mongoUri) {
  mongoose.connect(mongoUri)
    .then(async () => {
      console.log('Connected to MongoDB successfully.');
      isMongoConnected = true;
      // Seed default books if database is empty
      try {
        const bookCount = await Book.countDocuments();
        if (bookCount === 0) {
          await Book.insertMany(inMemoryBooks);
          console.log('Database seeded with initial books.');
        }
      } catch (seedErr) {
        console.error('Error seeding initial books:', seedErr.message);
      }
    })
    .catch((err) => {
      console.error('Failed to connect to MongoDB. Running in IN-MEMORY mode.', err.message);
    });
} else {
  console.log('MONGO_URI not specified in environment variables. Running in IN-MEMORY mode.');
}

// REST API Endpoints

// 1. GET /api/v1/books - Return all books
app.get('/api/v1/books', async (req, res, next) => {
  try {
    if (isMongoConnected) {
      const books = await Book.find({});
      return res.status(200).json(books);
    } else {
      return res.status(200).json(inMemoryBooks);
    }
  } catch (err) {
    next(err);
  }
});

// 2. GET /api/v1/borrowings - Return all borrowing records
app.get('/api/v1/borrowings', async (req, res, next) => {
  try {
    if (isMongoConnected) {
      const borrowings = await Borrowing.find({})
        .populate('memberId')
        .populate('bookId');
      return res.status(200).json(borrowings);
    } else {
      return res.status(200).json(inMemoryBorrowings);
    }
  } catch (err) {
    next(err);
  }
});

// 3. POST /api/v1/borrowings - Create a new borrowing record
app.post('/api/v1/borrowings', async (req, res, next) => {
  const { memberName, bookTitle, borrowDate, returnDate, status } = req.body;

  if (!isMongoConnected) {
    // In-memory fallback logic
    if (!memberName || !bookTitle || !borrowDate || !returnDate) {
      return res.status(400).json({ error: "Validation Error", message: "All fields are required" });
    }
    const newBorrowing = {
      memberName,
      bookTitle,
      borrowDate,
      returnDate,
      status: status || 'borrowed'
    };
    inMemoryBorrowings.push(newBorrowing);
    return res.status(201).json(newBorrowing);
  }

  // MongoDB logic
  try {
    // Find or create member
    let member = await Member.findOne({ name: memberName });
    if (!member) {
      member = await Member.create({
        name: memberName,
        email: `${memberName.toLowerCase().replace(/\s+/g, '')}@example.com`,
        department: 'General'
      });
    }

    // Find or create book
    let book = await Book.findOne({ title: bookTitle });
    if (!book) {
      book = await Book.create({
        title: bookTitle,
        author: 'Unknown Author',
        category: 'General',
        isbn: `ISBN-${Math.floor(Math.random() * 10000000)}`
      });
    }

    // Create borrowing
    const borrowing = await Borrowing.create({
      memberId: member._id,
      bookId: book._id,
      borrowDate,
      returnDate,
      status: status || 'borrowed'
    });

    // Populate and return
    const populated = await Borrowing.findById(borrowing._id)
      .populate('memberId')
      .populate('bookId');

    return res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
});

// Task 3: Global error-handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.message);

  // Mongoose validation error formatting
  if (err.name === 'ValidationError') {
    const errorMessages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      error: 'Validation Error',
      message: errorMessages.join(', ')
    });
  }

  // Mongoose unique field duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      error: 'Duplicate Key Error',
      message: `Duplicate value found for unique field. ${JSON.stringify(err.keyValue)}`
    });
  }

  // General server error
  return res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'An unexpected error occurred on the server.'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
