import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BookList from './components/BookList/BookList';
import BookForm from './components/BookForm/BookForm';
import NotFound from './components/NotFound/NotFound';
import './App.css';
import BookContextProvider from './context/BookContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // الآن بمجرد فتح الموقع (/) ستظهر قائمة الكتب فوراً كصفحة رئيسية
      { index: true, element: <BookList /> }, 
      { path: 'add-book', element: <BookForm /> },
      { path: 'edit-book/:id', element: <BookForm /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
function App() {
  return <>
  <BookContextProvider>
    <RouterProvider router={router} >
    </RouterProvider>
  </BookContextProvider>
  </> 

}

export default App;