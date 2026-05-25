import { z } from "zod";

const currentYear = new Date().getFullYear();

export const bookSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(120, "Title must be under 120 characters")
    .trim(),
  author: z
    .string()
    .min(1, "Author is required")
    .max(80, "Author must be under 80 characters")
    .trim(),
  genre: z.string().min(1, "Please select a genre"),
  publicationYear: z
    .number({ invalid_type_error: "Enter a valid year" })
    .int("Year must be a whole number")
    .min(1000, "Year must be after 1000")
    .max(currentYear, `Year cannot exceed ${currentYear}`),
  coverImage: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
});

export const GENRES = [
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Science Fiction",
  "Thriller",
  "Horror",
  "Biography",
  "History",
  "Self-Help",
  "Science",
  "Philosophy",
  "Children's",
  "Poetry",
  "Graphic Novel",
  "Other",
];