import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const AUTH_STORAGE_KEY = "letti-auth-user";
const AVATAR_COLORS_KEY = "letti-avatar-colors";
export const AVATAR_COLOR_OPTIONS = [
  "#4f8f5b",
  "#8b5a3c",
  "#b54848",
  "#f2f2f2",
  "#7b5bbd",
  "#3f6fd9",
  "#d16aa7",
  "#d97a3f",
  "#5db7d9",
  "#1f8a70",
  "#c06c84",
  "#f28482",
  "#6c757d",
  "#f6bd60",
  "#84a59d",
  "#355070",
];

const loadAvatarColors = () => {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const saved = localStorage.getItem(AVATAR_COLORS_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};

const saveAvatarColors = (colors) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(AVATAR_COLORS_KEY, JSON.stringify(colors));
  } catch {
    // ignore storage write failures
  }
};

const ensureAvatarColor = (user) => {
  if (!user?.id) {
    return null;
  }

  const key = String(user.id);
  const colors = loadAvatarColors();

  if (!colors[key]) {
    const randomColor =
      AVATAR_COLOR_OPTIONS[
        Math.floor(Math.random() * AVATAR_COLOR_OPTIONS.length)
      ];
    colors[key] = randomColor;
    saveAvatarColors(colors);
  }

  return colors[key];
};

const normalizeUser = (payload) => {
  const user = payload?.user ?? payload?.userData ?? payload;
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    avatar:
      user.avatar ||
      user.photo ||
      user.avatar_url ||
      user.photo_url ||
      null,
    avatarColor: ensureAvatarColor(user),
  };
};

const normalizeStoredAuth = (saved) => {
  if (!saved) {
    return { user: null, token: null };
  }

  if ("user" in saved || "token" in saved) {
    return {
      user: saved.user ? normalizeUser(saved.user) : null,
      token: saved.token ?? null,
    };
  }

  return {
    user: normalizeUser(saved),
    token: null,
  };
};

const normalizeAuthPayload = (payload) => ({
  user: normalizeUser(payload),
  token: payload?.token ?? null,
});

const loadStoredAuth = () => {
  if (typeof window === "undefined") {
    return { user: null, token: null };
  }

  try {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    return normalizeStoredAuth(saved ? JSON.parse(saved) : null);
  } catch {
    return { user: null, token: null };
  }
};

const saveStoredAuth = (auth) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    if (auth?.user || auth?.token) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch {
    // ignore storage write failures
  }
};

const storedAuth = loadStoredAuth();

const initialState = {
  user: storedAuth.user,
  token: storedAuth.token,
  status: storedAuth.user ? "fulfilled" : "idle",
  error: null,
};

export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/login/", params);
      return normalizeAuthPayload(response.data);
    } catch (error) {
      const serverError = error.response?.data;
      return rejectWithValue({
        message: serverError?.code?.[0] || error.message,
        code: error.response?.status,
        serverError,
      });
    }
  },
);

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/users/register/",
        params,
      );
      return normalizeAuthPayload(response.data);
    } catch (error) {
      const serverError = error.response?.data;
      return rejectWithValue({
        message: serverError?.code?.[0] || error.message,
        code: error.response?.status,
        serverError,
      });
    }
  },
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/users/me/");
      return {
        user: normalizeUser(response.data),
        token: response.data?.token ?? loadStoredAuth().token,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || null);
    }
  },
);

export const fetchLogout = createAsyncThunk("auth/fetchLogout", async () => {
  try {
    await axios.post("/users/logout/");
  } catch {
    // local logout should still succeed even if backend session is absent
  }
  return null;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserAvatarColor: (state, action) => {
      if (!state.user?.id) {
        return;
      }

      state.user.avatarColor = action.payload;
      saveStoredAuth({ user: state.user, token: state.token });

      const colors = loadAvatarColors();
      colors[String(state.user.id)] = action.payload;
      saveAvatarColors(colors);
    },
    logoutLocally: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      saveStoredAuth(null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        saveStoredAuth(action.payload);
      })
      .addCase(fetchRegister.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload?.message;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        saveStoredAuth(action.payload);
      })
      .addCase(fetchLogin.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload?.message;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        saveStoredAuth(action.payload);
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.status = "idle";
        saveStoredAuth(null);
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.status = "idle";
        state.error = null;
        saveStoredAuth(null);
      });
  },
});

export const { logoutLocally, updateUserAvatarColor } = authSlice.actions;
export const authReducer = authSlice.reducer;
