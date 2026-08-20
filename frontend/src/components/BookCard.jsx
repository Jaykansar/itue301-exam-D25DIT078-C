import React from 'react';

const BookCard = ({ title, author, category, available }) => {
  return (
    <div className="book-card">
      <div>
        <h3 className="book-title">{title}</h3>
        <div className="book-meta">
          <span>Author:</span>
          <strong>{author}</strong>
        </div>
        <div className="book-meta">
          <span>Category:</span>
          <strong>{category}</strong>
        </div>
      </div>
      <div className={`badge ${available ? 'badge-success' : 'badge-danger'}`}>
        {available ? 'Available' : 'Not Available'}
      </div>
    </div>
  );
};

export default BookCard;
