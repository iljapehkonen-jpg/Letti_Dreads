import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

const AUTH_STORAGE_KEY = "letti-auth-user";
const PINNED_STORAGE_KEY = "letti-cart-pinned";
const MIN_STRAND_QUANTITY = 10;
const MAX_STRAND_QUANTITY = 65;
const MIN_SET_QUANTITY = 1;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const hasStoredToken = () => {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    const parsedAuth = savedAuth ? JSON.parse(savedAuth) : null;
    return Boolean(parsedAuth?.token);
  } catch {
    return false;
  }
};

const isNotFoundError = (error) => Number(error?.response?.status) === 404;

const getUserId = (state) => state.auth.user?.id ?? null;

const getStoredAuthUserId = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    const parsedAuth = savedAuth ? JSON.parse(savedAuth) : null;
    return parsedAuth?.user?.id ?? null;
  } catch {
    return null;
  }
};

const loadPinnedItems = (userId) => {
  if (typeof window === "undefined" || !userId) {
    return [];
  }

  try {
    const saved = localStorage.getItem(PINNED_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : {};
    return Array.isArray(parsed[String(userId)]) ? parsed[String(userId)] : [];
  } catch {
    return [];
  }
};

const savePinnedItems = (userId, pinnedIds) => {
  if (typeof window === "undefined" || !userId) {
    return;
  }

  try {
    const saved = localStorage.getItem(PINNED_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : {};
    parsed[String(userId)] = pinnedIds;
    localStorage.setItem(PINNED_STORAGE_KEY, JSON.stringify(parsed));
  } catch {
    // ignore storage write failures
  }
};

const normalizeCartItem = (item) => {
  const unitPrice = Number(item.unitPrice ?? item.price ?? 0);
  const strandQuantity = clamp(
    Number(item.strandQuantity ?? item.strand_quantity ?? MIN_STRAND_QUANTITY),
    MIN_STRAND_QUANTITY,
    MAX_STRAND_QUANTITY,
  );
  const setQuantity = Math.max(
    MIN_SET_QUANTITY,
    Number(item.setQuantity ?? item.count ?? MIN_SET_QUANTITY),
  );

  return {
    ...item,
    unitPrice,
    price: unitPrice,
    strandQuantity,
    setQuantity,
    liked: Boolean(item.liked),
    selected: item.selected ?? true,
  };
};

const mapBackendCartItem = (item, pinnedIds = []) =>
  normalizeCartItem({
    id: String(item.id),
    productId: item.product?.id,
    img: item.product?.photo || item.product?.images?.[0] || "",
    images: item.product?.images || [],
    name: item.product?.name || "",
    description: item.product?.description || "",
    unitPrice: Number(item.product?.price ?? 0),
    price: Number(item.product?.price ?? 0),
    length: item.length || "-",
    color: item.color || "-",
    strandQuantity: item.strand_quantity,
    setQuantity: item.count,
    category: item.product?.category || "",
    liked: pinnedIds.includes(String(item.id)),
    selected: true,
  });

const syncQuantityViaLegacy = async ({ currentItem, targetQuantity, userId }) => {
  const currentQuantity = Number(currentItem.setQuantity);
  const delta = targetQuantity - currentQuantity;

  if (!delta) {
    return {
      ...currentItem,
      setQuantity: targetQuantity,
    };
  }

  const fallbackUrl =
    delta > 0
      ? `/cart/add/${currentItem.productId}/${userId}/`
      : `/cart/remove/${currentItem.productId}/${userId}/`;

  for (let step = 0; step < Math.abs(delta); step += 1) {
    await axios.get(fallbackUrl);
  }

  return {
    ...currentItem,
    setQuantity: targetQuantity,
  };
};

const initialState = {
  cart: [],
  status: "idle",
  error: null,
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const userId = getUserId(state);
    const pinnedIds = loadPinnedItems(userId);

    if (!hasStoredToken() && !userId) {
      return [];
    }

    try {
      const response = await axios.get("/cart/me/");
      return (response.data?.cart ?? []).map((item) =>
        mapBackendCartItem(item, pinnedIds),
      );
    } catch (error) {
      if (isNotFoundError(error) && userId) {
        try {
          const fallbackResponse = await axios.get(`/cart/${userId}/`);
          return (fallbackResponse.data?.cart ?? []).map((item) =>
            mapBackendCartItem(item, pinnedIds),
          );
        } catch (fallbackError) {
          return rejectWithValue(
            fallbackError.response?.data || { error: fallbackError.message },
          );
        }
      }

      return rejectWithValue(error.response?.data || null);
    }
  },
);

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (payload, { getState, rejectWithValue }) => {
    const state = getState();
    const userId = getUserId(state);

    try {
      const response = await axios.post("/cart/me/items/", {
        product_id: payload.productId,
        length: payload.length,
        color: payload.color,
        strand_quantity: payload.strandQuantity,
        count: payload.setQuantity ?? 1,
      });

      return mapBackendCartItem(response.data?.cart_item);
    } catch (error) {
      if (isNotFoundError(error) && userId) {
        try {
          await axios.get(
            `/cart/add/${payload.productId}/${userId}/`,
          );

          return normalizeCartItem({
            id: `${payload.productId}-${Date.now()}`,
            productId: payload.productId,
            img: payload.img,
            images: payload.images || [],
            name: payload.name,
            description: payload.description,
            unitPrice: payload.unitPrice,
            price: payload.price,
            length: payload.length,
            color: payload.color,
            strandQuantity: payload.strandQuantity,
            setQuantity: payload.setQuantity ?? 1,
            category: payload.category || "",
            liked: false,
            selected: true,
          });
        } catch (fallbackError) {
          return rejectWithValue(
            fallbackError.response?.data || { error: fallbackError.message },
          );
        }
      }

      return rejectWithValue(error.response?.data || { error: error.message });
    }
  },
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ id, quantity }, { getState, rejectWithValue }) => {
    const state = getState();
    const targetQuantity = Math.max(MIN_SET_QUANTITY, Number(quantity));
    const currentItem = state.cart.cart.find((item) => item.id === id);

    if (!currentItem?.productId) {
      return rejectWithValue({ error: "Cart item not found" });
    }

    try {
      const response = await axios.patch(`/cart/me/items/${id}/`, {
        count: targetQuantity,
      });
      return mapBackendCartItem(response.data?.cart_item);
    } catch (error) {
      return rejectWithValue(error.response?.data || { error: error.message });
    }
  },
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async (id, { getState, rejectWithValue }) => {
    const state = getState();
    const userId = getUserId(state);

    try {
      await axios.delete(`/cart/me/items/${id}/delete/`);
      return id;
    } catch (error) {
      if (isNotFoundError(error) && userId) {
        const currentItem = state.cart.cart.find((item) => item.id === id);
        if (!currentItem?.productId) {
          return rejectWithValue({ error: "Cart item not found" });
        }

        try {
          for (let step = 0; step < Number(currentItem.setQuantity); step += 1) {
            await axios.get(
              `/cart/remove/${currentItem.productId}/${userId}/`,
            );
          }

          return id;
        } catch (fallbackError) {
          return rejectWithValue(
            fallbackError.response?.data || { error: fallbackError.message },
          );
        }
      }

      return rejectWithValue(error.response?.data || { error: error.message });
    }
  },
);

export const removeSelectedFromCart = createAsyncThunk(
  "cart/removeSelectedFromCart",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const selectedIds = getState().cart.cart
      .filter((item) => item.selected)
      .map((item) => item.id);

    try {
      await Promise.all(selectedIds.map((id) => dispatch(removeItemFromCart(id)).unwrap()));
      return selectedIds;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateCartItemDetails = createAsyncThunk(
  "cart/updateCartItemDetails",
  async (
    { id, productId, length, color, strandQuantity, setQuantity, name, description, img, images, unitPrice, price, category, liked },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.patch(`/cart/me/items/${id}/`, {
        length,
        color,
        strand_quantity: strandQuantity,
      });

      return {
        ...mapBackendCartItem(response.data?.cart_item),
        liked: Boolean(liked),
      };
    } catch (error) {
      try {
        await axios.delete(`/cart/me/items/${id}/delete/`);

        const response = await axios.post("/cart/me/items/", {
          product_id: productId,
          length,
          color,
          strand_quantity: strandQuantity,
          count: setQuantity ?? 1,
        });

        return {
          ...mapBackendCartItem(response.data?.cart_item),
          liked: Boolean(liked),
        };
      } catch (fallbackError) {
        return rejectWithValue(
          fallbackError.response?.data || { error: fallbackError.message || error.message },
        );
      }
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCartItemLike: (state, action) => {
      const item = state.cart.find((entry) => entry.id === action.payload);
      if (item) {
        item.liked = !item.liked;
        const userId = getStoredAuthUserId();
        if (userId) {
          const pinnedIds = state.cart
            .filter((entry) => entry.liked)
            .map((entry) => String(entry.id));
          savePinnedItems(userId, pinnedIds);
        }
      }
    },
    toggleCartItemSelection: (state, action) => {
      const item = state.cart.find((entry) => entry.id === action.payload);
      if (item) {
        item.selected = !item.selected;
      }
    },
    toggleSelectAllCartItems: (state, action) => {
      state.cart = state.cart.map((item) => ({
        ...item,
        selected: action.payload,
      }));
    },
    setCartItemQuantityLocal: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cart.find((entry) => entry.id === id);
      if (item) {
        item.setQuantity = Math.max(MIN_SET_QUANTITY, Number(quantity));
      }
    },
    clearCartState: (state) => {
      state.cart = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.cart = action.payload.map(normalizeCartItem);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload?.error || action.error.message;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.error = null;

        const existingIndex = state.cart.findIndex((item) => item.id === action.payload.id);
        if (existingIndex >= 0) {
          state.cart[existingIndex] = action.payload;
        } else {
          state.cart.unshift(action.payload);
        }
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.error = action.payload?.error || action.error.message;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        const existingIndex = state.cart.findIndex((item) => item.id === action.payload.id);
        if (existingIndex >= 0) {
          state.cart[existingIndex] = {
            ...state.cart[existingIndex],
            ...action.payload,
            liked: state.cart[existingIndex].liked,
            selected: state.cart[existingIndex].selected,
          };
        }
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.error = action.payload?.error || action.error.message;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.cart = state.cart.filter((item) => item.id !== String(action.payload));
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.error = action.payload?.error || action.error.message;
      })
      .addCase(updateCartItemDetails.fulfilled, (state, action) => {
        const existingIndex = state.cart.findIndex((item) => item.id === action.payload.id);
        if (existingIndex >= 0) {
          state.cart[existingIndex] = {
            ...state.cart[existingIndex],
            ...action.payload,
            liked: state.cart[existingIndex].liked,
            selected: state.cart[existingIndex].selected,
          };
        } else {
          state.cart.unshift(action.payload);
        }
      })
      .addCase(updateCartItemDetails.rejected, (state, action) => {
        state.error = action.payload?.error || action.error.message;
      })
      .addCase("auth/fetchLogout/fulfilled", (state) => {
        state.cart = [];
        state.status = "idle";
        state.error = null;
      })
      .addCase("auth/logoutLocally", (state) => {
        state.cart = [];
        state.status = "idle";
        state.error = null;
      });
  },
});

export const {
  toggleCartItemLike,
  toggleCartItemSelection,
  toggleSelectAllCartItems,
  setCartItemQuantityLocal,
  clearCartState,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
