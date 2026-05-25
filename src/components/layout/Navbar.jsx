import { Menu, Search, Moon, Sun, Plus } from "lucide-react";
import { useDarkMode } from "../../hooks/useDarkMode";

export default function Navbar({ onMenuClick, search, onSearchChange, onAddBook }) {
  const { isDark, toggle } = useDarkMode();

  return (
    <header className="sticky top-0 z-20 h-20 flex items-center gap-4 px-4 lg:px-6 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-800">
      {/* Hamburger – mobile only */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-500 transition"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Search bar */}
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
        <input
          type="text"
          placeholder="Search books, authors…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm bg-surface-50 dark:bg-surface-800
                     border border-surface-200 dark:border-surface-700 rounded-xl
                     text-surface-900 dark:text-surface-100 placeholder-surface-400
                     focus:outline-none focus:ring-2 focus:ring-brand-500
                     focus:border-transparent transition-all"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Dark mode toggle */}
        <button
          onClick={toggle}
          className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-500 dark:text-surface-400 transition"
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>

        {/* User avatar */}
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold shadow-sm cursor-pointer select-none">
          A
        </div>
      </div>
    </header>
  );
}