import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useBooks } from "../hooks/useBooks";
import { BookOpen, Users, Tag, Calendar, TrendingUp, Star, Plus } from "lucide-react";
import { getGenreColor } from "../utils";

function StatCard({ icon: Icon, label, value, color, sub }) {
  return (
    <div className="card p-5 flex items-start gap-4 hover:shadow-card-hover transition-shadow duration-200">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-surface-900 dark:text-surface-50 font-display">
          {value}
        </p>
        <p className="text-sm text-surface-500 dark:text-surface-400 mt-0.5">{label}</p>
        {sub && (
          <p className="text-sm text-brand-500 dark:text-brand-400 mt-1 font-medium">{sub}</p>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage({ onAddBook }) {
  const { data: books = [], isLoading } = useBooks();

  const stats = useMemo(() => {
    if (!books.length) return null;

    const genres = books.reduce((acc, b) => {
      acc[b.genre] = (acc[b.genre] || 0) + 1;
      return acc;
    }, {});

    const topGenre = Object.entries(genres).sort((a, b) => b[1] - a[1])[0];
    const authors = [...new Set(books.map((b) => b.author))];
    const years = books.map((b) => b.publicationYear).filter(Boolean);
    const avgYear = years.length
      ? Math.round(years.reduce((a, b) => a + b, 0) / years.length)
      : null;
    const recent = [...books]
      .sort((a, b) => (b.publicationYear || 0) - (a.publicationYear || 0))
      .slice(0, 5);

    return { genres, topGenre, authors, avgYear, recent };
  }, [books]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50 font-display">
            Dashboard
          </h1>
          <p className="text-md text-surface-400 dark:text-surface-500 mt-0.5">
            Your reading collection at a glance
          </p>
        </div>
        <button onClick={onAddBook} className="btn-primary">
          <Plus className="w-4 h-4" />
          Add Book
        </button>
      </div>

      {/* Stats */}
      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card p-5 h-24 shimmer" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={BookOpen}
            label="Total Books"
            value={books.length}
            color="bg-brand-100 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400"
            sub={books.length > 0 ? "In collection" : "Start adding!"}
          />
          <StatCard
            icon={Users}
            label="Unique Authors"
            value={stats?.authors.length ?? 0}
            color="bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400"
          />
          <StatCard
            icon={Tag}
            label="Genres"
            value={Object.keys(stats?.genres ?? {}).length}
            color="bg-cyan-100 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400"
            sub={stats?.topGenre ? `Top: ${stats.topGenre[0]}` : null}
          />
          <StatCard
            icon={Calendar}
            label="Avg. Year"
            value={stats?.avgYear ?? "—"}
            color="bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400"
          />
        </div>
      )}

      {/* Bottom row: recent + genre breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Recent books */}
        <div className="card lg:col-span-3 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-50 font-display flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-brand-500" />
              Recent Additions
            </h2>
            <Link
              to="/books"
              className="text-md text-brand-600 dark:text-brand-400 hover:underline font-medium"
            >
              View all →
            </Link>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 shimmer rounded-xl" />
              ))}
            </div>
          ) : stats?.recent.length ? (
            <div className="space-y-1">
              {stats.recent.map((book) => (
                <div
                  key={book.id}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-800 transition"
                >
                  <div className="w-12 h-14 rounded-lg overflow-hidden bg-surface-100 dark:bg-surface-800 flex-shrink-0">
                    {book.coverImage ? (
                      <img
                        src={book.coverImage}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-surface-300">
                        <BookOpen className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-md font-medium text-surface-900 dark:text-surface-50 truncate">
                      {book.title}
                    </p>
                    <p className="text-sm text-surface-400 dark:text-surface-500 truncate">
                      {book.author} · {book.publicationYear}
                    </p>
                  </div>
                  <span
                    className={`badge text-[15px] hidden sm:inline-flex ${getGenreColor(book.genre)}`}
                  >
                    {book.genre}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center">
              <p className="text-md text-surface-400">
                No books yet.{" "}
                <button
                  onClick={onAddBook}
                  className="text-brand-600 dark:text-brand-400 font-medium hover:underline"
                >
                  Add one!
                </button>
              </p>
            </div>
          )}
        </div>

        {/* Genre breakdown */}
        <div className="card lg:col-span-2 p-5">
          <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-50 font-display flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-amber-500" />
            Genre Breakdown
          </h2>

          {isLoading ? (
            <div className="space-y-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-8 shimmer rounded-lg" />
              ))}
            </div>
          ) : stats ? (
            <div className="space-y-3">
              {Object.entries(stats.genres)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 8)
                .map(([genre, count]) => (
                  <div key={genre}>
                    <div className="flex justify-between text-lg mb-1">
                      <span className="text-surface-700 dark:text-surface-300 font-medium">
                        {genre}
                      </span>
                      <span className="text-surface-400 dark:text-surface-500">{count}</span>
                    </div>
                    <div className="h-1.5 bg-surface-100 dark:bg-surface-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-500 rounded-full transition-all duration-700"
                        style={{ width: `${(count / books.length) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-sm text-surface-400 text-center py-10">
              No data yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}