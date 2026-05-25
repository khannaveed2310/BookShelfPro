// import { useState } from "react";
// import { Edit2, Trash2, Calendar, User } from "lucide-react";
// import { getGenreColor, getFallbackCover } from "../../utils";

// export default function BookCard({ book, onEdit, onDelete }) {
//   const [imgError, setImgError] = useState(false);
//   const [imgLoaded, setImgLoaded] = useState(false);

//   const coverSrc =
//     book.coverImage && !imgError
//       ? book.coverImage
//       : getFallbackCover(book.title, book.author);

//   return (
//     <div className="card group overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 animate-fade-in">
//       {/* Cover */}
//       <div className="relative aspect-[2/3] overflow-hidden bg-surface-100 dark:bg-surface-800">
//         {!imgLoaded && <div className="absolute inset-0 shimmer" />}

//         <img
//           src={coverSrc}
//           alt={book.title}
//           onLoad={() => setImgLoaded(true)}
//           onError={() => { setImgError(true); setImgLoaded(true); }}
//           className={`w-full h-full object-cover transition-opacity duration-500 ${
//             imgLoaded ? "opacity-100" : "opacity-0"
//           }`}
//         />

//         {/* Hover overlay with actions */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-center pb-4 gap-2">
//           <button
//             onClick={() => onEdit(book)}
//             className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-sm text-white text-xs font-medium hover:bg-white/30 transition border border-white/20"
//           >
//             <Edit2 className="w-3 h-3" />
//             Edit
//           </button>
//           <button
//             onClick={() => onDelete(book)}
//             className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/80 backdrop-blur-sm text-white text-xs font-medium hover:bg-red-600/80 transition"
//           >
//             <Trash2 className="w-3 h-3" />
//             Delete
//           </button>
//         </div>
//       </div>

//       {/* Card body */}
//       <div className="p-4">
//         <div className="mb-2">
//           <span className={`badge text-[10px] ${getGenreColor(book.genre)}`}>
//             {book.genre}
//           </span>
//         </div>

//         <h3
//           className="text-sm font-semibold text-surface-900 dark:text-surface-50 line-clamp-2 mb-1.5 font-display leading-snug"
//           title={book.title}
//         >
//           {book.title}
//         </h3>

//         <div className="flex items-center gap-1.5 text-xs text-surface-500 dark:text-surface-400 mb-1">
//           <User className="w-3 h-3 flex-shrink-0" />
//           <span className="truncate">{book.author}</span>
//         </div>

//         <div className="flex items-center gap-1.5 text-xs text-surface-400 dark:text-surface-500">
//           <Calendar className="w-3 h-3 flex-shrink-0" />
//           <span>{book.publicationYear}</span>
//         </div>
//       </div>
//     </div>
//   );
// }






































import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import { Edit2, Trash2, Calendar, User } from "lucide-react";
import { getGenreColor, getFallbackCover } from "../../utils";

export default function BookCard({ book, onEdit, onDelete }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const coverSrc =
    book.coverImage && !imgError
      ? book.coverImage
      : getFallbackCover(book.title, book.author);

  return (
    // Wrap entire card component with a react-router Link
    <Link 
      to={`/books/${book.id}`}
      className="card group block overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 animate-fade-in text-left cursor-pointer"
    >
      {/* Cover */}
      <div className="relative aspect-[2/3] overflow-hidden bg-surface-100 dark:bg-surface-800">
        {!imgLoaded && <div className="absolute inset-0 shimmer" />}

        <img
          src={coverSrc}
          alt={book.title}
          onLoad={() => setImgLoaded(true)}
          onError={() => { setImgError(true); setImgLoaded(true); }}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Hover overlay with actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-center pb-4 gap-2">
          <button
            onClick={(e) => {
              e.preventDefault(); // Stop Link navigation
              e.stopPropagation(); // Stop parent bubbling
              onEdit(book);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-sm text-white text-xs font-medium hover:bg-white/30 transition border border-white/20"
          >
            <Edit2 className="w-3 h-3" />
            Edit
          </button>
          <button
            onClick={(e) => {
              e.preventDefault(); // Stop Link navigation
              e.stopPropagation(); // Stop parent bubbling
              onDelete(book);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/80 backdrop-blur-sm text-white text-xs font-medium hover:bg-red-600/80 transition"
          >
            <Trash2 className="w-3 h-3" />
            Delete
          </button>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        <div className="mb-2">
          <span className={`badge text-[10px] ${getGenreColor(book.genre)}`}>
            {book.genre}
          </span>
        </div>

        <h3
          className="text-sm font-semibold text-surface-900 dark:text-surface-50 line-clamp-2 mb-1.5 font-display leading-snug"
          title={book.title}
        >
          {book.title}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-surface-500 dark:text-surface-400 mb-1">
          <User className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{book.author}</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-surface-400 dark:text-surface-500">
          <Calendar className="w-3 h-3 flex-shrink-0" />
          <span>{book.publicationYear}</span>
        </div>
      </div>
    </Link>
  );
}