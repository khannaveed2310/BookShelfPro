import { BookOpen, Plus } from "lucide-react";

export default function EmptyState({ onAdd, filtered = false }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
      <div className="w-20 h-20 rounded-3xl bg-brand-50 dark:bg-brand-950/50 flex items-center justify-center mb-5">
        <BookOpen className="w-10 h-10 text-brand-400" />
      </div>

      <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-200 mb-2 font-display">
        {filtered ? "No books match your search" : "Your bookshelf is empty"}
      </h3>

      <p className="text-sm text-surface-400 dark:text-surface-500 max-w-xs mb-6 leading-relaxed">
        {filtered
          ? "Try adjusting your search or filter to find what you're looking for."
          : "Get started by adding your first book to the collection."}
      </p>

      {!filtered && (
        <button onClick={onAdd} className="btn-primary">
          <Plus className="w-4 h-4" />
          Add your first book
        </button>
      )}
    </div>
  );
}