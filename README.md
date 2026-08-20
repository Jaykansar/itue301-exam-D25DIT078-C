# Library Book Management System (Set B)

An open-book practical examination project for **ITUE301 — Advanced Web Development Frameworks**.

- **Roll Number:** D25DIT078
- **Batch:** C
- **Examination Set:** Set B — Library Book Management System

---

## Technical Stack

- **Frontend:** React (Vite) + React Router DOM
- **Backend:** Express.js + Node.js
- **Database:** MongoDB + Mongoose ODM

---

## Project Structure

```
├── frontend/             # React Frontend (Vite)
│   ├── src/
│   │   ├── components/   # Reusable UI components (BookCard, Navigation)
│   │   ├── pages/        # Router pages (HomePage, BooksPage, BorrowPage)
│   │   ├── App.jsx       # Routing & App entry
│   │   └── main.jsx
│   └── package.json
│
├── backend/              # Express.js REST API Backend
│   ├── models/           # Mongoose schemas (Book, Member, Borrowing)
│   ├── server.js         # API Server Entry Point
│   ├── test-db.js        # Mongoose Schema Validation Test Script
│   └── package.json
│
├── .env                  # MongoDB connection configuration (gitignored)
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore specification
└── README.md             # Project documentation
```

---

## Prerequisites

Ensure you have the following installed locally:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) (running locally on default port `27017`)

---

## Environment Setup

1. Copy the environment template file:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and specify your local MongoDB connection URI:
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/library_book_management
   PORT=5000
   ```

---

## Setup & Running Guide

### 1. Run Schema Validation Test
To verify the Mongoose schemas, reference rules, and JSON error formatting:
```bash
cd backend
node test-db.js
```
This script cleans the database, seeds test data, and triggers validation failures to verify proper error outputs.

### 2. Run Backend Server
Start the Express API server (runs on port `5000`):
```bash
cd backend
npm install
npm start
```

### 3. Run React Frontend
Start the Vite development server (runs on `http://localhost:5173`):
```bash
cd frontend
npm install
npm run dev
```

---

## Submission Details

- **GitHub Repository URL:** `https://github.com/Jaykansar/itue301-exam-D25DIT078-C`
- **Evidence PDF Report Name:** `D25DIT078_SetB_Report.pdf`
