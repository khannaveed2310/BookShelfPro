import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import BooksPage from "../pages/BooksPage";

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
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}