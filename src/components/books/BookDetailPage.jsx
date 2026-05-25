import { useParams, Link, Navigate } from "react-router-dom";
import { useBooks } from "../../hooks/useBooks";
import { ChevronLeft, Calendar, User, Bookmark } from "lucide-react";
import { getGenreColor } from "../../utils";

export default function BookDetailPage() {
  const { id } = useParams();
  const { data: books = [], isLoading } = useBooks();

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Find the exact matching book record
  const book = books.find((b) => String(b.id) === String(id));

  // If no matching book is found in the current state, redirect to 404
  if (!book) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in pt-4">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-surface-500 hover:text-white transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to collection
      </Link>

      <div className="bg-[#1a1a1e] border border-surface-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 shadow-xl">
        {/* Book Cover Frame */}
        <div className="w-full md:w-56 max-w-[240px] mx-auto aspect-[2/3] rounded-xl overflow-hidden shadow-lg bg-surface-800 border border-surface-700/50 flex-shrink-0">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Detailed Meta Data Column */}
        <div className="flex-1 space-y-4 text-left flex flex-col justify-center">
          <div>
            <span className={`badge text-xs px-2.5 py-1 ${getGenreColor(book.genre)}`}>
              {book.genre}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-white font-display mt-3 leading-tight">
              {book.title}
            </h1>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-surface-800">
            <div className="flex items-center gap-3 text-surface-300">
              <User className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <span className="text-sm font-medium"><b className="text-surface-500">Author:</b> {book.author}</span>
            </div>

            <div className="flex items-center gap-3 text-surface-300">
              <Calendar className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <span className="text-sm font-medium"><b className="text-surface-500">Published:</b> {book.publicationYear}</span>
            </div>

            <div className="flex items-center gap-3 text-surface-300">
              <Bookmark className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <span className="text-sm font-medium"><b className="text-surface-500">Storage ID:</b> {book.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}