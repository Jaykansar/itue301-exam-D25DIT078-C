const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
require('dotenv').config();

const Book = require('./models/Book');
const Member = require('./models/Member');
const Borrowing = require('./models/Borrowing');

async function runTests() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error(JSON.stringify({
      error: "Configuration Error",
      message: "MONGO_URI is not set in environment. Please add MONGO_URI in .env"
    }, null, 2));
    process.exit(1);
  }

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("Connected successfully.\n");

    // 1. Clear database collections before testing
    console.log("Cleaning collections...");
    await Book.deleteMany({});
    await Member.deleteMany({});
    await Borrowing.deleteMany({});
    console.log("Cleaned successfully.\n");

    // 2. Demonstrate SUCCESSFUL creation (Book & Member)
    console.log("--- TEST 1: Creating Valid Documents (Success) ---");
    const testBook = await Book.create({
      title: "Clean Code",
      author: "Robert C. Martin",
      category: "Software Engineering",
      isbn: "9780132350884",
      available: true
    });
    console.log("Created Book:", JSON.stringify(testBook, null, 2));

    const testMember = await Member.create({
      name: "Jane Smith",
      email: "janesmith@uni.edu",
      phone: "+1234567890",
      department: "Computer Science"
    });
    console.log("Created Member:", JSON.stringify(testMember, null, 2));

    // 3. Demonstrate SUCCESSFUL Borrowing creation
    console.log("\n--- TEST 2: Creating Valid Borrowing Document (Success) ---");
    const testBorrowing = await Borrowing.create({
      memberId: testMember._id,
      bookId: testBook._id,
      borrowDate: new Date(),
      returnDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days later
      status: "borrowed"
    });
    console.log("Created Borrowing:", JSON.stringify(testBorrowing, null, 2));

    // 4. Demonstrate Validation Failure: Missing Required Field (Book title)
    console.log("\n--- TEST 3: Validation Failure - Missing Required Field (Book Title) ---");
    try {
      await Book.create({
        author: "No Title Author",
        category: "Test",
        isbn: "1234567890"
      });
    } catch (err) {
      if (err.name === 'ValidationError') {
        const errorDetail = {
          error: "Validation Failure",
          model: "Book",
          message: "Failed to create book due to validation constraints",
          errors: Object.values(err.errors).map(v => v.message)
        };
        console.log(JSON.stringify(errorDetail, null, 2));
      } else {
        console.error("Unexpected error:", err);
      }
    }

    // 5. Demonstrate Validation Failure: Missing Member Name
    console.log("\n--- TEST 4: Validation Failure - Missing Member Name ---");
    try {
      await Member.create({
        email: "noname@uni.edu",
        department: "Information Technology"
      });
    } catch (err) {
      if (err.name === 'ValidationError') {
        const errorDetail = {
          error: "Validation Failure",
          model: "Member",
          message: "Failed to create member due to validation constraints",
          errors: Object.values(err.errors).map(v => v.message)
        };
        console.log(JSON.stringify(errorDetail, null, 2));
      } else {
        console.error("Unexpected error:", err);
      }
    }

    // 6. Demonstrate Validation Failure: Invalid Borrowing Status Enum
    console.log("\n--- TEST 5: Validation Failure - Invalid Borrowing Status Enum ---");
    try {
      await Borrowing.create({
        memberId: testMember._id,
        bookId: testBook._id,
        borrowDate: new Date(),
        returnDate: new Date(),
        status: "lost_and_damaged" // Not one of borrowed, returned, overdue
      });
    } catch (err) {
      if (err.name === 'ValidationError') {
        const errorDetail = {
          error: "Validation Failure",
          model: "Borrowing",
          message: "Failed to create borrowing record due to validation constraints",
          errors: Object.values(err.errors).map(v => v.message)
        };
        console.log(JSON.stringify(errorDetail, null, 2));
      } else {
        console.error("Unexpected error:", err);
      }
    }

  } catch (err) {
    console.error("General error running tests:", err);
  } finally {
    await mongoose.disconnect();
    console.log("\nDisconnected from MongoDB.");
  }
}

runTests();
