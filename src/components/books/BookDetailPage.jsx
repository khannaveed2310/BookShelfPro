import { useParams, Link, Navigate } from "react-router-dom";
import { useBooks } from "../../hooks/useBooks";
import { ChevronLeft, Calendar, User, Bookmark } from "lucide-react";
import { getGenreColor } from "../../utils";

export default function BookDetailPage() {
  const { id } = useParams();
  const { data: books = [], isLoading } = useBooks();

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
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
    // Centered layout block wrapper
    <div className="min-h-[80vh] w-full flex flex-col justify-center items-center px-4 py-8 animate-fade-in">
      <div className="w-full max-w-3xl space-y-4">
        

        <div className="text-left">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-lg font-medium text-surface-500 hover:text-brand-600 dark:hover:text-white transition-colors mb-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to collection
          </Link>
        </div>

        <div className="bg-white dark:bg-[#1a1a1e] border border-surface-200 dark:border-surface-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 shadow-xl text-left w-full">
          
          {/* Book Cover Frame */}
          <div className="w-full md:w-56 max-w-[240px] mx-auto aspect-[2/3] rounded-xl overflow-hidden shadow-lg bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700/50 flex-shrink-0">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Detailed Meta Data Column */}
          <div className="flex-1 space-y-4 flex flex-col justify-center">
            <div>
              <span className={`badge text-xs px-2.5 py-1 ${getGenreColor(book.genre)}`}>
                {book.genre}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white font-display mt-3 leading-tight">
                {book.title}
              </h1>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-surface-200 dark:border-surface-800/60">
              <div className="flex items-center gap-3 text-surface-700 dark:text-surface-300">
                <User className="w-4 h-4 text-brand-600 dark:text-indigo-400 flex-shrink-0" />
                <span className="text-sm font-medium">
                  <b className="text-surface-400 dark:text-surface-500 font-semibold mr-1">Author:</b> 
                  {book.author}
                </span>
              </div>

              <div className="flex items-center gap-3 text-surface-700 dark:text-surface-300">
                <Calendar className="w-4 h-4 text-brand-600 dark:text-indigo-400 flex-shrink-0" />
                <span className="text-sm font-medium">
                  <b className="text-surface-400 dark:text-surface-500 font-semibold mr-1">Published:</b> 
                  {book.publicationYear}
                </span>
              </div>

              <div className="flex items-center gap-3 text-surface-700 dark:text-surface-300">
                <Bookmark className="w-4 h-4 text-brand-600 dark:text-indigo-400 flex-shrink-0" />
                <span className="text-sm font-medium">
                  <b className="text-surface-400 dark:text-surface-500 font-semibold mr-1">Storage ID:</b> 
                  {book.id}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}