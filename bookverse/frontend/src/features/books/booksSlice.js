
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async () => {
    const response = await axios.get(
      "http://localhost:5001/api/books"
    );

    return response.data;
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState: {
    items: [],
    loading: false
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      });
  }
});

export default booksSlice.reducer;
