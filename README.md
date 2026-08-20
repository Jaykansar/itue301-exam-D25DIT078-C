# Library Book Management System

An open-book practical examination project (Set B) for **ITUE301 — Advanced Web Development Frameworks**. This application allows users to digitize library book records, manage member details, and log book borrowing transactions using a React frontend, Express.js backend, and MongoDB database.

---

## Technical Stack

- **Frontend:** React (Vite) + React Router DOM
- **Backend:** Express.js + Node.js
- **Database:** MongoDB + Mongoose ODM

---

## Project Structure

```
├── frontend/             # React Frontend
│   ├── src/
│   │   ├── components/   # Reusable components (BookCard, Navigation)
│   │   ├── pages/        # Route pages (HomePage, BooksPage, BorrowPage)
│   │   ├── App.jsx       # Routing & App entry
│   │   └── main.jsx
│   └── package.json
│
├── backend/              # Express.js Backend
│   ├── models/           # Mongoose schemas (Book, Member, Borrowing)
│   ├── server.js         # API Server Entry
│   ├── test-db.js        # Mongoose Validation Test Script
│   └── package.json
│
├── .env                  # Connection strings (Local environment - gitignored)
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore file
└── README.md             # Setup & documentation instructions
```

---

## Prerequisites

Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) (running locally on port `27017`)

---

## Environment Configuration

1. In the project root, create a file named `.env` (or copy `.env.example` to `.env`):
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and specify your MongoDB connection URI and server port:
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/library_book_management
   PORT=5000
   ```

---

## Setup & Running the Project

### 1. Database Schema Validation Check
To verify that Mongoose schemas, reference rules, and validation errors work correctly, run the built-in database validator script:
```bash
# Navigate to the backend directory and run:
cd backend
node test-db.js
```
This script connects to MongoDB, seeds initial test documents, and outputs clean validation error logs in JSON format for debugging.

### 2. Backend Setup and Run
To start the Express REST API server:
```bash
# Navigate to backend directory
cd backend

# Install dependencies (if not already done)
npm install

# Start the server (runs on Port 5000 by default)
npm start
```
*Alternatively, you can run `npm run dev` to start the server using nodemon for auto-reloading during development.*

### 3. Frontend Setup and Run
To start the React client application:
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the Vite development server (runs on http://localhost:5173)
npm run dev
```

---

## REST Endpoints Implemented

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/v1/books` | Fetches all books from database (falls back to in-memory list if MongoDB is offline) |
| **GET** | `/api/v1/borrowings` | Fetches all borrowing records (populates Member and Book information) |
| **POST** | `/api/v1/borrowings` | Records a new borrowing transaction (creates/resolves Member and Book references) |

---

## Database Schemas & Constraints

- **Book**: Title (required), Author (required), Category (required), ISBN (required, unique), Available (Boolean, default: true).
- **Member**: Name (required), Email (required, unique, regex validated), Phone (optional), Department (required).
- **Borrowing**: MemberId (reference, required), BookId (reference, required), BorrowDate (required), ReturnDate (required), Status (Enum: `borrowed`, `returned`, `overdue`, default: `borrowed`).
