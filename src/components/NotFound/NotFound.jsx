import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="container d-flex align-items-center justify-content-center flex-grow-1 py-5" dir="ltr" style={{ minHeight: '70vh' }}>
      <div className="text-center">
        
        {/* Animated-like Icon Container */}
        <div className="mb-4 d-inline-block p-4 rounded-circle bg-primary bg-opacity-10 text-primary animate__animated animate__bounceIn">
          <i className="bi bi-book-half display-1"></i>
        </div>

        {/* Error Code & Message */}
        <h1 className="fw-black text-dark mb-2" style={{ fontSize: '4rem', fontWeight: '900', letterSpacing: '-1px' }}>
          404
        </h1>
        <h3 className="fw-bold text-secondary mb-3">Page Not Found</h3>
        
        <p className="text-muted mx-auto mb-4" style={{ maxWidth: '400px', fontSize: '15px' }}>
          Oops! The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
        </p>

        {/* Action Button to go Home */}
        <button 
          onClick={() => navigate('/')} 
          className="btn btn-primary px-4 py-2 rounded-2 fw-semibold shadow-sm border-0 d-inline-flex align-items-center gap-2"
          style={{ backgroundColor: '#0d6efd' }}
        >
          <i className="bi bi-house-door-fill"></i>
          Back to Home
        </button>

      </div>
    </div>
  );
}