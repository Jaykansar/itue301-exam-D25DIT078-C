import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';

const BooksPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/v1/books');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch books: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message || 'Something went wrong while fetching books.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e2e8f0', paddingBottom: '12px', marginBottom: '24px' }}>
        <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '700' }}>Books Catalog</h2>
        <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '500' }}>
          {data.length} {data.length === 1 ? 'Book' : 'Books'} Registered
        </span>
      </div>

      {loading && (
        <div className="text-center" style={{ padding: '60px 0', color: '#64748b' }}>
          <div style={{ display: 'inline-block', width: '32px', height: '32px', border: '3px solid #e2e8f0', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '16px' }}></div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <div>Loading catalog records...</div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          <strong>Fetch Error:</strong> {error}
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <div className="text-center" style={{ padding: '40px', color: '#64748b' }}>
          No books found in the library database.
        </div>
      )}

      {!loading && !error && data.length > 0 && (
        <div className="book-grid">
          {data.map((book, index) => (
            <BookCard
              key={book._id || book.isbn || index}
              title={book.title}
              author={book.author}
              category={book.category}
              available={book.available}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksPage;
