import apiClient from "../lib/axios";

export const booksApi = {
  getAll: async () => {
    const { data } = await apiClient.get("/books");
    return data;
  },

  getById: async (id) => {
    const { data } = await apiClient.get(`/books/${id}`);
    return data;
  },

  create: async (book) => {
    const { data } = await apiClient.post("/books", book);
    return data;
  },

  update: async ({ id, ...book }) => {
    const { data } = await apiClient.put(`/books/${id}`, book);
    return data;
  },

  delete: async (id) => {
    const { data } = await apiClient.delete(`/books/${id}`);
    return data;
  },
};