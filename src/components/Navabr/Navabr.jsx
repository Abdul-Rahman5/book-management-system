import  { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navabr() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg bg-white py-3 shadow-sm border-bottom border-light" dir="ltr" style={{ zIndex: 1050 }}>
      <div className="container">
        
        {/* Brand Logo - Left Aligned */}
        <NavLink className="navbar-brand fw-bold d-flex align-items-center fs-4 m-0 text-dark" to="/" style={{ textDecoration: 'none' }}>
          <i className="bi bi-book-half me-2 text-primary fs-3"></i>
          <span style={{ letterSpacing: '0.5px', color: '#1a1a1a' }}>Book<span className="text-primary">Hub</span></span>
        </NavLink>

        {/* Mobile Menu Button */}
        <button 
          className="navbar-toggler border-0 shadow-none text-dark" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center mt-3 mt-lg-0">
            
            {/* Only Books List remaining, pointing to the main path "/" */}
            <li className="nav-item mx-lg-3 my-2 my-lg-0">
              <NavLink 
                className={({ isActive }) => `nav-link p-0 fw-medium ${isActive ? 'text-primary fw-bold' : 'text-secondary'}`} 
                to="/"
                end
                style={({ isActive }) => ({
                  color: isActive ? '#0d6efd' : '#6c757d',
                  borderBottom: isActive ? '2px solid #0d6efd' : 'none',
                  paddingBottom: '4px'
                })}
              >
                Books List
              </NavLink>
            </li>

            {/* Blue Action Button */}
            <li className="nav-item ms-lg-4 my-2 my-lg-0">
              <NavLink 
                className="btn btn-primary text-white px-4 py-2 rounded-2 fw-semibold d-inline-flex align-items-center shadow-sm" 
                to="/add-book"
                style={{ backgroundColor: '#0d6efd', border: 'none', fontSize: '14px' }}
              >
                <i className="bi bi-plus-lg me-1 fw-bold"></i> Add New Book
              </NavLink>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}