import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios.js";

const initialState = {
  latestOrder: null,
  orders: [],
  status: "idle",
  error: null,
};

export const fetchLatestOrder = createAsyncThunk(
  "orders/fetchLatestOrder",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/cart/orders/latest/");
      return response.data?.order ?? null;
    } catch (error) {
      return rejectWithValue(error.response?.data || { error: error.message });
    }
  },
);

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/cart/orders/create/", payload);
      return response.data?.order ?? null;
    } catch (error) {
      return rejectWithValue(error.response?.data || { error: error.message });
    }
  },
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLatestOrder.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchLatestOrder.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.latestOrder = action.payload;
      })
      .addCase(fetchLatestOrder.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload?.error || action.error.message;
      })
      .addCase(createOrder.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.latestOrder = action.payload;
        if (action.payload) {
          state.orders = [action.payload, ...state.orders.filter((item) => item.id !== action.payload.id)];
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload?.error || action.error.message;
      })
      .addCase("auth/fetchLogout/fulfilled", (state) => {
        state.latestOrder = null;
        state.orders = [];
        state.status = "idle";
        state.error = null;
      })
      .addCase("auth/logoutLocally", (state) => {
        state.latestOrder = null;
        state.orders = [];
        state.status = "idle";
        state.error = null;
      });
  },
});

export const orderReducer = orderSlice.reducer;
