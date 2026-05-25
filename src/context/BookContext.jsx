import axios from "axios";
import { createContext, useEffect, useState } from "react";


// 1. Create the Book Context
export let BookContext = createContext();

export default function BookContextProvider(props) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // PLACE YOUR API URL HERE (e.g., MockAPI or JSON Server URL)
    const API_URL = "https://6a144f106c7db8aac054459a.mockapi.io/books"; 

    // 2. Fetch all books from API using Axios
    const fetchBooks = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(API_URL);
            // Axios automatically puts the response data inside response.data
            setBooks(response.data);
        } catch (err) {
            // Catching Axios error message properly
            setError(err.response?.data?.message || err.message || "Failed to fetch books.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch books automatically when the component mounts
    useEffect(() => {
        fetchBooks();
    }, []);

    // 3. Add a new book using Axios
    const addBook = async (newBook) => {
        try {
            const response = await axios.post(API_URL, newBook);
            
            // Update UI state locally with the newly created book from response.data
            setBooks((prevBooks) => [...prevBooks, response.data]);
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to add book.");
        }
    };

    // 4. Update an existing book using Axios
    const updateBook = async (id, updatedData) => {
        try {
            await axios.put(`${API_URL}/${id}`, updatedData);
            
            // Update UI state locally
            setBooks((prevBooks) =>
                prevBooks.map((book) => (book.id === id ? { ...book, ...updatedData } : book))
            );
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to update book.");
        }
    };

    // 5. Delete a book using Axios
    const deleteBook = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            
            // Remove from UI state locally
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to delete book.");
        }
    };

    return (
        <BookContext.Provider value={{ books, loading, error, addBook, updateBook, deleteBook, fetchBooks }}>
            {props.children}
        </BookContext.Provider>
    );
}