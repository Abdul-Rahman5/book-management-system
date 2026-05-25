import  { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { BookContext } from '../../context/BookContext'; 

export default function BookForm() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { books, addBook, updateBook } = useContext(BookContext);

  const isEditMode = Boolean(id);

  // 1. Define Yup Validation Schema for Real-time Validation
  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, 'Title must be at least 3 characters')
      .required('Book title is required'),
    author: Yup.string()
      .min(3, 'Author name must be at least 3 characters')
      .required('Author name is required'),
    genre: Yup.string()
      .required('Genre/Category is required'),
    publicationYear: Yup.number()
      .typeError('Must be a valid number')
      .positive('Year must be a positive number')
      .integer('Year must be an integer')
      .min(1000, 'Year is too old')
      .max(new Date().getFullYear(), "Year can't be in the future")
      .required('Publication year is required')
  });

  // 2. Initialize Formik Hook
  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      genre: '',
      publicationYear: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (isEditMode) {
        await updateBook(id, values);
      } else {
        await addBook(values);
      }
      navigate('/');
    }
  });

  // 3. Handle Edit Mode: Update Formik values dynamically when books array is ready
  useEffect(() => {
    if (isEditMode && books.length > 0) {
      const currentBook = books.find(b => String(b.id) === String(id));
      if (currentBook) {
        formik.setValues({
          title: currentBook.title || '',
          author: currentBook.author || '',
          genre: currentBook.genre || '',
          publicationYear: currentBook.publicationYear || currentBook.year || ''
        });
      }
    }
  }, [id, books, isEditMode]);

  return (
    <div className="container py-5" dir="ltr">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          
          {/* Card Container */}
          <div className="card border-0 shadow-sm rounded-2 p-4 bg-white">
            
            {/* Dynamic Header */}
            <h3 className="fw-bold text-dark mb-1">
              {isEditMode ? 'Edit Book Details' : 'Add New Book'}
            </h3>
            <p className="text-muted small mb-4">
              {isEditMode ? 'Update the information for this book below.' : 'Fill in the details to add a new book to the library.'}
            </p>

            {/* Form */}
            <form onSubmit={formik.handleSubmit}>
              
              {/* Title Input */}
              <div className="mb-3">
                <label className="form-label fw-medium text-secondary">Book Title</label>
                <input
                  type="text"
                  placeholder="e.g., The Great Gatsby"
                  {...formik.getFieldProps('title')}
                  className={`form-control text-dark shadow-none border ${
                    formik.touched.title && formik.errors.title ? 'is-invalid border-danger' : ''
                  }`}
                />
                {formik.touched.title && formik.errors.title && (
                  <div className="invalid-feedback fw-medium mt-1">{formik.errors.title}</div>
                )}
              </div>

              {/* Author Input */}
              <div className="mb-3">
                <label className="form-label fw-medium text-secondary">Author</label>
                <input
                  type="text"
                  placeholder="e.g., F. Scott Fitzgerald"
                  {...formik.getFieldProps('author')}
                  className={`form-control text-dark shadow-none border ${
                    formik.touched.author && formik.errors.author ? 'is-invalid border-danger' : ''
                  }`}
                />
                {formik.touched.author && formik.errors.author && (
                  <div className="invalid-feedback fw-medium mt-1">{formik.errors.author}</div>
                )}
              </div>

              {/* Genre Input */}
              <div className="mb-3">
                <label className="form-label fw-medium text-secondary">Genre / Category</label>
                <input
                  type="text"
                  placeholder="e.g., Fiction, Sci-Fi, History"
                  {...formik.getFieldProps('genre')}
                  className={`form-control text-dark shadow-none border ${
                    formik.touched.genre && formik.errors.genre ? 'is-invalid border-danger' : ''
                  }`}
                />
                {formik.touched.genre && formik.errors.genre && (
                  <div className="invalid-feedback fw-medium mt-1">{formik.errors.genre}</div>
                )}
              </div>

              {/* Publication Year Input */}
              <div className="mb-4">
                <label className="form-label fw-medium text-secondary">Publication Year</label>
                <input
                  type="number"
                  placeholder="e.g., 1925"
                  {...formik.getFieldProps('publicationYear')}
                  className={`form-control text-dark shadow-none border ${
                    formik.touched.publicationYear && formik.errors.publicationYear ? 'is-invalid border-danger' : ''
                  }`}
                />
                {formik.touched.publicationYear && formik.errors.publicationYear && (
                  <div className="invalid-feedback fw-medium mt-1">{formik.errors.publicationYear}</div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="d-flex gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-light border px-4 rounded-2 text-secondary"
                  onClick={() => navigate('/')}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary px-4 rounded-2 fw-semibold shadow-sm"
                  disabled={formik.isSubmitting}
                >
                  {isEditMode ? 'Save Changes' : 'Add Book'}
                </button>
              </div>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}