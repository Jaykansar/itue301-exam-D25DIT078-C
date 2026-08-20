import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="hero-section">
      <h2 className="hero-title">Library Book Management System</h2>
      <p className="hero-subtitle">
        A modern, unified digital workspace for managing physical libraries. Access catalog lists, query book availabilities, check member details, and issue records in one place.
      </p>
      
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '40px' }}>
        <Link to="/books" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          Browse Catalog
        </Link>
        <Link to="/borrow" className="btn" style={{ textDecoration: 'none', backgroundColor: '#e2e8f0', color: '#1e293b' }}>
          Issue Book
        </Link>
      </div>

      <div className="home-grid">
        <div className="home-card">
          <h3>📖 Books Catalog</h3>
          <p>Browse full index of book titles, authors, classifications, and track real-time loan statuses.</p>
        </div>
        <div className="home-card">
          <h3>✍️ Issuing & Returns</h3>
          <p>Record member loans, calculate due return dates, and update books status efficiently.</p>
        </div>
        <div className="home-card">
          <h3>👥 Members Registry</h3>
          <p>Monitor library members, departments, email contact, and handle loan validation limits.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
