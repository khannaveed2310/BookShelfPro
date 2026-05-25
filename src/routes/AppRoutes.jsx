import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import BooksPage from "../pages/BooksPage";
import BookDetailPage from "../components/books/BookDetailPage";
import NotFoundPage from "../pages/NotFoundPage";

export default function AppRoutes({ search, onAddBook, onEdit, onDelete }) {
  return (
    <Routes>
      <Route
        path="/"
        element={<DashboardPage onAddBook={onAddBook} />}
      />
      <Route
        path="/books"
        element={
          <BooksPage
            search={search}
            onAddBook={onAddBook}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        }
      />
      <Route
        path="/books/:id"
        element={<BookDetailPage/>}

      />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}