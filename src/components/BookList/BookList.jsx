import  { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookContext } from '../../context/BookContext'; // Make sure the path is correct based on your folders

export default function BookList() {
  // Consuming the context using your method
  const { books, loading, error, deleteBook } = useContext(BookContext);
  
  // Local states for Search and Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  // Extract unique genres dynamically from the books array to feed the dropdown filter
  const genres = [...new Set(books.map(book => book.genre))].filter(Boolean);

  // Filter books based on search input (Title or Author) and selected Genre
  const filteredBooks = books.filter(book => {
    const matchesSearch = 
      book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGenre = selectedGenre === '' || book.genre === selectedGenre;
    
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="container py-5" dir="ltr">
      
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-dark m-0">Books Catalog</h2>
          <p className="text-muted small m-0">Manage and view all your library collections</p>
        </div>
        <Link to="/add-book" className="btn btn-primary px-4 py-2 rounded-2 fw-semibold shadow-sm">
          <i className="bi bi-plus-lg me-1"></i> Add New Book
        </Link>
      </div>

      {/* Search & Filter Controls */}
      <div className="row g-3 mb-4 p-3 bg-white rounded-2 shadow-sm border border-light mx-0">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0 text-muted">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0 ps-0 shadow-none text-dark"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <select
            className="form-select shadow-none text-dark"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">All Genres / Categories</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading State UI */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mt-2">Fetching books from server...</p>
        </div>
      )}

      {/* Error State UI */}
      {error && !loading && (
        <div className="alert alert-danger rounded-2 d-flex align-items-center" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          <div>{error}</div>
        </div>
      )}

      {/* Main Data Table */}
      {!loading && !error && (
        <div className="card border-0 shadow-sm rounded-2 overflow-hidden bg-white">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light text-secondary">
                <tr>
                  <th className="py-3 ps-4" style={{ color: '#495057' }}>Book Title</th>
                  <th className="py-3" style={{ color: '#495057' }}>Author</th>
                  <th className="py-3" style={{ color: '#495057' }}>Genre</th>
                  <th className="py-3" style={{ color: '#495057' }}>Year</th>
                  <th className="py-3 pe-4 text-end" style={{ color: '#495057' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <tr key={book.id}>
                      <td className="py-3 ps-4 fw-semibold text-dark">{book.title}</td>
                      <td className="py-3 text-secondary">{book.author}</td>
                      <td className="py-3">
                        <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-medium">
                          {book.genre || 'N/A'}
                        </span>
                      </td>
                      <td className="py-3 text-secondary">{book.publicationYear || book.year}</td>
                      <td className="py-3 pe-4 text-end">
                        <div className="d-flex justify-content-end gap-2">
                          
                          {/* Edit Button - Directs to Form with ID */}
                          <Link to={`/edit-book/${book.id}`} className="btn btn-outline-primary btn-sm px-3 rounded-2 border-0">
                            <i className="bi bi-pencil-square"></i> Edit
                          </Link>
                          
                          {/* Delete Button */}
                          <button 
                            onClick={() => {
                              if(window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
                                deleteBook(book.id);
                              }
                            }} 
                            className="btn btn-outline-danger btn-sm px-3 rounded-2 border-0"
                          >
                            <i className="bi bi-trash3"></i> Delete
                          </button>
                          
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5 text-muted">
                      <i className="bi bi-inbox fs-2 d-block mb-2 text-secondary"></i>
                      No books found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}