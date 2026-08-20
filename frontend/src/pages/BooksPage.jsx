import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';

const BooksPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  // Filter books based on search query
  const filteredBooks = data.filter((book) => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e2e8f0', paddingBottom: '16px', marginBottom: '32px' }}>
        <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: '800', letterSpacing: '-0.02em' }}>Books Catalog</h2>
        <span style={{ fontSize: '0.95rem', color: '#64748b', fontWeight: '600', backgroundColor: '#eeebff', padding: '6px 14px', borderRadius: '9999px', color: '#4f46e5' }}>
          {filteredBooks.length} of {data.length} Books
        </span>
      </div>

      {/* Modern Search bar wrapper */}
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="🔍 Search by book title, author, or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {loading && (
        <div className="text-center" style={{ padding: '80px 0', color: '#64748b' }}>
          <div style={{ display: 'inline-block', width: '36px', height: '36px', border: '3px solid #e2e8f0', borderTopColor: '#4f46e5', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '16px' }}></div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <div style={{ fontWeight: '500' }}>Loading library catalog...</div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          <strong>Fetch Error:</strong> {error}
        </div>
      )}

      {!loading && !error && filteredBooks.length === 0 && (
        <div className="text-center" style={{ padding: '60px 20px', color: '#64748b', backgroundColor: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🔎</div>
          <div style={{ fontWeight: '600', color: '#0f172a', marginBottom: '4px' }}>No Results Found</div>
          <div>We couldn't find any books matching "{searchQuery}".</div>
        </div>
      )}

      {!loading && !error && filteredBooks.length > 0 && (
        <div className="book-grid">
          {filteredBooks.map((book, index) => (
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
