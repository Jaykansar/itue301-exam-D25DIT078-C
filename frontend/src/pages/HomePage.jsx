import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="hero-section">
      <div className="hero-tag">V5.0 System Dashboard</div>
      <h2 className="hero-title">
        Library Book <span>Management System</span>
      </h2>
      <p className="hero-subtitle">
        A modern, unified digital workspace for managing physical libraries. Access catalog lists, query book availabilities, check member details, and log issue records in one place.
      </p>
      
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '40px' }}>
        <Link to="/books" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          Browse Catalog
        </Link>
        <Link to="/borrow" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
          Issue Book
        </Link>
      </div>

      <div className="home-grid">
        <div className="home-card">
          <div className="home-card-icon">📖</div>
          <h3>Books Catalog</h3>
          <p>Browse full index of book titles, authors, classifications, and track real-time loan statuses.</p>
        </div>
        <div className="home-card">
          <div className="home-card-icon">✍️</div>
          <h3>Issuing & Returns</h3>
          <p>Record member loans, calculate due return dates, and update books status efficiently.</p>
        </div>
        <div className="home-card">
          <div className="home-card-icon">👥</div>
          <h3>Members Registry</h3>
          <p>Monitor library members, departments, email contact, and handle loan validation limits.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
