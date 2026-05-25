export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const GENRE_COLORS = {
  Fiction:         "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  "Non-Fiction":   "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  Mystery:         "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  "Science Fiction":"bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
  Fantasy:         "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  Romance:         "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  Thriller:        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  Horror:          "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  Biography:       "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  History:         "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  "Self-Help":     "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  Science:         "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
  Philosophy:      "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  "Children's":    "bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-300",
  "Young Adult":   "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  Poetry:          "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300",
  "Graphic Novel": "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
  Other:           "bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-400",
};

export function getGenreColor(genre) {
  return GENRE_COLORS[genre] || GENRE_COLORS["Other"];
}

export function getFallbackCover(title = "", author = "") {
  const palettes = [
    ["1e1b4b", "818cf8"],
    ["0c4a6e", "38bdf8"],
    ["064e3b", "34d399"],
    ["450a0a", "f87171"],
    ["431407", "fb923c"],
    ["2e1065", "c084fc"],
  ];
  const idx = (title.charCodeAt(0) || 0) % palettes.length;
  const [bg, fg] = palettes[idx];
  const initials = [title[0], author[0]].filter(Boolean).join("").toUpperCase();
  return `https://placehold.co/400x600/${bg}/${fg}?text=${encodeURIComponent(initials || "📚")}`;
}