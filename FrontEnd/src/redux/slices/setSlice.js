import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  sets: [],
  status: "pending",
  error: null,
};

export const fetchSets = createAsyncThunk(
  "sets/fetchSets",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/products/", {
        withCredentials: false,
      });
      return response.data;
    } catch (error) {
      try {
        const fallbackResponse = await fetch("/products/");
        if (!fallbackResponse.ok) {
          throw new Error(`Request failed with status ${fallbackResponse.status}`);
        }

        return await fallbackResponse.json();
      } catch (fallbackError) {
        return rejectWithValue({
          error: fallbackError.message || error.message,
        });
      }
    }
  },
);

const setsSlice = createSlice({
  name: "sets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSets.pending, (state) => {
        state.status = "pending";
        state.error = null;
        state.sets = [];
      })
      .addCase(fetchSets.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.sets = action.payload.products;
      })
      .addCase(fetchSets.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload?.error || "error";
        state.sets = [];
      });
  },
});
export const setsReducer = setsSlice.reducer;
