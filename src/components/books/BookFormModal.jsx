// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { bookSchema, GENRES } from "../../schemas/book";
// import { Loader2, BookOpen } from "lucide-react";
// import Modal from "../common/Modal";

// function Field({ label, error, children }) {
//   return (
//     <div>
//       <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1.5 uppercase tracking-wide">
//         {label}
//       </label>
//       {children}
//       {error && (
//         <p className="form-error">
//           <span>⚠</span> {error}
//         </p>
//       )}
//     </div>
//   );
// }

// export default function BookFormModal({
//   isOpen,
//   onClose,
//   onSubmit,
//   defaultValues,
//   isLoading,
// }) {
//   const isEditing = !!defaultValues?.id;

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(bookSchema),
//     defaultValues: {
//       title: "",
//       author: "",
//       genre: "",
//       publicationYear: new Date().getFullYear(),
//       coverImage: "",
//     },
//   });

//   useEffect(() => {
//     if (isOpen) {
//       reset(
//         defaultValues
//           ? {
//               title: defaultValues.title || "",
//               author: defaultValues.author || "",
//               genre: defaultValues.genre || "",
//               publicationYear:
//                 defaultValues.publicationYear || new Date().getFullYear(),
//               coverImage: defaultValues.coverImage || "",
//             }
//           : {
//               title: "",
//               author: "",
//               genre: "",
//               publicationYear: new Date().getFullYear(),
//               coverImage: "",
//             }
//       );
//     }
//   }, [isOpen, defaultValues, reset]);

//   const handleClose = () => {
//     reset();
//     onClose();
//   };

//   const submit = (data) => {
//     onSubmit(isEditing ? { ...data, id: defaultValues.id } : data);
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={handleClose}
//       title={isEditing ? "Edit Book" : "Add New Book"}
//     >
//       <form onSubmit={handleSubmit(submit)} className="space-y-4" noValidate>
//         <Field label="Title *" error={errors.title?.message}>
//           <input
//             {...register("title")}
//             placeholder="Enter Book Title"
//             className="form-input"
//             autoFocus
//           />
//         </Field>

//         <Field label="Author *" error={errors.author?.message}>
//           <input
//             {...register("author")}
//             placeholder="Enter Author Name"
//             className="form-input"
//           />
//         </Field>

//         <div className="grid grid-cols-2 gap-4">
//           <Field label="Genre *" error={errors.genre?.message}>
//             <select {...register("genre")} className="form-input">
//               <option value="">Select genre…</option>
//               {GENRES.map((g) => (
//                 <option key={g} value={g}>
//                   {g}
//                 </option>
//               ))}
//             </select>
//           </Field>

//           <Field label="Year *" error={errors.publicationYear?.message}>
//             <input
//               {...register("publicationYear", { valueAsNumber: true })}
//               type="number"
//               placeholder="2024"
//               min={1000}
//               max={new Date().getFullYear()}
//               className="form-input"
//             />
//           </Field>
//         </div>

//         <Field label="Cover Image URL" error={errors.coverImage?.message}>
//           <input
//             {...register("coverImage")}
//             placeholder="https://example.com/cover.jpg"
//             className="form-input"
//             type="url"
//           />
//         </Field>

//         <div className="flex gap-3 pt-2 border-t border-surface-100 dark:border-surface-800 mt-5">
//           <button
//             type="button"
//             onClick={handleClose}
//             disabled={isLoading}
//             className="btn-secondary flex-1 justify-center"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="btn-primary flex-1 justify-center"
//           >
//             {isLoading ? (
//               <>
//                 <Loader2 className="w-4 h-4 animate-spin" />
//                 Saving…
//               </>
//             ) : (
//               <>
//                 <BookOpen className="w-4 h-4" />
//                 {isEditing ? "Update Book" : "Add Book"}
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </Modal>
//   );
// }

import { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookSchema, GENRES } from "../../schemas/book";
import { Loader2, BookOpen, ChevronDown, Calendar } from "lucide-react";
import Modal from "../common/Modal";

// Generate an array of years from Current Year down to 1900
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from(
  { length: CURRENT_YEAR - 1900 + 1 },
  (_, i) => CURRENT_YEAR - i,
);

function Field({ label, error, children }) {
  return (
    <div className="relative">
      <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      {children}
      {error && (
        <p className="form-error mt-1 flex items-center gap-1 text-xs text-red-500 absolute -bottom-5 left-0">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}

export default function BookFormModal({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
  isLoading,
}) {
  const isEditing = !!defaultValues?.id;

  // Separate refs and states for the custom Genre and Year dropdowns
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const genreRef = useRef(null);
  const yearRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      publicationYear: CURRENT_YEAR,
      coverImage: "",
    },
  });

  // Handle clicking outside custom dropdown elements to close them safely
  useEffect(() => {
    function handleClickOutside(event) {
      if (genreRef.current && !genreRef.current.contains(event.target)) {
        setIsGenreOpen(false);
      }
      if (yearRef.current && !yearRef.current.contains(event.target)) {
        setIsYearOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      reset(
        defaultValues
          ? {
              title: defaultValues.title || "",
              author: defaultValues.author || "",
              genre: defaultValues.genre || "",
              publicationYear: defaultValues.publicationYear || CURRENT_YEAR,
              coverImage: defaultValues.coverImage || "",
            }
          : {
              title: "",
              author: "",
              genre: "",
              publicationYear: CURRENT_YEAR,
              coverImage: "",
            },
      );
    }
  }, [isOpen, defaultValues, reset]);

  const handleClose = () => {
    reset();
    setIsGenreOpen(false);
    setIsYearOpen(false);
    onClose();
  };

  // Cleans messy URLs copied straight from Google Image search frames
  const cleanGoogleImageUrl = (url) => {
    if (!url) return "";

    // Quick pre-check: If it doesn't even contain "google", leave it completely alone!
    if (!url.includes("google")) {
      return url;
    }

    try {
      const parsedUrl = new URL(url);
      if (
        parsedUrl.hostname.includes("google") &&
        parsedUrl.searchParams.has("imgurl")
      ) {
        return parsedUrl.searchParams.get("imgurl");
      }
    } catch (e) {
      console.warn("URL sanitizer fallback activated:", e);
    }

    return url;
  };

  const submit = (data) => {
    const cleanedData = {
      ...data,
      coverImage: cleanGoogleImageUrl(data.coverImage),
    };
    onSubmit(
      isEditing ? { ...cleanedData, id: defaultValues.id } : cleanedData,
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? "Edit Book" : "Add New Book"}
    >
      <form onSubmit={handleSubmit(submit)} className="space-y-6" noValidate>
        <Field label="Title *" error={errors.title?.message}>
          <input
            {...register("title")}
            placeholder="Enter Book Title"
            className="form-input w-full"
            autoFocus
          />
        </Field>

        <Field label="Author *" error={errors.author?.message}>
          <input
            {...register("author")}
            placeholder="Enter Author Name"
            className="form-input w-full"
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          {/* Custom Dropdown: Genre */}
          <Field label="Genre *" error={errors.genre?.message}>
            <Controller
              control={control}
              name="genre"
              render={({ field }) => (
                <div className="relative" ref={genreRef}>
                  <button
                    type="button"
                    onClick={() => !isLoading && setIsGenreOpen(!isGenreOpen)}
                    className="form-input w-full flex items-center justify-between text-left cursor-pointer"
                  >
                    <span
                      className={field.value ? "text-white" : "text-gray-400"}
                    >
                      {field.value || "Select genre…"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                        isGenreOpen ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isGenreOpen && (
                    <div className="absolute z-50 left-0 right-0 mt-1 bg-[#1a1a1e] border border-surface-800 rounded-lg shadow-xl overflow-hidden">
                      <div className="max-h-[150px] overflow-y-auto custom-scrollbar">
                        <button
                          type="button"
                          onClick={() => {
                            setValue("genre", "");
                            setIsGenreOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-400 hover:bg-surface-800 hover:text-white transition-colors"
                        >
                          Select genre…
                        </button>
                        {GENRES.map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => {
                              setValue("genre", g);
                              setIsGenreOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                              field.value === g
                                ? "bg-indigo-600 text-white font-medium"
                                : "text-gray-300 hover:bg-surface-800 hover:text-white"
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            />
          </Field>

          {/* New Calendar/Datepicker Style Custom Dropdown: Year */}
          <Field label="Year *" error={errors.publicationYear?.message}>
            <Controller
              control={control}
              name="publicationYear"
              render={({ field }) => (
                <div className="relative" ref={yearRef}>
                  <button
                    type="button"
                    onClick={() => !isLoading && setIsYearOpen(!isYearOpen)}
                    className="form-input w-full flex items-center justify-between text-left cursor-pointer"
                  >
                    <span className="text-white flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-indigo-400" />
                      {field.value}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                        isYearOpen ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isYearOpen && (
                    <div className="absolute z-50 left-0 right-0 mt-1 bg-[#1a1a1e] border border-surface-800 rounded-lg shadow-xl overflow-hidden">
                      <div className="max-h-[150px] overflow-y-auto custom-scrollbar">
                        {YEARS.map((y) => (
                          <button
                            key={y}
                            type="button"
                            onClick={() => {
                              setValue("publicationYear", y);
                              setIsYearOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                              field.value === y
                                ? "bg-indigo-600 text-white font-medium"
                                : "text-gray-300 hover:bg-surface-800 hover:text-white"
                            }`}
                          >
                            {y}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            />
          </Field>
        </div>

        <Field label="Cover Image URL" error={errors.coverImage?.message}>
          <input
            {...register("coverImage")}
            placeholder="https://example.com/cover.jpg"
            className="form-input w-full"
            type="url"
          />
        </Field>

        <div className="flex gap-3 pt-4 border-t border-surface-100 dark:border-surface-800 mt-6">
          <button
            type="button"
            onClick={handleClose}
            disabled={isLoading}
            className="btn-secondary flex-1 justify-center"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary flex-1 justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <BookOpen className="w-4 h-4" />
                {isEditing ? "Update Book" : "Add Book"}
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
