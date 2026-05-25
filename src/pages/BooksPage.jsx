import { useMemo, useState } from "react";
import BookCard from "../components/books/BookCard";
import GenreFilter from "../components/books/GenreFilter";
import { GridSkeleton } from "../components/common/Skeletons";
import EmptyState from "../components/common/EmptyState";
import ErrorState from "../components/common/ErrorState";
import { useBooks } from "../hooks/useBooks";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 12;

export default function BooksPage({ search, onAddBook, onEdit, onDelete }) {
  const [genre, setGenre] = useState("");
  const [page, setPage] = useState(1);

  const { data: books = [], isLoading, isError, error, refetch } = useBooks();

  const filtered = useMemo(() => {
    let result = books;
    const q = search.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (b) =>
          b.title?.toLowerCase().includes(q) ||
          b.author?.toLowerCase().includes(q)
      );
    }
    if (genre) result = result.filter((b) => b.genre === genre);
    return result;
  }, [books, search, genre]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safeP = Math.min(page, totalPages);
  const paginated = filtered.slice((safeP - 1) * PAGE_SIZE, safeP * PAGE_SIZE);

  const handleGenreChange = (g) => {
    setGenre(g);
    setPage(1);
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50 font-display">
            All Books
          </h1>
          <p className="text-sm text-surface-400 dark:text-surface-500 mt-0.5">
            {isLoading
              ? "Loading…"
              : `${filtered.length} book${filtered.length !== 1 ? "s" : ""}${
                  genre || search ? " found" : " in collection"
                }`}
          </p>
        </div>
        <button onClick={onAddBook} className="btn-primary">
          <BookOpen className="w-4 h-4" />
          Add Book
        </button>
      </div>

      {/* Genre filter — horizontally scrollable on mobile */}
      <div className="overflow-x-auto pb-1 -mx-4 px-4">
        <GenreFilter selected={genre} onChange={handleGenreChange} />
      </div>

      {/* Content */}
      {isLoading ? (
        <GridSkeleton count={PAGE_SIZE} />
      ) : isError ? (
        <ErrorState message={error?.message} onRetry={refetch} />
      ) : filtered.length === 0 ? (
        <EmptyState onAdd={onAddBook} filtered={!!(search || genre)} />
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 lg:gap-5">
            {paginated.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safeP === 1}
                className="btn-secondary px-3 py-2 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (p) =>
                    p === 1 ||
                    p === totalPages ||
                    Math.abs(p - safeP) <= 1
                )
                .reduce((acc, p, idx, arr) => {
                  if (idx > 0 && p - arr[idx - 1] > 1) acc.push("…");
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) =>
                  p === "…" ? (
                    <span key={`dots-${i}`} className="px-2 text-surface-400 text-sm">
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-9 h-9 rounded-xl text-sm font-semibold transition ${
                        safeP === p
                          ? "bg-brand-600 text-white shadow-sm"
                          : "bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-300 border border-surface-200 dark:border-surface-700 hover:border-brand-300"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safeP === totalPages}
                className="btn-secondary px-3 py-2 disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}