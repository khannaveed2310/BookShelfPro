import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { booksApi } from "../api/books";
import { toast } from "sonner";

export const BOOKS_KEY = ["books"];

export function useBooks() {
  return useQuery({
    queryKey: BOOKS_KEY,
    queryFn: booksApi.getAll,
    staleTime: 1000 * 60 * 2,
  });
}

export function useAddBook() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: booksApi.create,
    onSuccess: (newBook) => {
      qc.setQueryData(BOOKS_KEY, (old = []) => [newBook, ...old]);
      toast.success("Book added successfully!");
    },
    onError: (err) => toast.error(err.message),
  });
}

export function useUpdateBook() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: booksApi.update,
    onMutate: async (updated) => {
      await qc.cancelQueries({ queryKey: BOOKS_KEY });
      const prev = qc.getQueryData(BOOKS_KEY);
      qc.setQueryData(BOOKS_KEY, (old = []) =>
        old.map((b) => (b.id === updated.id ? { ...b, ...updated } : b))
      );
      return { prev };
    },
    onSuccess: () => toast.success("Book updated successfully!"),
    onError: (err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(BOOKS_KEY, ctx.prev);
      toast.error(err.message);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: BOOKS_KEY }),
  });
}

export function useDeleteBook() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: booksApi.delete,
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: BOOKS_KEY });
      const prev = qc.getQueryData(BOOKS_KEY);
      qc.setQueryData(BOOKS_KEY, (old = []) =>
        old.filter((b) => b.id !== id)
      );
      return { prev };
    },
    onSuccess: () => toast.success("Book deleted successfully!"),
    onError: (err, _id, ctx) => {
      if (ctx?.prev) qc.setQueryData(BOOKS_KEY, ctx.prev);
      toast.error(err.message);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: BOOKS_KEY }),
  });
}