import React, { useState } from 'react';

const BorrowPage = () => {
  const [memberName, setMemberName] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [borrowDate, setBorrowDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!memberName || !bookTitle || !borrowDate || !returnDate) {
      setMessage('Please fill in all fields.');
      setIsError(true);
      return;
    }

    try {
      setLoading(true);
      setMessage('');
      setIsError(false);

      const response = await fetch('http://localhost:5000/api/v1/borrowings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          memberName,
          bookTitle,
          borrowDate,
          returnDate,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Borrowing record logged successfully!');
        setIsError(false);
        setMemberName('');
        setBookTitle('');
        setBorrowDate('');
        setReturnDate('');
      } else {
        throw new Error(result.message || 'Failed to submit borrowing record.');
      }
    } catch (err) {
      setMessage(err.message || 'Error occurred while saving record.');
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-card">
          <h2 style={{ margin: '0 0 24px 0', fontSize: '1.5rem', fontWeight: '700', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
            Record Borrowing
          </h2>

          {message && (
            <div className={`alert ${isError ? 'alert-danger' : 'alert-success'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Member Name</label>
              <input
                type="text"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                placeholder="Enter member's full name"
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Book Title</label>
              <input
                type="text"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                placeholder="Enter book title"
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Borrow Date</label>
              <input
                type="date"
                value={borrowDate}
                onChange={(e) => setBorrowDate(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Return Date</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%' }}>
              {loading ? 'Submitting...' : 'Submit Borrowing'}
            </button>
          </form>

          <div className="preview-card">
            <h4>Live Form State Preview</h4>
            <div className="preview-grid">
              <div><strong>Member Name:</strong></div>
              <div>{memberName || <em style={{ color: '#94a3b8' }}>Empty</em>}</div>
              
              <div><strong>Book Title:</strong></div>
              <div>{bookTitle || <em style={{ color: '#94a3b8' }}>Empty</em>}</div>
              
              <div><strong>Borrow Date:</strong></div>
              <div>{borrowDate || <em style={{ color: '#94a3b8' }}>Not selected</em>}</div>
              
              <div><strong>Return Date:</strong></div>
              <div>{returnDate || <em style={{ color: '#94a3b8' }}>Not selected</em>}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowPage;
