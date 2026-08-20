import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const getLinkClass = (path) => {
    return `nav-link ${location.pathname === path ? 'active' : ''}`;
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        📚 Library Manager
      </Link>
      <ul className="nav-links">
        <li>
          <Link to="/" className={getLinkClass('/')}>Home</Link>
        </li>
        <li>
          <Link to="/books" className={getLinkClass('/books')}>Books</Link>
        </li>
        <li>
          <Link to="/borrow" className={getLinkClass('/borrow')}>Borrow Book</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
