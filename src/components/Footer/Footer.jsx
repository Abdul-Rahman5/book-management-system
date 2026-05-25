import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-top border-light py-4 mt-auto" dir="ltr">
      <div className="container">
        <div className="row align-items-center justify-content-between g-3">
          
          {/* Left Side: Brand Name & Copyright */}
          <div className="col-md-6 text-center text-md-start">
            <Link className="fw-bold d-inline-flex align-items-center fs-5 m-0 text-dark text-decoration-none" to="/">
              <i className="bi bi-book-half me-2 text-primary fs-4"></i>
              <span style={{ letterSpacing: '0.5px' }}>Book<span className="text-primary">Hub</span></span>
            </Link>
            <p className="text-muted small mb-0 mt-2">
              © {currentYear} BookHub Management System. All rights reserved.
            </p>
          </div>

          {/* Right Side: Clean Minimalist Links */}
          <div className="col-md-6 text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end gap-4">
              {/* Only Books List pointing to "/" */}
              <Link to="/" className="text-secondary text-decoration-none small fw-medium text-primary-hover">
                Books List
              </Link>
              
              {/* Add Book link */}
              <Link to="/add-book" className="text-secondary text-decoration-none small fw-medium text-primary-hover">
                Add Book
              </Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}