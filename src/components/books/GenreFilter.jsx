import { GENRES } from "../../schemas/book";
import { Filter } from "lucide-react";

export default function GenreFilter({ selected, onChange }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wide mr-1">
        <Filter className="w-3.5 h-3.5" />
        Filter
      </span>

      <button
        onClick={() => onChange("")}
        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          !selected
            ? "bg-brand-600 text-white shadow-sm"
            : "bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-300 border border-surface-200 dark:border-surface-700 hover:border-surface-300"
        }`}
      >
        All
      </button>

      {GENRES.map((g) => (
        <button
          key={g}
          onClick={() => onChange(g === selected ? "" : g)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            selected === g
              ? "bg-brand-600 text-white shadow-sm"
              : "bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-300 border border-surface-200 dark:border-surface-700 hover:border-surface-300"
          }`}
        >
          {g}
        </button>
      ))}
    </div>
  );
}