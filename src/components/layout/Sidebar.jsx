import { NavLink } from "react-router-dom";
import { BookOpen, LayoutGrid, BookMarked, TrendingUp, X } from "lucide-react";

const NAV = [
  { to: "/",       icon: LayoutGrid, label: "Dashboard" },
  { to: "/books",  icon: BookOpen,   label: "All Books"  },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-64
          bg-white dark:bg-surface-900
          border-r border-surface-200 dark:border-surface-800
          flex flex-col transition-transform duration-300 ease-out
          lg:translate-x-0 lg:static lg:z-auto
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-surface-100 dark:border-surface-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-brand-600 rounded-xl flex items-center justify-center shadow-sm">
              <BookMarked className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-surface-900 dark:text-white font-display tracking-tight">
                Bookshelf
              </p>
              <p className="text-[10px] text-surface-400 dark:text-surface-500 uppercase tracking-widest font-mono">
                Pro
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-400 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-surface-400 dark:text-surface-600 px-3 pb-2 pt-1">
            Navigation
          </p>
          {NAV.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
              onClick={onClose}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer tip */}
        <div className="p-4 border-t border-surface-100 dark:border-surface-800">
          <div className="rounded-xl bg-brand-50 dark:bg-brand-950/50 p-3.5">
            <div className="flex items-center gap-2 mb-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
              <p className="text-xs font-semibold text-brand-700 dark:text-brand-400">
                Quick Tip
              </p>
            </div>
            <p className="text-xs text-surface-500 dark:text-surface-400 leading-relaxed">
              Use search + genre filters to quickly find any book.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}