import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { DarkModeProvider } from "./hooks/useDarkMode";
import AppLayout from "./components/layout/AppLayout";
import AppRoutes from "./routes/AppRoutes";
import BookFormModal from "./components/books/BookFormModal";
import ConfirmModal from "./components/common/ConfirmModal";
import { useAddBook, useUpdateBook, useDeleteBook } from "./hooks/useBooks";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

function AppInner() {
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const addBook = useAddBook();
  const updateBook = useUpdateBook();
  const deleteBook = useDeleteBook();

  const handleAddOpen = () => {
    setEditBook(null);
    setFormOpen(true);
  };

  const handleEdit = (book) => {
    setEditBook(book);
    setFormOpen(true);
  };

  const handleDelete = (book) => {
    setDeleteTarget(book);
  };

  const handleFormSubmit = async (data) => {
    if (editBook) {
      await updateBook.mutateAsync(data);
    } else {
      await addBook.mutateAsync(data);
    }
    setFormOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteBook.mutateAsync(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <AppLayout
      search={search}
      onSearchChange={setSearch}
      onAddBook={handleAddOpen}
    >
      <AppRoutes
        search={search}
        onAddBook={handleAddOpen}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <BookFormModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        defaultValues={editBook}
        isLoading={addBook.isPending || updateBook.isPending}
      />

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title={`Delete "${deleteTarget?.title}"?`}
        description="This action cannot be undone. The book will be permanently removed from your collection."
        loading={deleteBook.isPending}
      />
    </AppLayout>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <BrowserRouter>
          <AppInner />
          <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{ style: { fontFamily: "DM Sans, sans-serif" } }}
          />
        </BrowserRouter>
      </DarkModeProvider>
    </QueryClientProvider>
  );
}